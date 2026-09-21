import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Button, ContentSection, InfoPanel } from "@/components/ui-kit";
import { funders } from "@/data/site";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/governance/funders")({
  head: () => ({
    meta: [
      ...socialMeta,
      { title: "Funders — The Lacuna Fund Collaborative" },
      {
        name: "description",
        content:
          "From public-sector agencies to private philanthropies, Lacuna Fund's funders include The Rockefeller Foundation, Google.org, IDRC, BMZ, Wellcome, Moore, PJMF and RWJF.",
      },
      { property: "og:title", content: "Funders — The Lacuna Fund Collaborative" },
      {
        property: "og:description",
        content:
          "Development, philanthropic and research institutions committed to mobilizing labeled datasets that solve urgent local problems.",
      },
    ],
  }),
  component: FundersPage,
});

function FundersPage() {
  return (
    <AppShell>
      <BasePage
        eyebrow="Governance"
        title="Funders"
        intro={funders.intro}
        crumbs={[{ label: "Governance", to: "/governance" }, { label: "Funders" }]}
        aside={<ImagePlaceholder label="Funder Logos Placeholder" ratio="3/2" />}
      >
        <InfoPanel tone="gold" title="Global initiative">
          {funders.callout.text}{" "}
          <a href={funders.callout.url} target="_blank" rel="noreferrer noopener">
            AI for Global Health
          </a>
        </InfoPanel>

        <ContentSection eyebrow="Collaborative" title="Our funding partners">
          <div className="space-y-5">
            {funders.list.map((funder, i) => (
              <article
                key={funder.name}
                className="card-surface relative overflow-hidden rounded-2xl p-6"
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-1 ${
                    i % 3 === 0 ? "bg-primary" : i % 3 === 1 ? "bg-sky" : "bg-gold"
                  }`}
                />
                <div className="grid gap-5 sm:grid-cols-[170px_1fr] sm:items-start">
                  <ImagePlaceholder label="Logo Placeholder" ratio="3/2" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{funder.name}</h3>
                    <p className="prose-body mt-2 text-sm">{funder.body}</p>
                    <div className="mt-4">
                      <Button href={funder.url} variant="outline" size="sm">
                        Visit
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ContentSection>
      </BasePage>
    </AppShell>
  );
}
