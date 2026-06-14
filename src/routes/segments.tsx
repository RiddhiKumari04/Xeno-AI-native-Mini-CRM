import { createFileRoute } from "@tanstack/react-router";
import SegmentsPage from "@/pages/Segments";

export const Route = createFileRoute("/segments")({
  head: () => ({
    meta: [
      { title: "Segments · Xeno AI — Mini CRM" },
      { name: "description", content: "Create and manage customer segments." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SegmentsPage,
});
