import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Database, Quote, PlayCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { FunderLogo } from "@/components/FunderLogo";
import { Button, Card, ContentSection, InfoPanel, StatGrid } from "@/components/ui-kit";
import { renderInline } from "@/components/Markdown";
import logoMark from "@/assets/logo-mark.png";
import { domains, funders, home, taps } from "@/data/site";
import datasets from "@/data/datasets.json";
import { socialMeta } from "@/lib/seo";
import { VideoEmbed } from "@/components/VideoEmbed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      ...socialMeta,
      { title: "Lacuna Fund — Labeled Data for Equitable Machine Learning" },
      {
        name: "description",
        content:
          "Lacuna Fund mobilizes funding for labeled datasets that solve urgent problems in low- and middle-income contexts, across agriculture, language, health and climate.",
      },
      { property: "og:title", content: "Lacuna Fund — Labeled Data for Equitable Machine Learning" },
      {
        property: "og:description",
        content:
          "The world's first collaborative effort to fund labeled datasets for social impact in low- and middle-income contexts globally.",
      },
    ],
  }),
  component: HomePage,
});

const datasetCounts = datasets as Record<string, unknown[]>;

function HomePage() {
  const total =
    (datasetCounts['agriculture']?.length ?? 0) +
    (datasetCounts['language']?.length ?? 0) +
    (datasetCounts['health']?.length ?? 0);

  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border grid-backdrop">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h1 className="font-display text-3xl leading-[1.12] font-semibold text-foreground sm:text-4xl lg:text-[2.9rem]">
                {home.headline}
              </h1>
              <p className="prose-body mt-6 max-w-2xl text-base sm:text-lg">{home.subhead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/apply">
                  Apply for funding
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
                <Button to="/datasets" variant="outline">
                  <Database className="size-4" aria-hidden />
                  Explore datasets
                </Button>
              </div>
            </div>

           <div className="relative">
  <div className="card-surface rounded-3xl p-6">
    <img
      src={logoMark}
      alt="Lacuna Fund logo"
      width={72}
      height={72}
      className="size-16 rounded-xl"
    />
    <h2 className="mt-5 font-display text-lg font-semibold text-foreground">
      {home.video.title}
    </h2>
    <p className="mt-2 text-xs text-muted-foreground">{home.video.caption}</p>

    <div className="mt-4">
      <VideoEmbed
        videoId="867005447"
        title={home.video.title}
      />
    </div>

    <a
      href={home.video.url}
      target="_blank"
      rel="noreferrer noopener"
      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-sky"
    >
      <PlayCircle className="size-4" aria-hidden />
      Watch on Vimeo
    </a>
  </div>
</div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10">
        <ContentSection eyebrow="Why Lacuna Fund" title="A first-of-its-kind funder collaborative">
          <div className="grid gap-6 lg:grid-cols-2">
            {home.intro.map((p) => (
              <p key={p.slice(0, 24)} className="prose-body text-[15px]">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <Button to="/about" variant="outline" size="sm">
              About the Fund
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </ContentSection>

        <ContentSection eyebrow="At a glance" title="The Fund in numbers">
          <StatGrid
            items={[
              { value: String(total), label: "Published datasets listed", tone: "primary" },
              { value: "4", label: "Domain areas funded", tone: "sky" },
              { value: String(taps.panels.length), label: "Technical advisory panels", tone: "gold" },
              { value: String(funders.list.length), label: "Funding partners", tone: "primary" },
            ]}
          />
        </ContentSection>

        <ContentSection
          eyebrow="Domains"
          title="Filling in the international data map"
          description="Lacuna Fund grants in four domain areas with key data needs."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {domains.map((domain, i) => (
              <Card
                key={domain.key}
                title={domain.label}
                to={domain.to}
                linkLabel="Learn more"
                accent={i % 3 === 0 ? "primary" : i % 3 === 1 ? "sky" : "gold"}
              >
                {domain.summary}
              </Card>
            ))}
          </div>
        </ContentSection>

        <ContentSection eyebrow="Funding partners" title="Supported by a multi-stakeholder collaborative">
          <p className="prose-body max-w-3xl text-[15px]">{home.fundingPartnersIntro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {funders.list.map((funder) => (
              <a
                key={funder.name}
                href={funder.url}
                target="_blank"
                rel="noreferrer noopener"
                className="card-surface group flex flex-col gap-3 rounded-xl p-4 transition-colors hover:border-sky/50"
              >
                <FunderLogo name={funder.name} />
                <span className="text-sm font-medium text-foreground group-hover:text-sky">
                  {funder.name}
                </span>
              </a>
            ))}
          </div>
          <div className="mt-8">
            <Button to="/governance/funders" variant="outline" size="sm">
              Learn about our funders collaborative
            </Button>
          </div>
        </ContentSection>

        <ContentSection>
          <blockquote className="card-surface relative overflow-hidden rounded-2xl p-8">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px accent-rule" />
            <Quote className="size-7 text-gold" aria-hidden />
            <p className="mt-5 font-display text-lg leading-relaxed text-foreground sm:text-xl">
              &ldquo;{home.quote.text}&rdquo;
            </p>
            <footer className="mt-6 text-sm">
              <span className="font-semibold text-primary">{home.quote.author}</span>
              <span className="block text-muted-foreground">{home.quote.role}</span>
            </footer>
          </blockquote>
        </ContentSection>

        <ContentSection eyebrow="Start here" title="Explore the Fund">
          <div className="grid gap-5 md:grid-cols-3">
            {home.pillars.map((pillar, i) => (
              <Card
                key={pillar.title}
                title={pillar.title}
                to={pillar.to}
                linkLabel={pillar.linkLabel}
                accent={i === 0 ? "sky" : i === 1 ? "primary" : "gold"}
              >
                {pillar.body}
              </Card>
            ))}
          </div>
        </ContentSection>

        <InfoPanel title="Apply for funding" tone="gold">
          {renderInline(
            "See open, upcoming, and past RFPs, as well as more information about domain areas and the application.",
          )}
          <div className="mt-4">
            <Link
              to="/apply"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-sky"
            >
              Go to Apply
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </InfoPanel>
      </main>
    </AppShell>
  );
}
