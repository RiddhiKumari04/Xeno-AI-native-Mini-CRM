import { createFileRoute } from "@tanstack/react-router";
import AnalyticsPage from "@/pages/Analytics";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics · Xeno AI — Mini CRM" }] }),
  component: AnalyticsPage,
});
