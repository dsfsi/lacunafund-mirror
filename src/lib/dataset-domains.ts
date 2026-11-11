import { spreadsheetDatasetDomains } from "@/data/funded-dataset-domains.generated";
import type { DatasetCategory } from "@/components/DatasetList";

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "");
const words = (value: string) => new Set(value.toLowerCase().match(/[a-z0-9]{3,}/g) ?? []);

export function spreadsheetDomainForTitle(title: string): DatasetCategory | undefined {
  const normalizedTitle = normalize(title);
  const exact = spreadsheetDatasetDomains.find(
    (entry) => normalize(entry.title) === normalizedTitle,
  );
  if (exact) return exact.category as DatasetCategory;

  const titleWords = words(title);
  let match: (typeof spreadsheetDatasetDomains)[number] | undefined;
  let highestScore = 0;

  for (const entry of spreadsheetDatasetDomains) {
    const entryTitle = normalize(entry.title);
    if (normalizedTitle.includes(entryTitle) || entryTitle.includes(normalizedTitle)) {
      return entry.category as DatasetCategory;
    }
    const entryWords = words(entry.title);
    const overlap = [...titleWords].filter((word) => entryWords.has(word)).length;
    const score = overlap / Math.max(titleWords.size, entryWords.size);
    if (score > highestScore) {
      highestScore = score;
      match = entry;
    }
  }

  return highestScore >= 0.6 ? (match?.category as DatasetCategory) : undefined;
}
