export const CHANNEL_COSTS: Record<string, number> = {
  whatsapp: 0.35,
  sms: 0.18,
  email: 0.05,
  rcs: 0.28,
};

export const CHANNEL_COLOR: Record<string, string> = {
  whatsapp:
    "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950/40 dark:text-green-400",
  sms: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400",
  email:
    "bg-indigo-100 text-indigo-800 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400",
  rcs: "bg-teal-100 text-teal-800 hover:bg-teal-100 dark:bg-teal-950/40 dark:text-teal-400",
};

export const STATUS_COLOR: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800/40 dark:text-gray-400",
  active: "bg-sky-100 text-sky-800 hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-400",
  completed:
    "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400",
  failed: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400",
  paused: "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400",
  scheduled:
    "bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-100 dark:bg-fuchsia-950/40 dark:text-fuchsia-400",
  archived: "bg-slate-200 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-350",
  queued: "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800/40 dark:text-gray-400",
  sent: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400",
  delivered:
    "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-950/40 dark:text-green-400",
  opened:
    "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-400",
  clicked:
    "bg-amber-100 text-amber-900 hover:bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400",
  ordered:
    "bg-emerald-200 text-emerald-900 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-350",
  retrying:
    "bg-orange-100 text-orange-800 hover:bg-orange-100 dark:bg-orange-950/40 dark:text-orange-400",
};

export const ROUTES = {
  DASHBOARD: "/",
  CHAT: "/chat",
  CAMPAIGNS: "/campaigns",
  CUSTOMERS: "/customers",
  ORDERS: "/orders",
  SEGMENTS: "/segments",
  TEMPLATES: "/templates",
  ANALYTICS: "/analytics",
  SYSTEM: "/system",
  LOGIN: "/login",
};
