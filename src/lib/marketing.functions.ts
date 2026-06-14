import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ContactInput = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactInput.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/lib/supabase");
    const { error } = await (supabaseAdmin as any).from("contact_submissions").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const NewsletterInput = z.object({
  email: z.string().trim().email().max(255),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => NewsletterInput.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/lib/supabase");
    const { error } = await (supabaseAdmin as any)
      .from("newsletter_subscribers")
      .upsert({ email: data.email.toLowerCase() }, { onConflict: "email" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
