import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui-kit";
import { renderInline } from "@/components/Markdown";

/**
 * BasePage — reusable page template.
 * Provides breadcrumbs, page header, main content container and consistent spacing.
 * New pages only need: <BasePage title=... crumbs=... intro=...>{sections}</BasePage>
 */
export function BasePage({
  title,
  eyebrow,
  intro,
  crumbs = [],
  aside,
  children,
}: {
  title: string;
  eyebrow?: string;
  intro?: string;
  crumbs?: Crumb[];
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="relative overflow-hidden border-b border-border grid-backdrop">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <Breadcrumbs items={crumbs} />
          {eyebrow && (
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 accent-rule" aria-hidden />
              <span className="text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
                {eyebrow}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
                {title}
              </h1>
              {intro && (
                <p className="prose-body mt-5 text-base sm:text-[17px]">{renderInline(intro)}</p>
              )}
            </div>
            {aside && <div className="w-full lg:max-w-sm">{aside}</div>}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-10">{children}</main>
    </div>
  );
}
