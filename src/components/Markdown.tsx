import type { JSX } from "react";

/**
 * Minimal inline markdown renderer for the content stored in src/data.
 * Supports **bold**, [label](url) links and escaped pipes.
 */
export function Markdown({ text, className }: { text: string; className?: string }) {
  return <span className={className}>{renderInline(text)}</span>;
}

export function renderInline(input: string): (string | JSX.Element)[] {
  const text = input.replace(/\\\|/g, "|").replace(/\\\*/g, "*");
  const tokens: (string | JSX.Element)[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) tokens.push(text.slice(last, match.index));
    if (match[1] && match[2]) {
      const href = match[2];
      tokens.push(
        <a
          key={key++}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer noopener"
        >
          {match[1]}
        </a>,
      );
    } else if (match[3]) {
      tokens.push(<strong key={key++}>{match[3]}</strong>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) tokens.push(text.slice(last));
  return tokens;
}
