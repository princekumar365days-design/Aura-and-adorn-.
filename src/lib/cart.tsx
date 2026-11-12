import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

type Line = { id: string; qty: number };
type CartCtx = {
  lines: (Line & { product: Product })[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "aura-adorn-cart";

export function cartTotals(lines: Line[]) {
  let count = 0;
  let total = 0;
  for (const l of lines) {
    const p = PRODUCTS.find((x) => x.id === l.id);
    if (!p) continue;
    count += l.qty;
    total += p.price * l.qty;
  }
  return { count, total };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setRaw(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(raw));
  }, [raw]);

  const value = useMemo<CartCtx>(() => {
    const lines = raw
      .map((l) => ({ ...l, product: PRODUCTS.find((p) => p.id === l.id)! }))
      .filter((l) => l.product);
    const { count, total } = cartTotals(raw);
    return {
      lines,
      count,
      total,
      open,
      setOpen,
      add: (id) =>
        setRaw((r) =>
          r.some((l) => l.id === id)
            ? r.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
            : [...r, { id, qty: 1 }],
        ),
      setQty: (id, qty) =>
        setRaw((r) =>
          qty <= 0 ? r.filter((l) => l.id !== id) : r.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      remove: (id) => setRaw((r) => r.filter((l) => l.id !== id)),
      clear: () => setRaw([]),
    };
  }, [raw, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
