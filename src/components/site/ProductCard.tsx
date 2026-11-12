import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
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
        {product.badge && (
          <span className="eyebrow absolute left-3 top-3 z-10 bg-onyx px-3 py-1.5 text-[0.55rem] text-gold">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => {
            add(product.id);
            toast.success(`${product.name} added to bag`, {
              action: { label: "View bag", onClick: () => setOpen(true) },
            });
          }}
          className="eyebrow absolute inset-x-3 bottom-3 z-10 flex translate-y-[130%] items-center justify-center gap-2 bg-onyx py-3.5 text-[0.6rem] text-ivory transition-all duration-500 hover:bg-gold hover:text-onyx group-hover:translate-y-0"
        >
          <Plus className="size-3.5" /> Add to bag
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-[0.55rem] text-gold-deep">{product.category}</p>
          <h3 className="mt-1 text-xl">{product.name}</h3>
        </div>
        <p className="whitespace-nowrap pt-4 text-sm font-medium">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
