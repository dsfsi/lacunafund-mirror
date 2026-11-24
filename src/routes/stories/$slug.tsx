import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BasePage } from "@/components/BasePage";
import { ContentMarkdown } from "@/components/ContentMarkdown";
import { storyBySlug } from "@/content/stories";
import { socialMeta } from "@/lib/seo";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = storyBySlug(params.slug);
    if (!story) throw notFound();
    return story;
  },
  head: ({ loaderData }) => ({ meta: [...socialMeta, { title: `${loaderData?.title ?? "Story"} — Lacuna Fund` }] }),
  component: StoryPage,
});

function StoryPage() {
  const story = Route.useLoaderData();
  return (
    <AppShell>
      <BasePage eyebrow="Stories" title={story.title} intro={story.excerpt} crumbs={[{ label: "Stories", to: "/stories" }, { label: story.title }]}>
        <article className="max-w-3xl">
          <p className="text-xs tracking-[0.14em] text-gold uppercase">{story.date}</p>
          <div className="content-article mt-7">
            <ContentMarkdown source={story.body} />
          </div>
          <a href="/stories" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-sky">
            <ArrowLeft className="size-4" aria-hidden /> All stories
          </a>
        </article>
      </BasePage>
    </AppShell>
  );
}
