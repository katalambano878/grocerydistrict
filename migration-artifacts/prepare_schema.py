#!/usr/bin/env python3
"""Prepare Grocerydistrict Supabase schema SQL for plain Postgres staging restore."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
src = root / "supabase/migrations/20260209000000_complete_schema.sql"
out = root / "migration-artifacts/dumps/schema_plain.sql"

text = src.read_text()


def extract_functions(s: str):
    """Move CREATE FUNCTION ... $$ ... $$; blocks to the end."""
    pattern = re.compile(
        r"CREATE\s+OR\s+REPLACE\s+FUNCTION[\s\S]*?\$\$;",
        re.IGNORECASE,
    )
    blocks = pattern.findall(s)
    cleaned = pattern.sub("\n-- (function moved to end)\n", s)
    return cleaned, blocks


header = """
-- Plain Postgres adapted schema (Grocerydistrict staging)
CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA public;
"""

text = re.sub(
    r'CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;',
    "-- extension handled in header",
    text,
)

# Prefer gen_random_uuid() over uuid_generate_v4 on fleet-postgres
text = text.replace("extensions.uuid_generate_v4()", "gen_random_uuid()")
text = text.replace("uuid_generate_v4()", "gen_random_uuid()")
text = text.replace("public.uuid_generate_v4()", "gen_random_uuid()")

body, funcs = extract_functions(text)

# Also move CREATE TRIGGER statements after functions
trigger_pat = re.compile(r"CREATE\s+TRIGGER[\s\S]*?;", re.IGNORECASE)
triggers = trigger_pat.findall(body)
body = trigger_pat.sub("\n-- (trigger moved to end)\n", body)

final = (
    header
    + "\n"
    + body
    + "\n-- ===== FUNCTIONS (after tables) =====\n"
    + "\n\n".join(funcs)
    + "\n-- ===== TRIGGERS (after functions) =====\n"
    + "\n\n".join(triggers)
    + "\n"
)
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(final)
print(f"Wrote {out} ({len(final)} bytes, {len(funcs)} functions, {len(triggers)} triggers)")
