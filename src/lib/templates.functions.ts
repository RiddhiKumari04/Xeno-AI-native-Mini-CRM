import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const listTemplates = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/lib/supabase");
  const { data } = await (supabaseAdmin as any)
    .from("message_templates")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as Array<{
    id: string;
    name: string;
    channel: string;
    body: string;
    description: string | null;
    created_at: string;
  }>;
});

const TemplateInput = z.object({
  name: z.string().trim().min(1).max(100),
  channel: z.enum(["whatsapp", "sms", "email", "rcs"]),
  body: z.string().trim().min(1).max(2000),
  description: z.string().trim().max(300).optional().nullable(),
});

export const createTemplate = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => TemplateInput.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/lib/supabase");
    const { data: row, error } = await (supabaseAdmin as any)
      .from("message_templates")
      .insert({
        name: data.name,
        channel: data.channel,
        body: data.body,
        description: data.description ?? null,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteTemplate = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/lib/supabase");
    const { error } = await (supabaseAdmin as any)
      .from("message_templates")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
