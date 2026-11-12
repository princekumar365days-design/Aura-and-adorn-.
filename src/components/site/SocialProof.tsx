import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/utils";

const PEOPLE = [
  ["Ayesha", "Lahore"], ["Fatima", "Karachi"], ["Hira", "Islamabad"], ["Zara", "Multan"],
  ["Mahnoor", "Faisalabad"], ["Sana", "Peshawar"], ["Iqra", "Rawalpindi"], ["Areeba", "Hyderabad"],
];

/** Small "someone just bought" popup that appears every so often. */
export function SocialProof() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const [off, setOff] = useState(false);

  useEffect(() => {
    if (off) return;
    let hide: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setI((n) => n + 1);
      setShow(true);
      hide = setTimeout(() => setShow(false), 5500);
    };
    const first = setTimeout(cycle, 9000);
    const every = setInterval(cycle, 22000);
    return () => {
      clearTimeout(first);
      clearInterval(every);
      clearTimeout(hide);
    };
  }, [off]);

  const product = PRODUCTS[(i * 4) % PRODUCTS.length]!;
  const [name, city] = PEOPLE[i % PEOPLE.length]!;
  const mins = ((i * 7) % 14) + 1;

  return (
    <div
      className={cn(
        "fixed bottom-5 left-5 z-40 flex w-[300px] items-center gap-3 border border-gold/40 bg-onyx p-3 pr-8 text-ivory shadow-card transition-all duration-700",
        show && !off ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0",
      )}
      role="status"
    >
      <img src={product.image} alt="" className="size-14 object-cover" />
      <div className="text-xs leading-snug">
        <p><b>{name}</b> from {city} just bought</p>
        <p className="font-display text-base text-gold">{product.name}</p>
        <p className="text-ivory/50">{mins} min ago · ✓ Verified</p>
      </div>
      <button aria-label="Close" onClick={() => setOff(true)} className="absolute right-2 top-2 text-ivory/50 hover:text-gold">
        <X className="size-3.5" />
      </button>
    </div>
  );
}
