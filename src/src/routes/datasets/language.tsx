import { createFileRoute } from "@tanstack/react-router";
import { DomainPage } from "@/components/DomainPage";

export const Route = createFileRoute("/datasets/language")({
  head: () => ({
    meta: [
      { title: "Language Datasets — Lacuna Fund" },
      {
        name: "description",
        content:
          "Open text and speech datasets funded by Lacuna Fund for African, Asian and Latin American languages, powering translation, speech recognition and NLP research.",
      },
      { property: "og:title", content: "Language Datasets — Lacuna Fund" },
      {
        property: "og:description",
        content:
          "Openly accessible language resources that fuel natural language processing in underrepresented languages.",
      },
    ],
  }),
  component: () => <DomainPage domainKey="language" />,
});
