import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { ContentSection, InfoPanel } from "@/components/ui-kit";
import { steeringCommittee } from "@/data/site";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/governance/steering-committee")({
  head: () => ({
    meta: [
      ...socialMeta,
      { title: "Steering Committee — Lacuna Fund" },
      {
        name: "description",
        content:
          "The Lacuna Fund Steering Committee of 5-9 members provides strategic direction and oversight, balancing perspectives that serve the Fund's guiding principles.",
      },
      { property: "og:title", content: "Steering Committee — Lacuna Fund" },
      {
        property: "og:description",
        content:
          "Members bring understanding of labeled data globally and transformative interventions in machine learning, equity and development.",
      },
    ],
  }),
  component: SteeringCommitteePage,
});

function SteeringCommitteePage() {
  return (
    <AppShell>
      <BasePage
        eyebrow="Governance"
        title="Lacuna Fund Steering Committee"
        intro={steeringCommittee.intro}
        crumbs={[{ label: "Governance", to: "/governance" }, { label: "Steering Committee" }]}
      >
        <ContentSection
          eyebrow="Role"
          title="Steering Committee"
          description={steeringCommittee.role}
        >
          <InfoPanel title="Composition" tone="gold">
            A representative committee of 5&ndash;9 members, with a balance of perspectives that
            serves the principles of Lacuna Fund.
          </InfoPanel>
        </ContentSection>

        <ContentSection eyebrow="Members" title="Committee members">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steeringCommittee.members.map((member) => (
              <article key={member} className="card-surface overflow-hidden rounded-2xl">
                <div className="p-5">
                  <h3 className="text-base font-semibold text-foreground">{member}</h3>
                  <p className="mt-1 text-xs tracking-wide text-sky uppercase">
                    Steering Committee Member
                  </p>
                </div>
              </article>
            ))}
          </div>
        </ContentSection>
      </BasePage>
    </AppShell>
  );
}
