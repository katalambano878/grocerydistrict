// Row-level access rules for the public /rest/v1 and /rpc shims.
//
// Hosted Supabase enforced these with Postgres RLS. The plain-Postgres shim
// runs every query as the database owner, so the same rules have to be
// applied here before a request touches the database. Anything not listed
// below is staff-only.
//
// Rules follow supabase/migrations/20260209000000_complete_schema.sql, made
// stricter where the old policies leaked data (guest orders, support tickets,
// chat transcripts and coupons were readable by anyone).

import { query } from "./pool";
import { verifyAccessToken } from "./auth";
import { listEmbedEdges, type QueryBuilder } from "./supabase-compat";

export type Action = "select" | "insert" | "update" | "delete" | "upsert";

export interface Requester {
  userId: string | null;
  isStaff: boolean;
}

export class PolicyError extends Error {
  status: number;
  constructor(message: string, status = 403) {
    super(message);
    this.status = status;
  }
}

/** Identify the caller from `Authorization: Bearer <access token>`. */
export async function resolveRequester(authHeader: string | null): Promise<Requester> {
  const token = (authHeader || "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return { userId: null, isStaff: false };
  const verified = await verifyAccessToken(token);
  if (!verified) return { userId: null, isStaff: false };
  const { rows } = await query<{ role: string | null }>(
    `SELECT role FROM profiles WHERE id = $1 LIMIT 1`,
    [verified.userId]
  );
  const role = rows[0]?.role ? String(rows[0].role) : "";
  return { userId: verified.userId, isStaff: role === "admin" || role === "staff" };
}

type Scope = (qb: QueryBuilder, who: Requester) => void;

interface TableRule {
  /** Row filter for reads; `true` = every row. */
  select?: true | Scope;
  /** Insert allowed; returns the columns forced onto each new row. */
  insert?: (who: Requester) => Record<string, unknown>;
  /** Row filter for updates/deletes the caller may run on their own rows. */
  update?: Scope;
  delete?: Scope;
  /** Columns a non-staff caller may never write. */
  protectedColumns?: string[];
  /** Tables that may be embedded under this one for non-staff callers. */
  embeds?: string[];
}

function requireUser(who: Requester): string {
  if (!who.userId) throw new PolicyError("Sign in required", 401);
  return who.userId;
}

const ownBy = (col: string): Scope => (qb, who) => {
  qb.eq(col, requireUser(who));
};

const where = (col: string, value: unknown): Scope => (qb) => {
  qb.eq(col, value);
};

const ownOrderChild: Scope = (qb, who) => {
  qb.whereRaw(`"order_id" IN (SELECT id FROM orders WHERE user_id = ?)`, [requireUser(who)]);
};

const PRODUCT_EMBEDS = ["categories", "product_images", "product_variants", "reviews", "review_images"];

const RULES: Record<string, TableRule> = {
  // Catalogue and site content — public reads.
  categories: { select: true, embeds: ["categories", "products", ...PRODUCT_EMBEDS] },
  products: { select: where("status", "active"), embeds: PRODUCT_EMBEDS },
  product_images: { select: true, embeds: ["products"] },
  product_variants: { select: true, embeds: ["products", "product_images"] },
  review_images: { select: true },
  pages: { select: true },
  navigation_menus: { select: true, embeds: ["navigation_items"] },
  navigation_items: { select: where("is_active", true) },
  store_modules: { select: true },
  store_settings: { select: true },
  site_settings: { select: true },
  cms_content: { select: where("is_active", true) },
  banners: { select: where("is_active", true) },
  blog_posts: { select: where("status", "published") },
  delivery_zones: { select: where("is_active", true) },
  support_knowledge_base: { select: where("is_published", true) },

  reviews: {
    select: (qb, who) => {
      if (who.userId) qb.or(`status.eq.approved,user_id.eq.${who.userId}`);
      else qb.eq("status", "approved");
    },
    insert: (who) => ({
      user_id: requireUser(who),
      status: "pending",
      verified_purchase: false,
      helpful_votes: 0,
    }),
    update: ownBy("user_id"),
    protectedColumns: ["user_id", "product_id", "status", "verified_purchase", "helpful_votes"],
    embeds: ["review_images", "products"],
  },

  contact_submissions: { insert: () => ({}) },

  // The signed-in customer's own rows.
  profiles: {
    select: ownBy("id"),
    update: ownBy("id"),
    protectedColumns: ["id", "role", "email", "created_at"],
  },
  addresses: {
    select: ownBy("user_id"),
    insert: (who) => ({ user_id: requireUser(who) }),
    update: ownBy("user_id"),
    delete: ownBy("user_id"),
    protectedColumns: ["user_id"],
  },
  cart_items: {
    select: ownBy("user_id"),
    insert: (who) => ({ user_id: requireUser(who) }),
    update: ownBy("user_id"),
    delete: ownBy("user_id"),
    protectedColumns: ["user_id"],
    embeds: ["products", "product_variants"],
  },
  wishlist_items: {
    select: ownBy("user_id"),
    insert: (who) => ({ user_id: requireUser(who) }),
    delete: ownBy("user_id"),
    embeds: ["products"],
  },
  notifications: {
    select: ownBy("user_id"),
    update: ownBy("user_id"),
    protectedColumns: ["user_id"],
  },
  return_requests: {
    select: ownBy("user_id"),
    insert: (who) => ({ user_id: requireUser(who), status: "pending" }),
    protectedColumns: ["user_id", "status"],
    embeds: ["return_items", "orders"],
  },
  // Orders are created only by /api/storefront/checkout, which prices them
  // server-side. Customers can read their own.
  orders: {
    select: ownBy("user_id"),
    embeds: ["order_items", "order_status_history", "products"],
  },
  order_items: { select: ownOrderChild, embeds: ["products", "product_variants"] },
  order_status_history: { select: ownOrderChild },
};

/** RPCs callable without a staff session. Everything else is staff-only. */
const PUBLIC_RPCS = new Set(["get_order_for_tracking"]);

export function assertRpcAllowed(fn: string, who: Requester): void {
  if (fn.startsWith("pg_")) throw new PolicyError("Function not allowed");
  if (who.isStaff || PUBLIC_RPCS.has(fn)) return;
  throw new PolicyError("Function not allowed");
}

function assertTableName(table: string) {
  if (table.startsWith("pg_") || table === "information_schema") {
    throw new PolicyError("Table not allowed");
  }
}

function assertEmbedsAllowed(table: string, select: string) {
  for (const [parent, child] of listEmbedEdges(table, select)) {
    const allowed = RULES[parent]?.embeds || [];
    if (!allowed.includes(child)) {
      throw new PolicyError(`Embedding ${child} under ${parent} is not allowed`);
    }
  }
}

/** Apply read rules to a select builder; throws PolicyError when denied. */
export function scopeSelect(qb: QueryBuilder, select: string, who: Requester): void {
  assertTableName(qb.tableName);
  if (who.isStaff) return;
  const rule = RULES[qb.tableName];
  if (!rule?.select) throw new PolicyError("Not allowed", who.userId ? 403 : 401);
  if (rule.select !== true) rule.select(qb, who);
  assertEmbedsAllowed(qb.tableName, select);
}

/** Validate and rewrite an insert payload for the caller. */
export function scopeInsert<T extends Record<string, unknown> | Record<string, unknown>[]>(
  table: string,
  body: T,
  who: Requester
): T {
  assertTableName(table);
  if (who.isStaff) return body;
  const rule = RULES[table];
  if (!rule?.insert) throw new PolicyError("Not allowed", who.userId ? 403 : 401);
  // Forced columns (owner, moderation status) always win over the payload.
  const forced = rule.insert(who);
  const fix = (row: Record<string, unknown>) => ({ ...row, ...forced });
  return (Array.isArray(body) ? body.map(fix) : fix(body)) as T;
}

/** Apply write rules to an update/delete builder; returns the cleaned patch. */
export function scopeWrite(
  qb: QueryBuilder,
  action: "update" | "delete",
  who: Requester,
  patch?: Record<string, unknown>
): Record<string, unknown> | undefined {
  assertTableName(qb.tableName);
  if (who.isStaff) return patch;
  const rule = RULES[qb.tableName];
  const scope = action === "update" ? rule?.update : rule?.delete;
  if (!scope) throw new PolicyError("Not allowed", who.userId ? 403 : 401);
  scope(qb, who);
  return patch ? stripProtected(patch, rule!.protectedColumns) : undefined;
}

function stripProtected(
  row: Record<string, unknown>,
  protectedColumns: string[] = []
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    if (!protectedColumns.includes(k)) out[k] = v;
  }
  return out;
}
