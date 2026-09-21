import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Button, Card, ContentSection, InfoPanel } from "@/components/ui-kit";
import { governance, site } from "@/data/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/governance/")({
  head: () => ({
    meta: [
      ...socialMeta,
      { title: "Governance — Lacuna Fund Principles and Structure" },
      {
        name: "description",
        content:
          "Lacuna Fund's guiding principles, Steering Committee, technical advisory panels, funders, Secretariat and key policies for a multi-stakeholder funder collaborative.",
      },
      { property: "og:title", content: "Governance — Lacuna Fund Principles and Structure" },
      {
        property: "og:description",
        content:
          "A multi-tiered governance structure rooted in accessibility, equity, ethics, participation, quality and transformational impact.",
      },
    ],
  }),
  component: GovernancePage,
});

function GovernancePage() {
  return (
    <AppShell>
      <BasePage
        eyebrow="Governance"
        title="Governance"
        intro={governance.intro}
        crumbs={[{ label: "Governance" }]}
      >
        <ContentSection
          id="guiding-principles"
          eyebrow="Principles"
          title="Guiding Principles"
          description={governance.principlesIntro}
        >
          <Accordion type="single" collapsible className="card-surface rounded-2xl px-5">
            {governance.principles.map((principle) => (
              <AccordionItem key={principle.title} value={principle.title} className="border-border">
                <AccordionTrigger className="text-left text-base font-semibold hover:text-primary">
                  {principle.title}
                </AccordionTrigger>
                <AccordionContent className="prose-body text-sm">{principle.body}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ContentSection>

        <ContentSection eyebrow="Structure" title="Who governs the Fund">
          <div className="grid gap-5 md:grid-cols-3">
            {governance.bodies.map((body, i) => (
              <Card
                key={body.title}
                title={body.title}
                to={body.to}
                linkLabel={body.linkLabel}
                accent={i === 0 ? "gold" : i === 1 ? "primary" : "sky"}
              >
                <ImagePlaceholder label="Image Placeholder" ratio="3/2" className="mb-4" />
                {body.body}
              </Card>
            ))}
          </div>
        </ContentSection>

        <ContentSection eyebrow="Support" title="Secretariat">
          <InfoPanel tone="sky">{governance.secretariat}</InfoPanel>
          <div className="mt-6">
            <Button href={site.secretariatUrl} variant="outline" size="sm">
              Learn more about Meridian Institute
            </Button>
          </div>
        </ContentSection>

        <ContentSection eyebrow="Documents" title="Key Policies and Resources">
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
        </ContentSection>
      </BasePage>
    </AppShell>
  );
}
