import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { discountPct, formatPrice, type Product } from "@/lib/products";
import { Stars } from "./Stars";

export function ProductCard({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const low = product.stock <= 4;
  return (
    <article className="group">
      <div className="shine relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={960}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-2">
          <span className="eyebrow bg-gold-gradient px-3 py-1.5 text-[0.55rem] font-medium text-onyx">
            -{discountPct(product)}%
          </span>
          {product.badge && (
            <span className="eyebrow bg-onyx px-3 py-1.5 text-[0.55rem] text-gold">{product.badge}</span>
          )}
        </div>
        <button
          onClick={() => {
            add(product.id);
            toast.success(`${product.name} added to bag`, {
              action: { label: "View bag", onClick: () => setOpen(true) },
            });
          }}
          className="eyebrow absolute inset-x-3 bottom-3 z-10 flex items-center justify-center gap-2 bg-onyx py-3.5 text-[0.6rem] text-ivory transition-all duration-500 hover:bg-gold hover:text-onyx md:translate-y-[130%] md:group-hover:translate-y-0"
        >
          <Plus className="size-3.5" /> Add to bag
        </button>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="eyebrow text-[0.55rem] text-gold-deep">{product.category}</p>
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>
        <h3 className="mt-1 text-xl">{product.name}</h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-medium">{formatPrice(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>
        </div>
        {low && (
          <p className="mt-2 flex items-center gap-2 text-xs text-destructive">
            <span className="size-1.5 rounded-full bg-destructive animate-pulse" /> Only {product.stock} left — selling fast
          </p>
        )}
      </div>
    </article>
  );
}
