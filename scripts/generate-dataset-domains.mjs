import { readFile, writeFile } from "node:fs/promises";
import { inflateRawSync } from "node:zlib";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workbookPath = resolve(root, "src/data/Lacuna Fund Grantees_ByDomain_2020-25.xlsx");
const outputPath = resolve(root, "src/data/funded-dataset-domains.generated.ts");

function zipEntry(buffer, name) {
  const end = buffer.lastIndexOf(Buffer.from("PK\x05\x06"));
  if (end < 0) throw new Error("The workbook is not a valid ZIP archive.");
  let offset = buffer.readUInt32LE(end + 16);

  while (buffer.readUInt32LE(offset) === 0x02014b50) {
    const compression = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localOffset = buffer.readUInt32LE(offset + 42);
    const entryName = buffer.subarray(offset + 46, offset + 46 + nameLength).toString("utf8");

    if (entryName === name) {
      const localNameLength = buffer.readUInt16LE(localOffset + 26);
      const localExtraLength = buffer.readUInt16LE(localOffset + 28);
      const start = localOffset + 30 + localNameLength + localExtraLength;
      const compressed = buffer.subarray(start, start + compressedSize);
      return compression === 0 ? compressed : inflateRawSync(compressed);
    }
    offset += 46 + nameLength + extraLength + commentLength;
  }
  throw new Error(`Workbook entry not found: ${name}`);
}

const decode = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));

function cellValues(workbook) {
  const shared = zipEntry(workbook, "xl/sharedStrings.xml").toString("utf8");
  const strings = [...shared.matchAll(/<si>([\s\S]*?)<\/si>/g)].map((match) =>
    [...match[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((part) => decode(part[1])).join(""),
  );
  const sheet = zipEntry(workbook, "xl/worksheets/sheet1.xml").toString("utf8");

  return [...sheet.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)].map((rowMatch) => {
    const row = {};
    for (const cellMatch of rowMatch[1].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      const column = /r="([A-Z]+)/.exec(cellMatch[1])?.[1];
      const raw = /<v>([\s\S]*?)<\/v>/.exec(cellMatch[2])?.[1] ?? "";
      if (column) row[column] = /t="s"/.test(cellMatch[1]) ? strings[Number(raw)] : decode(raw);
    }
    return row;
  });
}

const categoryForHeading = (heading) => {
  const normalized = heading.trim().toLowerCase();
  if (normalized === "nlp") return "language";
  return normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
};

const workbook = await readFile(workbookPath);
const entries = [];
let category;
let hasHeader = false;

for (const row of cellValues(workbook)) {
  const grant = row.A?.trim() ?? "";
  const title = row.C?.trim() ?? "";
  if (/^RFP Domain & Grant/i.test(grant)) {
    hasHeader = true;
    continue;
  }
  if (!hasHeader) continue;
  if (!title && grant && !/^\d/.test(grant)) {
    category = categoryForHeading(grant);
    continue;
  }
  if (title && category) entries.push({ title, category });
}

const source = `// Generated from src/data/Lacuna Fund Grantees_ByDomain_2020-25.xlsx. Do not edit manually.\n\nexport const spreadsheetDatasetDomains = ${JSON.stringify(entries, null, 2)} as const;\n`;
await writeFile(outputPath, source);
console.log(`Generated ${entries.length} spreadsheet dataset-domain mappings.`);
