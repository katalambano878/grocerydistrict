import { NextRequest, NextResponse } from "next/server";
import {
  createClient,
  applyPostgrestParams,
} from "@/lib/db/supabase-compat";
import { isPlainPostgres } from "@/lib/db/mode";
import {
  PolicyError,
  resolveRequester,
  scopeInsert,
  scopeSelect,
  scopeWrite,
} from "@/lib/db/rest-policy";
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from "@/lib/rate-limit";

/** Throttle writes from the public (staff are trusted). */
function writeLimited(req: NextRequest, isStaff: boolean): boolean {
  if (isStaff) return false;
  return !checkRateLimit(`rest-write:${getClientIdentifier(req)}`, RATE_LIMITS.notification).success;
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PG_IDENT = /^[a-z_][a-z0-9_]*$/i;

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, apikey, content-type, prefer, x-client-info, accept-profile, content-profile",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,PUT,DELETE,OPTIONS",
  };
}

function preferSingle(req: NextRequest): boolean {
  const accept = req.headers.get("accept") || "";
  return accept.includes("application/vnd.pgrst.object+json");
}

function preferReturn(req: NextRequest): boolean {
  const prefer = req.headers.get("prefer") || "";
  return prefer.includes("return=representation") || prefer.includes("resolution=");
}

function preferCount(req: NextRequest): boolean {
  const prefer = req.headers.get("prefer") || "";
  return prefer.includes("count=exact");
}

function preferUpsert(req: NextRequest): boolean {
  return (req.headers.get("prefer") || "").includes("resolution=merge-duplicates");
}

function jsonError(message: string, status = 400) {
  return NextResponse.json(
    { message, code: "PGRST", details: null, hint: null },
    { status, headers: corsHeaders() }
  );
}

/** Shared guard: mode check, table name check, and error mapping. */
async function handle(
  req: NextRequest,
  ctx: { params: Promise<{ table: string }> },
  run: (table: string) => Promise<NextResponse>
): Promise<NextResponse> {
  if (!isPlainPostgres()) {
    return jsonError("Plain Postgres mode is not enabled (DATABASE_URL missing)", 503);
  }
  const { table } = await ctx.params;
  if (!PG_IDENT.test(table)) return jsonError("Invalid table");
  try {
    return await run(table);
  } catch (e: any) {
    if (e instanceof PolicyError) return jsonError(e.message, e.status);
    return jsonError(e?.message || "Request failed", 400);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ table: string }> }) {
  return handle(req, ctx, async (table) => {
    const who = await resolveRequester(req.headers.get("authorization"));
    const client = createClient();
    const qb = client.from(table);
    const select = req.nextUrl.searchParams.get("select") || "*";
    if (preferCount(req)) {
      qb.select(select, {
        count: "exact",
        head: req.headers.get("prefer")?.includes("head=true"),
      });
    } else {
      qb.select(select);
    }
    scopeSelect(qb, select, who);
    // Apply filters/order/limit without re-applying select
    const params = new URLSearchParams(req.nextUrl.searchParams);
    params.delete("select");
    applyPostgrestParams(qb, params, { preferSingle: preferSingle(req) });

    const result = await qb;
    if (result.error) {
      return jsonError(result.error.message || "Query failed", 400);
    }

    const headers = new Headers(corsHeaders());
    headers.set("Content-Type", "application/json");
    if (result.count != null) {
      headers.set("Content-Range", `0-${Math.max((Array.isArray(result.data) ? result.data.length : 1) - 1, 0)}/${result.count}`);
    }

    if (preferSingle(req)) {
      return NextResponse.json(result.data, { status: 200, headers });
    }
    return NextResponse.json(result.data ?? [], { status: 200, headers });
  });
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ table: string }> }) {
  return handle(req, ctx, async (table) => {
    const body = await req.json().catch(() => null);
    if (body == null || typeof body !== "object") return jsonError("Invalid JSON body");

    const who = await resolveRequester(req.headers.get("authorization"));
    if (writeLimited(req, who.isStaff)) return jsonError("Too many requests", 429);
    const upsert = preferUpsert(req);
    if (upsert && !who.isStaff) return jsonError("Not allowed", who.userId ? 403 : 401);
    const rows = scopeInsert(table, body, who);

    const client = createClient();
    let qb = upsert
      ? client.from(table).upsert(rows, {
          onConflict: req.nextUrl.searchParams.get("on_conflict") || undefined,
        })
      : client.from(table).insert(rows);
    if (preferReturn(req) || preferSingle(req)) {
      qb = qb.select(req.nextUrl.searchParams.get("select") || "*") as typeof qb;
    }
    if (preferSingle(req)) qb = qb.single() as typeof qb;

    const result = await qb;
    if (result.error) return jsonError(result.error.message || "Insert failed", 400);

    return NextResponse.json(result.data, {
      status: 201,
      headers: corsHeaders(),
    });
  });
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ table: string }> }) {
  return handle(req, ctx, async (table) => {
    const body = await req.json().catch(() => null);
    if (body == null || typeof body !== "object" || Array.isArray(body)) {
      return jsonError("Invalid JSON body");
    }

    const who = await resolveRequester(req.headers.get("authorization"));
    if (writeLimited(req, who.isStaff)) return jsonError("Too many requests", 429);
    const client = createClient();
    let qb = client.from(table);
    const patch = scopeWrite(qb, "update", who, body)!;
    if (Object.keys(patch).length === 0) return jsonError("Nothing to update");
    qb = qb.update(patch);
    applyPostgrestParams(qb, withoutSelect(req.nextUrl.searchParams));
    if (preferReturn(req) || preferSingle(req)) {
      qb = qb.select(req.nextUrl.searchParams.get("select") || "*") as typeof qb;
    }
    if (preferSingle(req)) qb = qb.single() as typeof qb;

    const result = await qb;
    if (result.error) return jsonError(result.error.message || "Update failed", 400);

    return NextResponse.json(result.data, { status: 200, headers: corsHeaders() });
  });
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ table: string }> }) {
  return handle(req, ctx, async (table) => {
    const who = await resolveRequester(req.headers.get("authorization"));
    if (writeLimited(req, who.isStaff)) return jsonError("Too many requests", 429);
    const client = createClient();
    let qb = client.from(table);
    scopeWrite(qb, "delete", who);
    qb = qb.delete();
    applyPostgrestParams(qb, withoutSelect(req.nextUrl.searchParams));
    if (preferReturn(req)) {
      qb = qb.select("*") as typeof qb;
    }

    const result = await qb;
    if (result.error) return jsonError(result.error.message || "Delete failed", 400);

    return NextResponse.json(result.data ?? null, { status: 200, headers: corsHeaders() });
  });
}

/** Mutations carry `select`/`on_conflict` as options, not filters. */
function withoutSelect(params: URLSearchParams): URLSearchParams {
  const out = new URLSearchParams(params);
  out.delete("select");
  out.delete("on_conflict");
  out.delete("columns");
  return out;
}
