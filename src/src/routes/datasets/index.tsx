import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Card, ContentSection, InfoPanel, StatGrid } from "@/components/ui-kit";
import { domains } from "@/data/site";
import datasets from "@/data/datasets.json";

const counts = datasets as Record<string, unknown[]>;

export const Route = createFileRoute("/datasets/")({
  head: () => ({
    meta: [
      { title: "Datasets — Lacuna Fund Domain Areas" },
      {
        name: "description",
        content:
          "Browse openly licensed Lacuna Fund datasets across agriculture, language, health and climate, each locally developed and owned by teams in low- and middle-income contexts.",
      },
      { property: "og:title", content: "Datasets — Lacuna Fund Domain Areas" },
      {
        property: "og:description",
        content:
          "Released datasets by domain: agriculture, language, health and climate, with authors, descriptions and download links.",
      },
    ],
  }),
  component: DatasetsPage,
});

function DatasetsPage() {
  return (
    <AppShell>
      <BasePage
        eyebrow="Datasets"
        title="Datasets by domain"
        intro="Lacuna Fund grantees produce openly accessible, locally owned labeled datasets. Explore released datasets in each domain area."
        crumbs={[{ label: "Datasets" }]}
      >
        <StatGrid
          items={[
            { value: String(counts["agriculture"]?.length ?? 0), label: "Agriculture datasets" },
            { value: String(counts["language"]?.length ?? 0), label: "Language datasets" },
            { value: String(counts["health"]?.length ?? 0), label: "Health datasets" },
            { value: "4", label: "Domain areas" },
          ]}
        />

        <ContentSection eyebrow="Domains" title="Choose a domain">
          <div className="grid gap-5 sm:grid-cols-2">
            {domains.map((domain, i) => (
              <Card
                key={domain.key}
                eyebrow={
                  counts[domain.key]?.length
                    ? `${counts[domain.key]!.length} released datasets`
                    : "Grantmaking underway"
                }
                title={domain.label}
                to={domain.to}
                linkLabel="Explore datasets"
                accent={i % 3 === 0 ? "primary" : i % 3 === 1 ? "sky" : "gold"}
              >
                <ImagePlaceholder label="Image Placeholder" ratio="3/2" className="mb-4" />
                {domain.summary}
              </Card>
            ))}
          </div>
        </ContentSection>

        <ContentSection eyebrow="Licensing" title="How to use these datasets">
          <InfoPanel tone="primary" title="Open by design">
            All datasets produced with Lacuna Fund support are locally developed and owned, and
            openly accessible to the international community while adhering to best practices
            regarding ethics and privacy.
          </InfoPanel>
        </ContentSection>
      </BasePage>
    </AppShell>
  );
}
