import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { FREE_DELIVERY_AT, PRODUCTS, formatPrice } from "@/lib/products";
import { Truck, Lock } from "lucide-react";

export function CartSheet() {
  const { open, setOpen, lines, total, setQty, remove, add } = useCart();
  const left = Math.max(0, FREE_DELIVERY_AT - total);
  const pct = Math.min(100, (total / FREE_DELIVERY_AT) * 100);
  const saved = lines.reduce((s, l) => s + (l.product.compareAt - l.product.price) * l.qty, 0);
  const inBag = new Set(lines.map((l) => l.id));
  const upsell = PRODUCTS.filter((p) => !inBag.has(p.id)).sort((a, b) => b.reviews - a.reviews).slice(0, 2);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col bg-background sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl font-normal">Your Bag</SheetTitle>
        </SheetHeader>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingBag className="size-10 animate-float text-gold" />
            <p className="text-muted-foreground">Your bag is empty.</p>
            <Button variant="luxe" size="lg" asChild onClick={() => setOpen(false)}>
              <Link to="/products">Start shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mx-4 border border-gold/40 bg-secondary p-4">
              <p className="flex items-center gap-2 text-sm">
                <Truck className="size-4 text-gold-deep" />
                {left > 0 ? (
                  <span>Add <b>{formatPrice(left)}</b> more for <b>FREE delivery</b></span>
                ) : (
                  <span>🎉 You've unlocked <b>FREE delivery</b>!</span>
                )}
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                <div className="bg-gold-gradient animate-shimmer h-full transition-all duration-700" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <ul className="flex-1 space-y-5 overflow-y-auto px-4">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-4 border-b border-border pb-5 animate-in fade-in slide-in-from-right-4">
                  <img src={l.product.image} alt={l.product.name} className="h-24 w-20 object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="font-display text-lg leading-tight">{l.product.name}</p>
                      <button aria-label="Remove" onClick={() => remove(l.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">{formatPrice(l.product.price)}</p>
                    <div className="mt-auto flex items-center gap-3">
                      <button aria-label="Decrease" onClick={() => setQty(l.id, l.qty - 1)} className="flex size-7 items-center justify-center border border-border hover:border-gold">
                        <Minus className="size-3" />
                      </button>
                      <span className="w-4 text-center text-sm">{l.qty}</span>
                      <button aria-label="Increase" onClick={() => setQty(l.id, l.qty + 1)} className="flex size-7 items-center justify-center border border-border hover:border-gold">
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {upsell.length > 0 && (
                <li className="pt-2">
                  <p className="eyebrow mb-3 text-[0.6rem] text-gold-deep">Complete the look</p>
                  <div className="grid grid-cols-2 gap-3">
                    {upsell.map((p) => (
                      <button key={p.id} onClick={() => add(p.id)} className="group text-left">
                        <div className="relative overflow-hidden">
                          <img src={p.image} alt={p.name} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <span className="absolute bottom-2 right-2 flex size-7 items-center justify-center rounded-full bg-onyx text-gold transition-transform group-hover:scale-110">
                            <Plus className="size-3.5" />
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-tight">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{formatPrice(p.price)}</p>
                      </button>
                    ))}
                  </div>
                </li>
              )}
            </ul>
            <div className="space-y-4 border-t border-border p-4">
              {saved > 0 && (
                <p className="flex justify-between text-sm text-gold-deep">
                  <span>You're saving</span>
                  <b>{formatPrice(saved)}</b>
                </p>
              )}
              <div className="flex justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="font-display text-2xl">{formatPrice(total)}</span>
              </div>
              <Button
                variant="gold"
                size="xl"
                className="w-full"
                onClick={() => toast("Checkout is coming soon", { description: "Online payment isn't set up yet." })}
              >
                <Lock className="size-3.5" /> Secure checkout
              </Button>
              <p className="text-center text-[0.7rem] text-muted-foreground">Cash on delivery · 7-day easy returns</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
