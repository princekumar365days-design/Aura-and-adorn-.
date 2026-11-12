import { useEffect, useState } from "react";

function untilMidnight() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  const s = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
}

/** Rotating offer ticker with a live "sale ends tonight" countdown. */
export function SaleBar() {
  const [left, setLeft] = useState<string | null>(null);
  useEffect(() => {
    setLeft(untilMidnight());
    const t = setInterval(() => setLeft(untilMidnight()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-gold-gradient animate-shimmer h-8 overflow-hidden text-onyx">
      <div className="animate-ticker">
        <p className="eyebrow flex h-8 items-center justify-center gap-2 text-[0.6rem] font-medium">
          Festive sale · up to 30% off · ends in
          <span className="min-w-[4.5rem] rounded-sm bg-onyx px-2 py-0.5 tabular-nums text-gold">{left ?? "--:--:--"}</span>
        </p>
        <p className="eyebrow flex h-8 items-center justify-center text-[0.6rem] font-medium">
          Free delivery on orders above Rs. 5,000
        </p>
        <p className="eyebrow flex h-8 items-center justify-center text-[0.6rem] font-medium">
          New here? Use code&nbsp;<b>AURA10</b>&nbsp;for 10% off
        </p>
      </div>
    </div>
  );
}
