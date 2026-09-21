import { cn } from "@/lib/utils";
import gandBFoundationLogo from "@/assets/gandbfoundation.png";
import googleOrgLogo from "@/assets/googleorg.png";
import idrcLogo from "@/assets/idrclogo.png";
import bmzLogo from "@/assets/logo-bmz-en.jpg";
import patrickMcGovernLogo from "@/assets/patricklogo.png";
import rockefellerFoundationLogo from "@/assets/rockefellerfoundation.png";
import rwjfLogo from "@/assets/rwjflogo.png";
import wellcomeLogo from "@/assets/wellcomelogo.png";

const logos: Record<string, string> = {
  "The Rockefeller Foundation": rockefellerFoundationLogo,
  "Google.org": googleOrgLogo,
  "International Development Research Centre": idrcLogo,
  "German Federal Ministry for Economic Cooperation and Development (BMZ)": bmzLogo,
  "Wellcome Trust": wellcomeLogo,
  "Gordon and Betty Moore Foundation": gandBFoundationLogo,
  "Patrick J. McGovern Foundation": patrickMcGovernLogo,
  "The Robert Wood Johnson Foundation": rwjfLogo,
};

export function FunderLogo({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={cn(
        "card-surface flex aspect-3/2 w-full items-center justify-center overflow-hidden rounded-xl border p-4",
        className,
      )}
    >
      <img src={logos[name]} alt={`${name} logo`} loading="lazy" className="h-full w-full object-contain" />
    </div>
  );
}
