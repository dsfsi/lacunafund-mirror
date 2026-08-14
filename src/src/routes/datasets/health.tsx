import { createFileRoute } from "@tanstack/react-router";
import { DomainPage } from "@/components/DomainPage";

export const Route = createFileRoute("/datasets/health")({
  head: () => ({
    meta: [
      { title: "Health Datasets — Lacuna Fund" },
      {
        name: "description",
        content:
          "Open health datasets funded by Lacuna Fund to reduce health disparities: screening and diagnosis imagery, medical text and population health data from the Global South.",
      },
      { property: "og:title", content: "Health Datasets — Lacuna Fund" },
      {
        property: "og:description",
        content:
          "Datasets that help providers and patients make decisions leading to more equitable healthcare outcomes.",
      },
    ],
  }),
  component: () => <DomainPage domainKey="health" />,
});
