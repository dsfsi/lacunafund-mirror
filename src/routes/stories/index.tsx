import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { ContentSection } from "@/components/ui-kit";
import { stories } from "@/content/stories";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/stories/")({
  head: () => ({ meta: [...socialMeta, { title: "Stories — Lacuna Fund" }] }),
  component: StoriesPage,
});

function StoriesPage() {
  return (
    <AppShell>
      <BasePage
        eyebrow="Stories"
        title="Stories from Lacuna Fund"
        intro="Updates about the people, partnerships, and locally owned data advancing equitable machine learning."
        crumbs={[{ label: "Stories" }]}
      >
        <ContentSection eyebrow="Latest" title="News and perspectives">
          <div className="grid gap-5 sm:grid-cols-2">
            {stories.map((story, index) => (
              <article key={story.slug} className={`card-surface rounded-2xl p-6 ${index % 2 ? "halo-sky" : "halo-primary"}`}>
                <BookOpen className="size-5 text-primary" aria-hidden />
                <p className="mt-4 text-xs tracking-[0.14em] text-gold uppercase">{story.date}</p>
                <h2 className="mt-2 text-xl font-semibold text-foreground">{story.title}</h2>
                <p className="prose-body mt-3 text-sm">{story.excerpt}</p>
                <Link to="/stories/$slug" params={{ slug: story.slug }} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-sky">
                  Read story <ArrowRight className="size-4" aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </ContentSection>
      </BasePage>
    </AppShell>
  );
}
