import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "lacuna-theme";

/** Dark mode is the default; the toggle opts into light mode. */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setLight(stored === "light");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", light);
    root.classList.toggle("dark", !light);
  }, [light]);

  const toggle = () => {
    const next = !light;
    setLight(next);
    window.localStorage.setItem(STORAGE_KEY, next ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
    >
      {light ? <Moon className="size-4" aria-hidden /> : <Sun className="size-4" aria-hidden />}
      {!compact && <span>{light ? "Dark" : "Light"}</span>}
    </button>
  );
}
