import { Link } from "@tanstack/react-router";
import logoMark from "@/assets/logo-mark.png";
import { navigation, site, governance } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-sidebar/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logoMark}
              alt={`${site.name} logo`}
              width={36}
              height={36}
              loading="lazy"
              className="size-9 rounded-lg"
            />
            <span className="font-display font-semibold text-foreground">{site.name}</span>
          </div>
          <p className="prose-body mt-4 max-w-sm text-sm">{site.tagline} in low- and middle-income contexts globally.</p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
            Policies & Secretariat
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {governance.policies.map((policy) => (
              <li key={policy.label}>
                <a
                  href={policy.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {policy.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.secretariatUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Meridian Institute (Secretariat)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground sm:px-6 lg:px-10">
        {site.name} &mdash; a funder collaborative for equitable machine learning data.
      </div>
    </footer>
  );
}
