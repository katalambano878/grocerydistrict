/**
 * FK + JSONB column map for Grocerydistrict (zgxcoruukasbdktnicet).
 * Generated from live schema 2026-07-22.
 */
export const FK_EDGES: Array<{
  table: string;
  column: string;
  foreignTable: string;
  foreignColumn: string;
}> = [
  { table: "ai_memory", column: "source_conversation_id", foreignTable: "chat_conversations", foreignColumn: "id" },
  { table: "cart_items", column: "product_id", foreignTable: "products", foreignColumn: "id" },
  { table: "cart_items", column: "variant_id", foreignTable: "product_variants", foreignColumn: "id" },
  { table: "categories", column: "parent_id", foreignTable: "categories", foreignColumn: "id" },
  { table: "delivery_assignments", column: "order_id", foreignTable: "orders", foreignColumn: "id" },
  { table: "delivery_assignments", column: "rider_id", foreignTable: "riders", foreignColumn: "id" },
  { table: "delivery_assignments", column: "zone_id", foreignTable: "delivery_zones", foreignColumn: "id" },
  { table: "delivery_status_history", column: "assignment_id", foreignTable: "delivery_assignments", foreignColumn: "id" },
  { table: "navigation_items", column: "menu_id", foreignTable: "navigation_menus", foreignColumn: "id" },
  { table: "navigation_items", column: "parent_id", foreignTable: "navigation_items", foreignColumn: "id" },
  { table: "order_items", column: "order_id", foreignTable: "orders", foreignColumn: "id" },
  { table: "order_items", column: "product_id", foreignTable: "products", foreignColumn: "id" },
  { table: "order_items", column: "variant_id", foreignTable: "product_variants", foreignColumn: "id" },
  { table: "order_status_history", column: "order_id", foreignTable: "orders", foreignColumn: "id" },
  { table: "product_images", column: "product_id", foreignTable: "products", foreignColumn: "id" },
  { table: "product_variants", column: "product_id", foreignTable: "products", foreignColumn: "id" },
  { table: "products", column: "category_id", foreignTable: "categories", foreignColumn: "id" },
  { table: "return_items", column: "order_item_id", foreignTable: "order_items", foreignColumn: "id" },
  { table: "return_items", column: "return_request_id", foreignTable: "return_requests", foreignColumn: "id" },
  { table: "return_requests", column: "order_id", foreignTable: "orders", foreignColumn: "id" },
  { table: "review_images", column: "review_id", foreignTable: "reviews", foreignColumn: "id" },
  { table: "reviews", column: "product_id", foreignTable: "products", foreignColumn: "id" },
  { table: "riders", column: "zone_id", foreignTable: "delivery_zones", foreignColumn: "id" },
  { table: "support_feedback", column: "conversation_id", foreignTable: "chat_conversations", foreignColumn: "id" },
  { table: "support_feedback", column: "ticket_id", foreignTable: "support_tickets", foreignColumn: "id" },
  { table: "support_knowledge_base", column: "source_ticket_id", foreignTable: "support_tickets", foreignColumn: "id" },
  { table: "support_ticket_messages", column: "ticket_id", foreignTable: "support_tickets", foreignColumn: "id" },
  { table: "support_tickets", column: "conversation_id", foreignTable: "chat_conversations", foreignColumn: "id" },
  { table: "wishlist_items", column: "product_id", foreignTable: "products", foreignColumn: "id" },
];

export const JSONB_COLUMNS: Record<string, string[]> = {
  "addresses": ["metadata"],
  "audit_logs": ["details"],
  "categories": ["metadata"],
  "chat_conversations": ["messages", "metadata"],
  "cms_content": ["metadata"],
  "coupons": ["metadata"],
  "customer_insights": ["ai_notes", "preferences"],
  "customers": ["default_address"],
  "delivery_assignments": ["metadata"],
  "notifications": ["data"],
  "order_items": ["metadata"],
  "orders": ["billing_address", "metadata", "shipping_address"],
  "product_variants": ["metadata"],
  "products": ["metadata", "options"],
  "profiles": ["preferences"],
  "riders": ["metadata"],
  "roles": ["permissions"],
  "site_settings": ["value"],
  "store_settings": ["value"],
  "support_analytics_daily": ["sentiment_distribution", "top_categories", "top_intents"],
  "support_escalation_rules": ["action_value", "condition_value"],
  "support_ticket_messages": ["attachments", "metadata"],
  "support_tickets": ["metadata"],
};
