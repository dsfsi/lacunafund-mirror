import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { DatasetList, type DatasetCategory, type DatasetEntry } from "@/components/DatasetList";
import { Card, ContentSection, InfoPanel } from "@/components/ui-kit";
import { domains } from "@/data/site";
import datasets from "@/data/datasets.json";
import { spreadsheetDomainForTitle } from "@/lib/dataset-domains";
import { socialMeta } from "@/lib/seo";
import agri2Image from "@/assets/agri2.jpg";
import health2Image from "@/assets/health2.jpg";
import climate2Image from "@/assets/climate2.jpg";
import lang2Image from "@/assets/lang2.jpg";

const datasetGroups = datasets as Record<string, DatasetEntry[]>;
const allDatasets: DatasetEntry[] = Object.entries(datasetGroups).flatMap(([category, entries]) =>
  entries.map((entry) => ({
    ...entry,
    category: spreadsheetDomainForTitle(entry.title) ?? (category as DatasetCategory),
    fields: [...entry.fields],
    body: [...entry.body],
  })),
);

const domainImages: Record<string, string> = {
  agriculture: agri2Image,
  health: health2Image,
  climate: climate2Image,
  language: lang2Image,
};

export const Route = createFileRoute("/datasets/")({
  head: () => ({
    meta: [
      ...socialMeta,
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
  const counts = allDatasets.reduce<Record<string, number>>((totals, entry) => {
    if (entry.category) totals[entry.category] = (totals[entry.category] ?? 0) + 1;
    return totals;
  }, {});

  return (
    <AppShell>
      <BasePage
        eyebrow="Datasets"
        title="Datasets by domain"
        intro="Lacuna Fund grantees produce openly accessible, locally owned training and evaluation data. Explore released datasets in each domain area."
        crumbs={[{ label: "Datasets" }]}
      >
        <ContentSection eyebrow="Domains" title="Choose a domain">
          <div className="grid gap-5 sm:grid-cols-2">
            {domains.map((domain, i) => {
              const image = domainImages[domain.key];
              return (
                <Card
                  key={domain.key}
                  eyebrow={
                    counts[domain.key]
                      ? `${counts[domain.key] ?? 0} released datasets`
                      : "Grantmaking underway"
                  }
                  title={domain.label}
                  to={domain.to}
                  linkLabel="Explore datasets"
                  accent={i % 3 === 0 ? "primary" : i % 3 === 1 ? "sky" : "gold"}
                >
                  {image && (
                    <div className="relative mb-4 aspect-[3/2] overflow-hidden rounded-xl">
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {domain.summary}
                </Card>
              );
            })}
          </div>
        </ContentSection>

        <ContentSection
          eyebrow="Dataset explorer"
          title="Search the complete collection"
          description="Search all published datasets at once, then narrow the results by domain, language or location."
        >
          <DatasetList entries={allDatasets} unified />
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
