import { createServerFn } from "@tanstack/react-start";

export const checkEnvHealth = createServerFn({ method: "GET" }).handler(async () => {
  const required = [
    "SUPABASE_URL",
    "SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "GEMINI_API_KEY",
  ] as const;
  const missing = required.filter((k) => !process.env[k]);
  return { ok: missing.length === 0, missing };
});
