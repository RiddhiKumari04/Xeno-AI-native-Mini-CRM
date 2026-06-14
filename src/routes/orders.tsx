import { createFileRoute } from "@tanstack/react-router";
import OrdersPage from "@/pages/Orders";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Orders · Xeno AI — Mini CRM" },
      { name: "description", content: "View and manage customer orders." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrdersPage,
});
