import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Card, ContentSection, InfoPanel, StatGrid } from "@/components/ui-kit";
import { DatasetList, type DatasetEntry } from "@/components/DatasetList";
import { domains } from "@/data/site";
import datasets from "@/data/datasets.json";

const byDomain = datasets as Record<string, DatasetEntry[]>;

function countAuthors(entries: DatasetEntry[]) {
  const names = new Set<string>();
  for (const entry of entries) {
    const field = entry.fields.find((f) => /author/i.test(f.label));
    if (!field?.value) continue;
    for (const part of field.value.split(/,| and |;/)) {
      const name = part.replace(/\(.*?\)/g, "").trim();
      if (name.length > 2) names.add(name.toLowerCase());
    }
  }
  return names.size;
}

export function DomainPage({ domainKey }: { domainKey: string }) {
  const domain = domains.find((d) => d.key === domainKey)!;
  const entries = byDomain[domainKey] ?? [];
  const featured = entries[0];
  const authors = countAuthors(entries);

  return (
    <AppShell>
      <BasePage
        eyebrow="Datasets"
        title={domain.label}
        intro={domain.summary}
        crumbs={[{ label: "Datasets", to: "/datasets" }, { label: domain.label }]}
        aside={<ImagePlaceholder label="Image Placeholder" ratio="3/2" />}
      >
        <StatGrid
          items={[
            { value: String(entries.length), label: "Released datasets", tone: "primary" },
            { value: authors ? `${authors}+` : "—", label: "Contributing authors", tone: "sky" },
            { value: "Open", label: "Access & licensing", tone: "gold" },
            { value: domain.label, label: "Domain area", tone: "sky" },
          ]}
        />

        <ContentSection eyebrow="Why it matters" title={`${domain.label} and machine learning`}>
          <div className="grid gap-5 lg:grid-cols-3">
            <Card className="lg:col-span-2" accent="sky">
              <p className="prose-body text-[15px]">{domain.datasetIntro}</p>
            </Card>
            <InfoPanel
              tone="primary"
              title="Locally owned by design"
              icon={<Sparkles className="size-4 text-primary" aria-hidden />}
            >
              Every dataset here was produced by teams in low- and middle-income contexts and is
              openly accessible to the international community.
            </InfoPanel>
          </div>
        </ContentSection>

        {featured && (
          <ContentSection eyebrow="Spotlight" title="Featured dataset">
            <Card accent="gold" eyebrow="Recently listed" title={featured.title}>
              {featured.fields.find((f) => /description/i.test(f.label))?.value ??
                featured.body[0] ??
                ""}
            </Card>
          </ContentSection>
        )}

        <ContentSection
          eyebrow="Released datasets"
          title={entries.length ? `${entries.length} datasets` : "Datasets in progress"}
          description={
            entries.length
              ? "Search the collection, then expand an entry to see authors, descriptions and access links."
              : ""
          }
        >
          {entries.length ? (
            <DatasetList entries={entries} />
          ) : (
            <InfoPanel tone="gold" title="Coming soon">
              Grantmaking in this domain is guided by dedicated technical advisory panels. Released
              datasets will be listed here as projects complete.
            </InfoPanel>
          )}
        </ContentSection>
      </BasePage>
    </AppShell>
  );
}
