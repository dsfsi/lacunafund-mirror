import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FileText } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { Card, ContentSection, InfoPanel } from "@/components/ui-kit";
import { apply, domains, governance } from "@/data/site";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      ...socialMeta,
      { title: "Apply — Lacuna Fund Requests for Proposals" },
      {
        name: "description",
        content:
          "Who can apply to Lacuna Fund, the requirements for locally owned labeled datasets, and how the request for proposals process works from panel to published dataset.",
      },
      { property: "og:title", content: "Apply — Lacuna Fund Requests for Proposals" },
      {
        property: "og:description",
        content:
          "Eligibility, requirements and the five stages of the Lacuna Fund request for proposals process.",
      },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  return (
    <AppShell>
      <BasePage
        eyebrow="Apply"
        title="Apply for Lacuna Fund support"
        intro={apply.intro}
        crumbs={[{ label: "Apply" }]}
      >
        <ContentSection eyebrow="Domain areas" title="Where we grant">
          <div className="grid gap-5 sm:grid-cols-2">
            {domains.map((domain, i) => (
              <Card
                key={domain.key}
                title={domain.label}
                to={domain.to}
                linkLabel="See datasets"
                accent={i % 3 === 0 ? "primary" : i % 3 === 1 ? "sky" : "gold"}
              >
                {domain.summary}
              </Card>
            ))}
          </div>
        </ContentSection>

        <ContentSection eyebrow="Eligibility" title="Who can apply">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="card-surface rounded-2xl p-6">
              <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
                Eligible applicants
              </h3>
              <ul className="mt-4 space-y-3">
                {apply.eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface rounded-2xl p-6">
              <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
                Requirements
              </h3>
              <ul className="mt-4 space-y-3">
                {apply.requirements.map((item) => (
                  <li key={item.slice(0, 20)} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sky" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContentSection>

        <ContentSection eyebrow="Process" title="How the RFP process works">
          <ol className="relative space-y-6 border-l border-border pl-6">
            {apply.process.map((stage) => (
              <li key={stage.step} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-[31px] size-2.5 rounded-full bg-primary ring-4 ring-background"
                />
                <p className="font-display text-xs tracking-[0.2em] text-gold">{stage.step}</p>
                <h3 className="mt-1 text-base font-semibold text-foreground">{stage.title}</h3>
                <p className="prose-body mt-1.5 text-sm">{stage.body}</p>
              </li>
            ))}
          </ol>
        </ContentSection>

        <ContentSection eyebrow="Resources" title="Key policies for applicants">
          <div className="grid gap-4 sm:grid-cols-2">
            {governance.policies.map((policy) => (
              <a
                key={policy.label}
                href={policy.url}
                target="_blank"
                rel="noreferrer noopener"
                className="card-surface flex items-center gap-3 rounded-xl p-5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <FileText className="size-4 text-gold" aria-hidden />
                {policy.label}
              </a>
            ))}
          </div>
          <InfoPanel title="Secretariat" tone="sky" className="mt-6">
            {governance.secretariat}
          </InfoPanel>
        </ContentSection>
      </BasePage>
    </AppShell>
  );
}
