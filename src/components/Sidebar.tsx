import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronsLeft,
  ChevronsRight,
  CloudSun,
  Database,
  HeartPulse,
  Home,
  Info,
  Languages,
  Network,
  Send,
  Sprout,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
import { navigation, site } from "@/data/site";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  home: Home,
  info: Info,
  network: Network,
  database: Database,
  send: Send,
  sprout: Sprout,
  languages: Languages,
  "heart-pulse": HeartPulse,
  "cloud-sun": CloudSun,
};

export function Sidebar({
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(to + "/");

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar transition-[width,transform] duration-300 ease-out",
          collapsed ? "lg:w-[76px]" : "lg:w-72",
          "w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-4">
          <Link to="/" className="flex min-w-0 items-center gap-3" onClick={onCloseMobile}>
            <img
              src={logoMark}
              alt={`${site.name} logo`}
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-lg"
            />
            {!collapsed && (
              <span className="min-w-0">
                <span className="block truncate font-display text-sm font-semibold text-sidebar-foreground">
                  {site.name}
                </span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  Labeled data for social impact
                </span>
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={onCloseMobile}
            className="ml-auto rounded-md p-1.5 text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = icons[item.icon] ?? Home;
              const active = isActive(item.to);
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={onCloseMobile}
                    aria-current={active ? "page" : undefined}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                      collapsed && "justify-center px-0",
                    )}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className="absolute top-1.5 bottom-1.5 -left-3 w-[3px] rounded-r bg-primary"
                      />
                    )}
                    <Icon
                      className={cn(
                        "size-[18px] shrink-0",
                        active ? "text-primary" : "text-muted-foreground group-hover:text-sky",
                      )}
                      aria-hidden
                    />
                    {!collapsed && <span className="truncate font-medium">{item.label}</span>}
                  </Link>

                  {!collapsed && item.children && active && (
                    <ul className="mt-1 mb-2 ml-[26px] space-y-0.5 border-l border-sidebar-border pl-3">
                      {item.children.map((child) => (
                        <li key={child.to + child.label}>
                          <Link
                            to={child.to}
                            onClick={onCloseMobile}
                            className={cn(
                              "block rounded-md px-2 py-1.5 text-[13px] transition-colors",
                              pathname === child.to
                                ? "text-primary"
                                : "text-muted-foreground hover:text-sky",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <button
            type="button"
            onClick={onToggleCollapsed}
            className={cn(
              "hidden w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground lg:flex",
              collapsed && "justify-center px-0",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronsRight className="size-4" aria-hidden />
            ) : (
              <>
                <ChevronsLeft className="size-4" aria-hidden />
                <span>Collapse sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
