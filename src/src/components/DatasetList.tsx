import { useMemo, useState } from "react";
import { ArrowUpRight, Search, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { renderInline } from "@/components/Markdown";

export type DatasetField = { label: string; value: string; items?: string[] };
export type DatasetEntry = { title: string; fields: DatasetField[]; body: string[] };

const haloCycle = ["halo-primary", "halo-sky", "halo-gold"];

function firstUrl(entry: DatasetEntry): string | undefined {
  const text = [...entry.fields.map((f) => f.value), ...entry.body].join(" ");
  const match = text.match(/https?:\/\/[^\s)\]]+/);
  return match?.[0];
}

export function DatasetList({ entries }: { entries: DatasetEntry[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((entry) =>
      (entry.title + " " + entry.fields.map((f) => f.value).join(" "))
        .toLowerCase()
        .includes(q),
    );
  }, [entries, query]);

  if (!entries.length) {
    return (
      <div className="card-surface halo-sky rounded-2xl p-6 text-sm text-muted-foreground">
        No published datasets are listed for this domain yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="relative block">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search datasets by title, author or keyword"
          className="w-full rounded-full border border-input bg-surface/70 py-3 pr-4 pl-11 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
        />
      </label>

      <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
        Showing {filtered.length} of {entries.length}
      </p>

      {filtered.length === 0 && (
        <div className="card-surface halo-gold rounded-2xl p-6 text-sm text-muted-foreground">
          No datasets match “{query}”.
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
