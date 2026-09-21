import { useEffect, useState } from "react";
import type { DatasetCategory, DatasetEntry, DatasetField } from "@/components/DatasetList";

const spreadsheetId = "18sgZgPGZuZjeBTHrmbr1Ra7mx8vSToUqnx8vCjhIp0c";
const sheetId = "2002859408";

type GoogleCell = { v?: unknown; f?: string } | null;
type GoogleTable = { rows?: { c?: GoogleCell[] }[] };
type GoogleResponse = { status?: string; table?: GoogleTable };

const text = (cell: GoogleCell) => String(cell?.f ?? cell?.v ?? "").trim();

function categoryFor(row: string[]): DatasetCategory {
  const title = row[1] || row[2] || "";
  const combined = `${title} ${row[3]} ${row[4]} ${row[7]} ${row[16]}`.toLowerCase();

  if (/health|medical|malaria|tumou?r|anesthesia|rabies|malnutrition|microscopy/.test(combined)) {
    return "health";
  }
  if (/agric|crop|farm|maize|cashew|cocoa|coffee|aquaponic|food security|sdg\s*2/.test(combined)) {
    return "agriculture";
  }
  if (/language|lingu|speech|translation|corpus|nlp|sentiment|named entity|part.of.speech/.test(combined)) {
    return "language";
  }
  return "climate";
}

function field(label: string, value: string): DatasetField | undefined {
  const clean = value.trim();
  return clean ? { label, value: clean } : undefined;
}

function mapRow(cells: GoogleCell[]): DatasetEntry | undefined {
  const row = Array.from({ length: 25 }, (_, index) => text(cells[index] ?? null));
  const value = (index: number) => row[index] ?? "";
  if (!/^ui_\d+$/i.test(value(0))) return undefined;

  const title = value(1) || value(2);
  if (!title) return undefined;

  const fields = [
    field("Country / Region", value(3)),
    field("Description", value(4)),
    field("Dataset", value(5)),
    field("AI model or application", value(6)),
    field("Sector / Sustainable Development Goal", value(7)),
    field("Maturity", value(8)),
    field("Type of data", value(9)),
    field("Contact and community support", value(10)),
    field("Data characteristics", value(11)),
    field("Organisations involved", value(14)),
    field("Technical domain", value(16)),
    field("License", value(18)),
    field("Additional resources", value(19)),
  ].filter((value): value is DatasetField => Boolean(value));

  return {
    title,
    category: categoryFor(row),
    fields,
    body: [value(12), value(13)].filter(Boolean),
  };
}

let cachedRequest: Promise<DatasetEntry[]> | undefined;

function loadSheet(): Promise<DatasetEntry[]> {
  if (cachedRequest) return cachedRequest;

  const request = new Promise<DatasetEntry[]>((resolve, reject) => {
    const callbackName = `lacunaDatasets_${Date.now()}`;
    const browserWindow = window as typeof window & Record<string, unknown>;
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => finish(new Error("The spreadsheet took too long to respond.")), 15000);

    const cleanup = () => {
      window.clearTimeout(timeout);
      script.remove();
      delete browserWindow[callbackName];
    };

    const finish = (error?: Error, entries?: DatasetEntry[]) => {
      cleanup();
      if (error) reject(error);
      else resolve(entries ?? []);
    };

    browserWindow[callbackName] = (response: GoogleResponse) => {
      if (response.status !== "ok") {
        finish(new Error("The spreadsheet could not be read."));
        return;
      }
      const entries = (response.table?.rows ?? [])
        .map((row) => mapRow(row.c ?? []))
        .filter((entry): entry is DatasetEntry => Boolean(entry));
      finish(undefined, entries);
    };

    script.onerror = () => finish(new Error("The spreadsheet could not be reached."));
    script.src = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json;responseHandler:${callbackName}&gid=${sheetId}`;
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    cachedRequest = undefined;
    throw error;
  });

  cachedRequest = request;
  return request;
}

export function useGoogleSheetDatasets(fallback: DatasetEntry[]) {
  const [entries, setEntries] = useState(fallback);
  const [status, setStatus] = useState<"loading" | "live" | "fallback">("loading");

  useEffect(() => {
    let active = true;
    loadSheet()
      .then((liveEntries) => {
        if (!active) return;
        if (liveEntries.length > 0) setEntries(liveEntries);
        setStatus(liveEntries.length > 0 ? "live" : "fallback");
      })
      .catch(() => {
        if (active) setStatus("fallback");
      });
    return () => {
      active = false;
    };
  }, []);

  return { entries, status };
}