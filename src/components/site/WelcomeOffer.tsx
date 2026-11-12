import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Copy, Gift } from "lucide-react";
import { toast } from "sonner";
import img from "@/assets/p-nails-pearl.jpg";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const KEY = "aa-offer-seen";

/** First-visit popup with a 10% welcome code. Shown once per browser. */
export function WelcomeOffer() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    const t = setTimeout(() => setOpen(true), 7000);
    return () => clearTimeout(t);
  }, []);
  const close = (o: boolean) => {
    setOpen(o);
    if (!o) localStorage.setItem(KEY, "1");
  };
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="grid max-w-2xl gap-0 overflow-hidden rounded-none border-gold/40 bg-onyx p-0 sm:rounded-none text-ivory sm:grid-cols-2">
        <img src={img} alt="Pearl press-on nails" className="hidden h-full w-full object-cover sm:block" />
        <div className="flex flex-col items-center p-10 text-center">
          <Gift className="size-9 text-gold animate-float" />
          <p className="eyebrow mt-4 text-gold">A gift for you</p>
          <DialogTitle className="mt-3 font-display text-5xl font-normal leading-none">
            <span className="text-gold-gradient animate-shimmer">10% off</span>
            <br /> your first order
          </DialogTitle>
          <DialogDescription className="mt-4 text-ivory/60">
            Use this code at checkout. Today only.
          </DialogDescription>
          <button
            onClick={() => {
              navigator.clipboard?.writeText("AURA10");
              toast.success("Code AURA10 copied!");
            }}
            className="mt-6 flex items-center gap-3 border border-dashed border-gold px-6 py-3 font-display text-2xl tracking-[0.3em] text-gold transition-colors hover:bg-gold hover:text-onyx"
          >
            AURA10 <Copy className="size-4" />
          </button>
          <Button variant="gold" size="xl" asChild className="mt-6 w-full" onClick={() => close(false)}>
            <Link to="/products">Shop the sale</Link>
          </Button>
          <button onClick={() => close(false)} className="eyebrow mt-4 text-[0.55rem] text-ivory/40 hover:text-ivory">
            No thanks
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
