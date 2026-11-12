import { Star } from "lucide-react";

export function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} className={`size-3 ${n <= Math.round(rating) ? "fill-gold text-gold" : "text-border"}`} />
        ))}
      </div>
      {reviews !== undefined && <span className="text-[0.7rem] text-muted-foreground">({reviews})</span>}
    </div>
  );
}
