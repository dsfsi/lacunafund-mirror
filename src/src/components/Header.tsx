import { Menu } from "lucide-react";
import { Button } from "@/components/ui-kit";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/data/site";

export function Header({ onOpenMobile }: { onOpenMobile: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={onOpenMobile}
          aria-label="Open navigation"
          className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-primary lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        <p className="hidden text-xs text-muted-foreground sm:block">
          {site.tagline}
        </p>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button to="/apply" size="sm" className="hidden sm:inline-flex">
            Apply
          </Button>
        </div>
      </div>
      <span aria-hidden className="block h-px w-full accent-rule opacity-40" />
    </header>
  );
}
