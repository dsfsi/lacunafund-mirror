import { createFileRoute } from "@tanstack/react-router";
import { DomainPage } from "@/components/DomainPage";

export const Route = createFileRoute("/datasets/agriculture")({
  head: () => ({
    meta: [
      { title: "Agriculture Datasets — Lacuna Fund" },
      {
        name: "description",
        content:
          "Open agriculture datasets funded by Lacuna Fund: crop imagery, pest and disease labels, yield estimation and remote sensing data from smallholder farming systems.",
      },
      { property: "og:title", content: "Agriculture Datasets — Lacuna Fund" },
      {
        property: "og:description",
        content:
          "Machine learning datasets that alleviate food security challenges and give farmers, researchers and policymakers better agricultural data.",
      },
    ],
  }),
  component: () => <DomainPage domainKey="agriculture" />,
});
