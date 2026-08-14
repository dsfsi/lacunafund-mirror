import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { renderInline } from "@/components/Markdown";

/* ---------------------------------- Button --------------------------------- */

type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const buttonVariants: Record<string, string> = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 hover:shadow-glow",
  outline:
    "border border-border bg-surface/60 text-foreground hover:border-primary/60 hover:text-primary",
  ghost: "text-sky hover:text-primary",
  gold: "bg-gold text-gold-foreground hover:brightness-110",
};

const buttonSizes: Record<string, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
};

export function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: ButtonProps) {
  const classes = cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}

/* ------------------------------ ContentSection ----------------------------- */

export function ContentSection({
  title,
  eyebrow,
  description,
  children,
  id,
  className,
}: {
  title?: string;
  eyebrow?: string;
  description?: string;
  children?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-10 first:pt-0", className)}>
      {(eyebrow || title || description) && (
        <header className="mb-6 max-w-3xl">
          {eyebrow && (
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 accent-rule" aria-hidden />
              <span className="text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
                {eyebrow}
              </span>
            </div>
          )}
          {title && (
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
          )}
          {description && (
            <p className="prose-body mt-3 text-[15px]">{renderInline(description)}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

/* ---------------------------------- Card ----------------------------------- */

export function Card({
  title,
  children,
  to,
  href,
  linkLabel,
  accent = "primary",
  className,
  eyebrow,
}: {
  title?: string;
  children?: ReactNode;
  to?: string;
  href?: string;
  linkLabel?: string;
  accent?: "primary" | "sky" | "gold";
  className?: string;
  eyebrow?: string;
}) {
  const halo =
    accent === "sky" ? "halo-sky" : accent === "gold" ? "halo-gold" : "halo-primary";
  return (
    <article
      className={cn(
        "card-surface group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5",
        halo,
        className,
      )}
    >

      {eyebrow && (
        <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-sky uppercase">
          {eyebrow}
        </p>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      )}
      {children && <div className="prose-body mt-3 text-sm">{children}</div>}
      {(to || href) && linkLabel && (
        <div className="mt-5">
          {to ? (
            <Link
              to={to}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-sky"
            >
              {linkLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-sky"
            >
              {linkLabel}
              <ArrowRight className="size-4" />
            </a>
          )}
        </div>
      )}
    </article>
  );
}

/* -------------------------------- InfoPanel -------------------------------- */

export function InfoPanel({
  title,
  children,
  tone = "sky",
  icon,
  className,
}: {
  title?: string;
  children: ReactNode;
  tone?: "sky" | "gold" | "primary";
  icon?: ReactNode;
  className?: string;
}) {
  const tones: Record<string, string> = {
    sky: "border-sky/30 bg-sky/8 halo-sky",
    gold: "border-gold/35 bg-gold/8 halo-gold",
    primary: "border-primary/30 bg-primary/8 halo-primary",
  };
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-5",
        tones[tone],
        className,
      )}
    >

      {title && (
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          {icon}
          {title}
        </p>
      )}
      <div className="prose-body mt-2 text-sm">{children}</div>
    </div>
  );
}

/* ---------------------------------- Stats ---------------------------------- */

export function StatGrid({
  items,
}: {
  items: { value: string; label: string; tone?: "primary" | "sky" | "gold" }[];
}) {
  const toneText: Record<string, string> = {
    primary: "text-primary",
    sky: "text-sky",
    gold: "text-gold",
  };
  return (
    <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "card-surface rounded-2xl p-5",
            item.tone === "gold" ? "halo-gold" : item.tone === "primary" ? "halo-primary" : "halo-sky",
          )}
        >

          <dt className="text-xs tracking-wide text-muted-foreground uppercase">
            {item.label}
          </dt>
          <dd
            className={cn(
              "mt-2 font-display text-3xl font-semibold",
              toneText[item.tone ?? "primary"],
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------- Breadcrumbs ------------------------------- */

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <li>
          <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            <ChevronRight className="size-3 opacity-60" aria-hidden />
            {item.to && i < items.length - 1 ? (
              <Link to={item.to} className="transition-colors hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
