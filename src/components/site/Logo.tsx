import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <Link to="/" className={cn("group flex flex-col items-center leading-none", className)}>
      <span
        className={cn(
          "font-display text-2xl tracking-[0.18em] uppercase transition-colors md:text-3xl",
          light ? "text-ivory" : "text-onyx",
        )}
      >
        Aura <span className="text-gold-gradient animate-shimmer italic">&amp;</span> Adorn
      </span>
      <span className="eyebrow mt-1 text-[0.55rem] text-gold">Fine Adornments</span>
    </Link>
  );
}
