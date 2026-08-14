import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { ContentSection, InfoPanel } from "@/components/ui-kit";
import { taps } from "@/data/site";

export const Route = createFileRoute("/governance/technical-advisory-panels")({
  head: () => ({
    meta: [
      { title: "Technical Advisory Panels — Lacuna Fund" },
      {
        name: "description",
        content:
          "An independent Technical Advisory Panel is convened for each Lacuna Fund request for proposals, identifying data gaps and selecting proposals for funding since 2020.",
      },
      { property: "og:title", content: "Technical Advisory Panels — Lacuna Fund" },
      {
        property: "og:description",
        content:
          "Volunteer domain experts refine RFPs, review proposals and distil learnings across agriculture, language, health and climate panels.",
      },
    ],
  }),
  component: TapsPage,
});

function TapsPage() {
  const years = Array.from(new Set(taps.panels.map((p) => p.year)));

  return (
    <AppShell>
      <BasePage
        eyebrow="Governance"
        title="Technical Advisory Panels"
        intro={taps.intro}
        crumbs={[
          { label: "Governance", to: "/governance" },
          { label: "Technical Advisory Panels" },
        ]}
      >
        <ContentSection eyebrow="Responsibilities" title="What TAPs do">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoPanel title="Identify and refine" tone="sky">
              TAP members identify data gaps and refine requests for proposals within each domain
              area.
            </InfoPanel>
            <InfoPanel title="Review and select" tone="primary">
              Panels review and select proposals for funding, outline insights from the funding
              process, and make recommendations for future funding considerations.
            </InfoPanel>
          </div>
        </ContentSection>

        <ContentSection
          eyebrow="Timeline"
          title="Technical Advisory Panels (TAPs)"
          description="Panels convened for each request for proposals, most recent first."
        >
          <div className="space-y-8">
            {years.map((year) => (
              <div key={year} className="grid gap-4 sm:grid-cols-[80px_1fr]">
                <p className="font-display text-2xl font-semibold text-gold">{year}</p>
                <ul className="space-y-3 border-l border-border pl-5">
                  {taps.panels
                    .filter((p) => p.year === year)
                    .map((panel) => (
                      <li
                        key={panel.year + panel.name}
                        className="card-surface flex items-start gap-3 rounded-xl p-4"
                      >
                        <Users className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        <span>
                          <span className="block text-sm font-medium text-foreground">
                            {panel.name}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            Technical Advisory Panel
                          </span>
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </ContentSection>
      </BasePage>
    </AppShell>
  );
}
