// Data source utilities: schema overview, CSV import, table export.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TABLES = [
  "customers",
  "products",
  "orders",
  "campaigns",
  "messages",
  "events",
  "message_templates",
] as const;

export const getDataSources = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/lib/supabase");
  const stats = await Promise.all(
    TABLES.map(async (t) => {
      const { count } = await supabaseAdmin.from(t).select("*", { count: "exact", head: true });
      return { table: t, rows: count ?? 0 };
    }),
  );
  return {
    storage: {
      provider: "Supabase (Postgres)",
      region: "managed",
    },
    tables: stats,
  };
});

const CustomerRow = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().default([]),
  total_orders: z.number().int().min(0).optional().default(0),
  total_spent: z.number().min(0).optional().default(0),
  last_order_date: z.string().optional().nullable(),
});

export const importCustomersCsv = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ rows: z.array(z.record(z.any())).min(1).max(5000) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/lib/supabase");

    const normalised: any[] = [];
    const errors: { row: number; error: string }[] = [];
    data.rows.forEach((raw, idx) => {
      const candidate = {
        name: String(raw.name ?? raw.Name ?? "").trim(),
        email: String(raw.email ?? raw.Email ?? "")
          .trim()
          .toLowerCase(),
        phone: raw.phone ?? raw.Phone ?? null,
        city: raw.city ?? raw.City ?? null,
        tags:
          typeof raw.tags === "string"
            ? raw.tags
                .split(/[,;|]/)
                .map((s: string) => s.trim())
                .filter(Boolean)
            : Array.isArray(raw.tags)
              ? raw.tags
              : [],
        total_orders: Number(raw.total_orders ?? 0) || 0,
        total_spent: Number(raw.total_spent ?? 0) || 0,
        last_order_date: raw.last_order_date || null,
      };
      const parsed = CustomerRow.safeParse(candidate);
      if (!parsed.success) {
        errors.push({
          row: idx + 1,
          error: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", "),
        });
      } else {
        normalised.push(parsed.data);
      }
    });

    let inserted = 0;
    for (let i = 0; i < normalised.length; i += 200) {
      const batch = normalised.slice(i, i + 200);
      // upsert by email
      const { error } = await supabaseAdmin
        .from("customers")
        .upsert(batch, { onConflict: "email", ignoreDuplicates: false });
      if (!error) inserted += batch.length;
      else errors.push({ row: -1, error: error.message });
    }

    return { inserted, total: data.rows.length, errors: errors.slice(0, 20) };
  });

export const exportTableCsv = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ table: z.enum(TABLES) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/lib/supabase");
    const { data: rows } = await supabaseAdmin.from(data.table).select("*").limit(10000);
    return { rows: rows ?? [] };
  });

export const getPreviewData = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ table: z.enum(TABLES) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/lib/supabase");
    const { data: rows } = await supabaseAdmin.from(data.table).select("*").limit(5);
    return { rows: rows ?? [] };
  });
