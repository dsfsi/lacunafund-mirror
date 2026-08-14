import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  /** Replace this component with an <img src={...} /> when a real image is available. */
  src?: string;
  alt?: string;
  label?: string;
  ratio?: "16/9" | "4/3" | "3/2" | "1/1";
  className?: string;
};

const ratioClass: Record<string, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-4/3",
  "3/2": "aspect-3/2",
  "1/1": "aspect-square",
};

export function ImagePlaceholder({
  src,
  alt = "",
  label = "Image Placeholder",
  ratio = "16/9",
  className,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("w-full rounded-xl border object-cover", ratioClass[ratio], className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "card-surface relative flex w-full items-center justify-center overflow-hidden rounded-xl",
        ratioClass[ratio],
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] grid-backdrop"
      />
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:28px_28px] opacity-40"
      />
      <div className="relative flex flex-col items-center gap-2 text-muted-foreground">
        <ImageIcon className="size-6 text-sky/70" aria-hidden />
        <span className="text-[11px] tracking-[0.18em] uppercase">{label}</span>
      </div>
    </div>
  );
}
