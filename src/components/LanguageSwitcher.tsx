import { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";

const LANGS = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "sw", label: "Kiswahili" },
  { code: "am", label: "አማርኛ" },
  { code: "zu", label: "isiZulu" },
] as const;

const INCLUDED = LANGS.map((l) => l.code).join(",");

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

function readCookieLang(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return "en";
  const parts = decodeURIComponent(match[1] ?? "").split("/");
  return parts[2] || "en";
}

function writeCookieLang(code: string) {
  const host = window.location.hostname;
  const value = code === "en" ? "" : `/en/${code}`;
  const expire = code === "en" ? "Thu, 01 Jan 1970 00:00:00 GMT" : "";
  const base = `googtrans=${value};path=/;`;
  document.cookie = expire ? `${base}expires=${expire};` : base;
  document.cookie = expire
    ? `${base}domain=.${host};expires=${expire};`
    : `${base}domain=.${host};`;
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrent(readCookieLang());

    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: INCLUDED,
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const select = (code: string) => {
    setOpen(false);
    if (code === current) return;
    setCurrent(code);

    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) {
      combo.value = code === "en" ? "" : code;
      combo.dispatchEvent(new Event("change"));
      if (code === "en") {
        writeCookieLang("en");
        window.location.reload();
      }
      return;
    }

    writeCookieLang(code);
    window.location.reload();
  };

  const active = LANGS.find((l) => l.code === current) ?? LANGS[0];

  return (
    <div ref={wrapRef} className="relative notranslate">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        <Globe className="size-4" />
        <span className="hidden sm:inline">{active.label}</span>
        <ChevronDown className="size-3.5 opacity-70" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-card/95 p-1 shadow-lg backdrop-blur-md">
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => select(lang.code)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-primary/10 ${
                lang.code === current ? "text-primary" : "text-foreground"
              }`}
            >
              {lang.label}
              {lang.code === current && <Check className="size-3.5" />}
            </button>
          ))}
        </div>
      )}

      <div id="google_translate_element" className="sr-only" aria-hidden />
    </div>
  );
}
