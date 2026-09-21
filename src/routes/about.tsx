import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { Button, Card, ContentSection, InfoPanel } from "@/components/ui-kit";
import { renderInline } from "@/components/Markdown";
import { about, domains } from "@/data/site";
import { socialMeta } from "@/lib/seo";
import timOunImage from "@/assets/tim-oun-FjE-FyxDmlw-unsplash.jpg";
import needImage from "@/assets/compress_2H6A9795-1-810x540.jpg";
import agriImage from "@/assets/agri1.jpg";
import healthImage from "@/assets/health1.jpg";
import climateImage from "@/assets/climate1.jpg";
import langImage from "@/assets/lang1.jpg";

const domainImages: Record<string, string> = {
  agriculture: agriImage,
  health: healthImage,
  climate: climateImage,
  language: langImage,
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      ...socialMeta,
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
        aside={
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
            <img
              src={timOunImage}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        }
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={needImage}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
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
            {domains.map((domain, i) => {
              const image = domainImages[domain.key];
              return (
                <Card
                  key={domain.key}
                  eyebrow={`Domain 0${i + 1}`}
                  title={domain.label}
                  to={domain.to}
                  linkLabel="Learn More"
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

        <ContentSection id="grantmaking" eyebrow="Grantmaking" title="Our Grantmaking">
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
