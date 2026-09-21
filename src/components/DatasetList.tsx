import { useMemo, useState } from "react";
import { ArrowUpRight, Filter, Search, Users, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { renderInline } from "@/components/Markdown";

export type DatasetField = { label: string; value: string; items?: string[] };
export type DatasetCategory = "agriculture" | "language" | "health" | "climate";
export type DatasetEntry = {
  title: string;
  fields: DatasetField[];
  body: string[];
  category?: DatasetCategory;
};

const haloCycle = ["halo-primary", "halo-sky", "halo-gold"];

function firstUrl(entry: DatasetEntry): string | undefined {
  const text = [...entry.fields.map((f) => f.value), ...entry.body].join(" ");
  const match = text.match(/https?:\/\/[^\s)\]]+/);
  return match?.[0];
}

const categoryLabels: Record<DatasetCategory, string> = {
  agriculture: "Agriculture",
  language: "Language",
  health: "Health",
  climate: "Climate",
};

const metadataLabels = {
  language: /^languages?$/i,
  location: /^(countries?|region)$/i,
};

function metadataValues(entry: DatasetEntry, kind: keyof typeof metadataLabels) {
  return entry.fields
    .filter((field) => metadataLabels[kind].test(field.label))
    .flatMap((field) =>
      field.value
        .replace(/\[[^\]]+\]\([^)]*\)/g, "")
        .split(/,|;|\band\b/i)
        .map((value) => value.trim())
        .filter(Boolean),
    );
}

function optionValues(entries: DatasetEntry[], kind: keyof typeof metadataLabels) {
  return Array.from(new Set(entries.flatMap((entry) => metadataValues(entry, kind)))).sort(
    (a, b) => a.localeCompare(b),
  );
}

export function DatasetList({ entries, unified = false }: { entries: DatasetEntry[]; unified?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | DatasetCategory>("all");
  const [language, setLanguage] = useState("all");
  const [location, setLocation] = useState("all");

  const languageOptions = useMemo(() => optionValues(entries, "language"), [entries]);
  const locationOptions = useMemo(() => optionValues(entries, "location"), [entries]);
  const categoryCounts = useMemo(
    () =>
      entries.reduce<Record<string, number>>((counts, entry) => {
        if (entry.category) counts[entry.category] = (counts[entry.category] ?? 0) + 1;
        return counts;
      }, {}),
    [entries],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const searchable = [
        entry.title,
        ...entry.fields.flatMap((field) => [field.label, field.value, ...(field.items ?? [])]),
        ...entry.body,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !q || searchable.includes(q);
      const matchesCategory = category === "all" || entry.category === category;
      const matchesLanguage =
        language === "all" || metadataValues(entry, "language").includes(language);
      const matchesLocation =
        location === "all" || metadataValues(entry, "location").includes(location);
      return matchesQuery && matchesCategory && matchesLanguage && matchesLocation;
    });
  }, [category, entries, language, location, query]);

  const hasFilters = Boolean(query.trim()) || category !== "all" || language !== "all" || location !== "all";

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setLanguage("all");
    setLocation("all");
  };

  if (!entries.length) {
    return (
      <div className="card-surface halo-sky rounded-2xl p-6 text-sm text-muted-foreground">
        No published datasets are listed for this domain yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className={unified ? "card-surface halo-sky rounded-2xl p-4 sm:p-5" : undefined}>
        <label className="relative block">
          <span className="sr-only">Search datasets</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, country, language or keyword"
            className="w-full rounded-xl border border-input bg-background/45 py-3 pr-4 pl-11 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
        </label>

        {unified && (
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-2" aria-label="Filter by category">
              {(["all", "agriculture", "language", "health", "climate"] as const).map(
                (value) => {
                  const label = value === "all" ? "All datasets" : categoryLabels[value];
                  const count = value === "all" ? entries.length : (categoryCounts[value] ?? 0);
                  return (
                    <Button
                      key={value}
                      type="button"
                      size="sm"
                      variant={category === value ? "default" : "outline"}
                      onClick={() => setCategory(value)}
                      aria-pressed={category === value}
                      className="rounded-full"
                    >
                      {label}
                      <span className="opacity-70">{count}</span>
                    </Button>
                  );
                },
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="h-10 rounded-xl bg-background/45" aria-label="Filter by language">
                  <SelectValue placeholder="All languages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All languages</SelectItem>
                  {languageOptions.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="h-10 rounded-xl bg-background/45" aria-label="Filter by location">
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  {locationOptions.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                type="button"
                variant="ghost"
                onClick={clearFilters}
                disabled={!hasFilters}
                className="h-10 justify-self-start rounded-xl text-muted-foreground lg:justify-self-end"
              >
                <X className="size-4" aria-hidden />
                Clear filters
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs tracking-[0.14em] text-muted-foreground uppercase">
        {unified && <Filter className="size-3.5 text-primary" aria-hidden />}
        <p aria-live="polite">Showing {filtered.length} of {entries.length}</p>
      </div>

      {filtered.length === 0 && (
        <div className="card-surface halo-gold rounded-2xl p-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">No datasets match these filters.</p>
          <p className="mt-1">Try a broader search or clear the selected filters.</p>
          {unified && (
            <Button type="button" variant="outline" size="sm" onClick={clearFilters} className="mt-4">
              Clear filters
            </Button>
          )}
        </div>
      )}

      <Accordion type="single" collapsible className="space-y-4">
        {filtered.map((entry, index) => {
          const url = firstUrl(entry);
          const authors = entry.fields.find((f) => /author/i.test(f.label))?.value;
          return (
            <AccordionItem
              key={entry.title + index}
              value={entry.title + index}
              className={`card-surface overflow-hidden rounded-2xl border-0 px-5 ${
                haloCycle[index % haloCycle.length]
              }`}
            >
              <AccordionTrigger className="py-5 text-left hover:no-underline">
                <span className="flex w-full items-start gap-4">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/12 font-display text-xs font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    {entry.category && (
                      <span className="mb-1 block text-[10px] font-semibold tracking-[0.14em] text-primary uppercase">
                        {categoryLabels[entry.category]}
                      </span>
                    )}
                    <span className="block text-[15px] font-semibold text-foreground">
                      {entry.title}
                    </span>
                    {authors && (
                      <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="size-3.5 shrink-0 text-sky" aria-hidden />
                        <span className="line-clamp-1">{authors}</span>
                      </span>
                    )}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <dl className="grid gap-4 sm:grid-cols-2">
                  {entry.fields.map((field, i) => (
                    <div
                      key={field.label + i}
                      className="rounded-xl border border-border/60 bg-surface/40 p-4"
                    >
                      <dt className="text-[11px] font-medium tracking-[0.14em] text-sky uppercase">
                        {field.label}
                      </dt>
                      {field.value && (
                        <dd className="prose-body mt-1 text-sm">{renderInline(field.value)}</dd>
                      )}
                      {field.items && (
                        <dd className="mt-2">
                          <ul className="space-y-1.5">
                            {field.items.map((item, j) => (
                              <li key={j} className="prose-body flex gap-2 text-sm">
                                <span
                                  aria-hidden
                                  className="mt-2 size-1.5 shrink-0 rounded-full bg-gold"
                                />
                                <span>{renderInline(item)}</span>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
                {entry.body.length > 0 && (
                  <div className="mt-5 space-y-3 border-t border-border pt-5">
                    {entry.body.map((p, i) => (
                      <p key={i} className="prose-body text-sm">
                        {renderInline(p)}
                      </p>
                    ))}
                  </div>
                )}
                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
                  >
                    Open dataset
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
