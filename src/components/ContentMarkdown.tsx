import { Fragment } from "react";
import { renderInline } from "@/components/Markdown";

/** Renders the small, editor-friendly Markdown subset used by content collections. */
export function ContentMarkdown({ source }: { source: string }) {
  const lines = source.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push(<h2 key={index}>{renderInline(line.slice(3))}</h2>);
      index++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push(<h3 key={index}>{renderInline(line.slice(4))}</h3>);
      index++;
      continue;
    }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      const start = index;
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index++;
      }
      blocks.push(
        <ul key={start}>
          {items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}
        </ul>,
      );
      continue;
    }

    const paragraph: string[] = [];
    const start = index;
    while (index < lines.length && lines[index].trim() && !/^(#{2,3} |- )/.test(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index++;
    }
    blocks.push(<p key={start}>{renderInline(paragraph.join(" "))}</p>);
  }

  return <>{blocks.map((block, index) => <Fragment key={index}>{block}</Fragment>)}</>;
}
