# Grocery District — Supabase → plain Postgres cutover

**Shape:** A — shimmed `@supabase/supabase-js` → plain PG  
**Repo:** `katalambano878/grocerydistrict`  
**Branch:** `staging/plain-postgres`  
**Coolify prod:** `grocerydistrict-app` (`mu5i0a8rbe8pcjsno3m6p1ca`)  
**Coolify staging:** `grocerydistrict-staging` (`y8bbu1v4y00ghohl6bm1wp2b`)  
**Production:** https://www.grocerydistrict.shop  
**DB:** `fleet-postgres` / `grocerydistrict`

## Env cutover trio

| Variable | Value |
|----------|--------|
| `DATABASE_URL` | `postgresql://…@fleet-postgres:5432/grocerydistrict` |
| `NEXT_PUBLIC_USE_PLAIN_PG` | `true` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://www.grocerydistrict.shop` |

## Hardening notes (Jul 2026)

- [x] `images.unoptimized`; drop Supabase/placeholder remotePatterns
- [x] Service worker replaced with §16-safe `sw-v2.5-grocery` (no HTML/image poison)
- [x] `lib/format-money.ts` + error boundaries
- [x] Delivery/support/chat/admin-me APIs → `supabaseAdmin`
- [x] Order history Track / Reorder / Invoice / Help; hide Bulk Restock stub

## Verify

```bash
BASE=https://www.grocerydistrict.shop
ssh big-vps "sudo docker ps --format '{{.Image}} {{.Status}}' | grep mu5i0a8"
curl -s "$BASE/service-worker.js" | head -n 3
curl -s -o /dev/null -w "%{http_code}\n" "$BASE/"
curl -s -o /dev/null -w "%{http_code}\n" "$BASE/shop"
```
