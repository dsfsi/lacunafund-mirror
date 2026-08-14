import { createFileRoute } from "@tanstack/react-router";
import { DomainPage } from "@/components/DomainPage";

export const Route = createFileRoute("/datasets/climate")({
  head: () => ({
    meta: [
      { title: "Climate Datasets — Lacuna Fund" },
      {
        name: "description",
        content:
          "Lacuna Fund climate grantmaking supports machine learning datasets and models made by and for the communities most affected by climate change.",
      },
      { property: "og:title", content: "Climate Datasets — Lacuna Fund" },
      {
        property: "og:description",
        content:
          "Climate data and models built with and for communities in low- and middle-income contexts, guided by dedicated technical advisory panels.",
      },
    ],
  }),
  component: () => <DomainPage domainKey="climate" />,
});
