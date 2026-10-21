import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Download, Video } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { Button, ContentSection, InfoPanel, StatGrid } from "@/components/ui-kit";
import { sdgDatasetUtilizationRfp as rfp } from "@/data/site";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/sdg-dataset-utilization-rfp")({
  head: () => ({
    meta: [
      ...socialMeta,
      { title: "SDG Dataset Utilization RFP — Lacuna Fund" },
      {
        name: "description",
        content:
          "Apply for funding to train, scale, and apply machine learning models using Lacuna Fund's open datasets.",
      },
    ],
  }),
  component: SdgDatasetUtilizationRfpPage,
});

function SdgDatasetUtilizationRfpPage() {
  return (
    <AppShell>
      <BasePage
        eyebrow="Open request for proposals"
        title={rfp.title}
        intro={rfp.intro}
        crumbs={[{ label: "Apply", to: "/apply" }, { label: "SDG Dataset Utilization RFP" }]}
        aside={
          <div className="flex flex-wrap gap-3">
            <Button href={rfp.registrationUrl} size="sm">
              <Video className="size-4" aria-hidden /> Register for webinar
            </Button>
            <Button href={rfp.rfpUrl} variant="outline" size="sm">
              <Download className="size-4" aria-hidden /> Download RFP
            </Button>
          </div>
        }
      >
        <ContentSection
          eyebrow="Opportunity"
          title="Training and scaling ML models for the Global South"
        >
          <p className="prose-body max-w-3xl text-[15px]">{rfp.summary}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {rfp.facts.map(([label, value]) => (
              <div key={label} className="card-surface rounded-xl p-5">
                <p className="text-xs tracking-wide text-muted-foreground uppercase">{label}</p>
                <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection eyebrow="Eligibility" title="Who can apply">
          <div className="grid gap-3 lg:grid-cols-2">
            {rfp.eligibility.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl border border-border bg-surface/40 p-4 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                {item}
              </div>
            ))}
          </div>
        </ContentSection>

        <ContentSection eyebrow="Dataset utilization" title="What we will support">
          <p className="prose-body max-w-3xl text-[15px]">{rfp.application}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {rfp.uses.map((item) => (
              <li key={item} className="card-surface rounded-xl p-4 text-sm text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection eyebrow="Assessment" title="How proposals will be reviewed">
          <StatGrid
            items={rfp.criteria.map((label, index) => ({
              value: `0${index + 1}`,
              label,
              tone: index % 3 === 1 ? "sky" : index % 3 === 2 ? "gold" : "primary",
            }))}
          />
        </ContentSection>

        <ContentSection eyebrow="Schedule" title="Key dates">
          <div className="overflow-hidden rounded-2xl border border-border">
            <dl className="divide-y divide-border">
              {rfp.timeline.map(([milestone, date]) => (
                <div
                  key={milestone}
                  className="grid gap-1 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <dt className="text-sm font-medium text-foreground">{milestone}</dt>
                  <dd className="text-sm text-primary">{date}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ContentSection>

        <InfoPanel title="Questions" tone="sky">
          {rfp.questions}
        </InfoPanel>
      </BasePage>
    </AppShell>
  );
}
