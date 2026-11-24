export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  body: string;
};

const files = import.meta.glob("./stories/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseStory(path: string, raw: string): Story {
  const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "story";
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  const fields: Record<string, string> = {};
  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const separator = line.indexOf(":");
      if (separator < 1) continue;
      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
      fields[key] = value;
    }
  }

  return {
    slug,
    title: fields.title || slug.replace(/-/g, " "),
    excerpt: fields.excerpt || "",
    date: fields.date || "",
    image: fields.image,
    body: (match?.[2] ?? raw).trim(),
  };
}

export const stories = Object.entries(files)
  .map(([path, raw]) => parseStory(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

export function storyBySlug(slug: string) {
  return stories.find((story) => story.slug === slug);
}
