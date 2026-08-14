import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Button, Card, ContentSection, InfoPanel } from "@/components/ui-kit";
import { renderInline } from "@/components/Markdown";
import { about, domains } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Lacuna Fund — The Need and Our Approach" },
      {
        name: "description",
        content:
          "Why labeled, unbiased data is missing in low- and middle-income contexts, and how Lacuna Fund funds locally owned datasets across agriculture, language, health and climate.",
      },
      { property: "og:title", content: "About Lacuna Fund — The Need and Our Approach" },
      {
        property: "og:description",
        content:
          "Lacuna Fund provides data scientists, researchers and social entrepreneurs with resources to produce labeled datasets that address urgent local problems.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <AppShell>
      <BasePage
        eyebrow="About"
        title="About Lacuna Fund"
        intro={about.intro}
        crumbs={[{ label: "About" }]}
        aside={<ImagePlaceholder label="Image Placeholder" ratio="3/2" />}
      >
        <ContentSection eyebrow="The challenge" title="The Need">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              {about.need.map((p) => (
                <p key={p.slice(0, 24)} className="prose-body text-[15px]">
                  {p}
                </p>
              ))}
            </div>
            <ImagePlaceholder label="Image Placeholder" ratio="4/3" />
          </div>
        </ContentSection>

        <ContentSection
          eyebrow="Our approach"
          title="The World's First Collaborative Effort to Fund Labeled Data for Social Impact"
        >
          <div className="space-y-4">
            {about.collaborative.map((p) => (
              <p key={p.slice(0, 24)} className="prose-body text-[15px]">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-6">
            <Button href={about.pressRelease.url} variant="outline" size="sm">
              {about.pressRelease.label}
            </Button>
          </div>
        </ContentSection>

        <ContentSection
          eyebrow="Domains"
          title="Filling in the International Data Map"
          description={about.domainsIntro}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {domains.map((domain, i) => (
              <Card
                key={domain.key}
                eyebrow={`Domain 0${i + 1}`}
                title={domain.label}
                to={domain.to}
                linkLabel="Learn More"
                accent={i % 3 === 0 ? "primary" : i % 3 === 1 ? "sky" : "gold"}
              >
                <ImagePlaceholder label="Image Placeholder" ratio="3/2" className="mb-4" />
                {domain.summary}
              </Card>
            ))}
          </div>
        </ContentSection>

        <ContentSection eyebrow="Grantmaking" title="Our Grantmaking">
          <div className="space-y-4">
            {about.grantmaking.map((p) => (
              <p key={p.slice(0, 24)} className="prose-body text-[15px]">
                {p}
              </p>
            ))}
          </div>
        </ContentSection>

        <ContentSection
          eyebrow="Our ambition"
          title="Galvanizing a step change in machine learning's potential worldwide."
        >
          <InfoPanel title="Lacuna Fund aims to:" tone="primary">
            <ul className="mt-2 space-y-3">
              {about.aims.map((aim) => (
                <li key={aim.slice(0, 20)} className="flex gap-3 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>{aim}</span>
                </li>
              ))}
            </ul>
          </InfoPanel>
          <div className="mt-8 space-y-4">
            {about.aimsBody.map((p) => (
              <p key={p.slice(0, 24)} className="prose-body text-[15px]">
                {renderInline(p)}
              </p>
            ))}
          </div>
        </ContentSection>

        <ContentSection eyebrow="Next step" title="Apply">
          <Card title="See open, upcoming, and past RFPs" to="/apply" linkLabel="Apply" accent="gold">
            More information about domain areas and the application process.
          </Card>
        </ContentSection>
      </BasePage>
    </AppShell>
  );
}
