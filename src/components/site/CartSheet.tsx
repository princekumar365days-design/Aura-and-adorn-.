import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export function CartSheet() {
  const { open, setOpen, lines, total, setQty, remove } = useCart();
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
            </ul>
            <div className="space-y-4 border-t border-border p-4">
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
                Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
