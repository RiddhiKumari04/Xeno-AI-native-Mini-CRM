import { createFileRoute } from "@tanstack/react-router";
import CampaignDetailPage from "@/pages/CampaignDetail";

export const Route = createFileRoute("/campaigns_/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Campaign · Xeno AI — Mini CRM` },
      {
        name: "description",
        content:
          "View campaign performance, message timelines, retry failed sends, and export results.",
      },
      { property: "og:title", content: "Campaign details — Xeno AI — Mini CRM" },
      { property: "og:url", content: `/campaigns/${params.id}` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CampaignDetailPage,
});
