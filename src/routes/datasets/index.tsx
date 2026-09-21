import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { DatasetList, type DatasetCategory, type DatasetEntry } from "@/components/DatasetList";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Card, ContentSection, InfoPanel, StatGrid } from "@/components/ui-kit";
import { domains } from "@/data/site";
import datasets from "@/data/datasets.json";
import { useGoogleSheetDatasets } from "@/lib/google-sheet-datasets";
import { socialMeta } from "@/lib/seo";

const datasetGroups = datasets as Record<string, DatasetEntry[]>;
const fallbackDatasets = Object.entries(datasetGroups).flatMap(([category, entries]) =>
  entries.map((entry) => ({ ...entry, category: category as DatasetCategory })),
);

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
  const { entries: allDatasets, status } = useGoogleSheetDatasets(fallbackDatasets);
  const counts = allDatasets.reduce<Record<string, number>>((totals, entry) => {
    if (entry.category) totals[entry.category] = (totals[entry.category] ?? 0) + 1;
    return totals;
  }, {});

  return (
    <AppShell>
      <BasePage
        eyebrow="Datasets"
        title="Datasets by domain"
        intro="Lacuna Fund grantees produce openly accessible, locally owned labeled datasets. Explore released datasets in each domain area."
        crumbs={[{ label: "Datasets" }]}
      >
        <div className="mb-8 flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/8 px-4 py-3 text-sm text-foreground halo-primary">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
            <CalendarClock className="size-4" aria-hidden />
          </span>
          <p>
            {status === "live" ? (
              <>Live catalogue from Google Sheets · last updated <strong className="font-semibold">20 September 2026</strong></>
            ) : status === "loading" ? (
              <>Loading the latest catalogue from Google Sheets…</>
            ) : (
              <>Showing the saved catalogue · last updated <strong className="font-semibold">20 September 2026</strong></>
            )}
          </p>
        </div>

        <StatGrid
          items={[
            { value: String(counts["agriculture"] ?? 0), label: "Agriculture datasets" },
            { value: String(counts["language"] ?? 0), label: "Language datasets" },
            { value: String(counts["health"] ?? 0), label: "Health datasets" },
            { value: "4", label: "Domain areas" },
          ]}
        />

        <ContentSection eyebrow="Domains" title="Choose a domain">
          <div className="grid gap-5 sm:grid-cols-2">
            {domains.map((domain, i) => (
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
                <ImagePlaceholder label="Image Placeholder" ratio="3/2" className="mb-4" />
                {domain.summary}
              </Card>
            ))}
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
