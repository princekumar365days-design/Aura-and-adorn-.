import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gem, Sparkles, Truck, ShieldCheck, Quote, ShoppingBag, Banknote } from "lucide-react";
import { toast } from "sonner";
import hero from "@/assets/hero-hands.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { Stars } from "@/components/site/Stars";
import { CATEGORIES, PRODUCTS, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura & Adorn — Nails, Bracelets & Jewellery" },
      { name: "description", content: "Luxury press-on nails, gold bracelets and jewellery. Festive sale — up to 30% off." },
      { property: "og:title", content: "Aura & Adorn — Nails, Bracelets & Jewellery" },
      { property: "og:description", content: "Luxury press-on nails, gold bracelets and jewellery. Up to 30% off." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MARQUEE = ["Luxury Press-On Nails", "Gold Bracelets", "Up to 30% Off", "Cash on Delivery", "Gift Ready Packaging", "Made to Shine"];

const REVIEWS = [
  { name: "Ayesha R.", city: "Lahore", text: "The Noir Gold Tips look like a salon manicure. I got so many compliments at my cousin's mehndi!", item: "Noir Gold Tips" },
  { name: "Fatima K.", city: "Karachi", text: "The tennis bracelet sparkles so much and the packaging felt really premium. Perfect gift.", item: "Classic Tennis Bracelet" },
  { name: "Hira S.", city: "Islamabad", text: "Ordered the charm stack and nails together — delivery was quick and everything matched beautifully.", item: "Pearl Charm Stack" },
];

const LOOK = ["noir-gold-tips", "tennis-bracelet"];

function Index() {
  const { add, setOpen } = useCart();
  const featured = PRODUCTS.filter((p) => p.badge);
  const look = PRODUCTS.filter((p) => LOOK.includes(p.id));
  const lookTotal = look.reduce((s, p) => s + p.price, 0);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[600px] overflow-hidden bg-onyx">
        <img
          src={hero}
          alt="Hand with black and gold nails wearing gold bracelets"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover object-right animate-slow-zoom"
        />
        <div className="bg-hero-fade absolute inset-0" />
        {["left-[12%] top-[20%]", "left-[44%] top-[66%]", "left-[34%] top-[30%]", "left-[8%] top-[80%]", "left-[52%] top-[18%]"].map((pos, i) => (
          <Sparkles key={i} className={`absolute ${pos} size-4 text-gold animate-sparkle`} style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 md:px-8">
          <div className="max-w-xl text-ivory">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-gold/50 bg-onyx/60 px-4 py-2 text-[0.6rem] text-gold animate-fade-up">
              <span className="size-1.5 rounded-full bg-gold animate-pulse" /> Festive sale · up to 30% off
            </span>
            <h1 className="mt-6 text-6xl leading-[0.95] animate-fade-up [animation-delay:150ms] md:text-8xl">
              Nails that <em className="text-gold-gradient animate-shimmer">glow</em>,
              <br /> wrists that shine.
            </h1>
            <p className="mt-6 max-w-md text-ivory/70 animate-fade-up [animation-delay:300ms]">
              Salon-perfect press-on nails and gold bracelets — styled together, delivered to your door.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:450ms]">
              <Button variant="gold" size="xl" asChild className="animate-pulse-ring">
                <Link to="/products" search={{ category: "nails" }}>Shop nails</Link>
              </Button>
              <Button variant="outline-gold" size="xl" asChild>
                <Link to="/products" search={{ category: "bracelets" }}>Shop bracelets</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-ivory/70 animate-fade-up [animation-delay:600ms]">
              <span className="flex items-center gap-2"><Stars rating={5} /> 4.9 from 1,400+ reviews</span>
              <span className="flex items-center gap-2"><Banknote className="size-4 text-gold" /> Cash on delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-gold/40 bg-onyx py-4">
        <div className="flex w-max animate-marquee">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="eyebrow flex items-center gap-8 px-8 text-ivory">
              {t} <Gem className="size-3 text-gold" />
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <Reveal className="text-center">
          <p className="eyebrow text-gold-deep">Shop by category</p>
          <h2 className="mt-3 text-5xl md:text-6xl">Find your shine</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 150}>
              <Link to="/products" search={{ category: c.id }} className="shine group relative block aspect-[3/4] overflow-hidden bg-onyx">
                <img src={c.image} alt={c.label} loading="lazy" width={896} height={1152} className="h-full w-full object-cover opacity-90 transition-all duration-[1400ms] group-hover:scale-110 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 via-onyx/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-ivory">
                  <p className="eyebrow text-[0.6rem] text-gold">{c.tagline}</p>
                  <h3 className="mt-2 text-4xl">{c.label}</h3>
                  <span className="eyebrow mt-4 inline-flex items-center gap-2 text-[0.6rem] transition-all duration-500 group-hover:gap-4 group-hover:text-gold">
                    Explore <ArrowRight className="size-3.5" />
                  </span>
                </div>
                <div className="absolute inset-4 border border-gold/0 transition-all duration-700 group-hover:border-gold/60" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Reveal className="flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <p className="eyebrow text-gold-deep">Selling fast</p>
              <h2 className="mt-3 text-5xl md:text-6xl">Bestsellers</h2>
            </div>
            <Button variant="outline-dark" size="lg" asChild>
              <Link to="/products">View all</Link>
            </Button>
          </Reveal>
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 120}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Shop the look */}
      <section className="bg-onyx text-ivory">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-8">
          <Reveal className="relative overflow-hidden">
            <img src={hero} alt="The complete look" loading="lazy" width={1920} height={1088} className="aspect-[4/5] w-full object-cover object-[80%_center] transition-transform duration-[1500ms] hover:scale-105" />
            <span className="absolute left-[46%] top-[78%] size-4 rounded-full bg-gold animate-pulse-ring" />
            <span className="absolute left-[70%] top-[42%] size-4 rounded-full bg-gold animate-pulse-ring [animation-delay:0.9s]" />
          </Reveal>
          <Reveal delay={200}>
            <p className="eyebrow text-gold">Shop the look</p>
            <h2 className="mt-3 text-5xl md:text-6xl">The Noir &amp; Gold set</h2>
            <p className="mt-4 text-ivory/60">Our most-loved pairing: mirror-gold tips with a brilliant tennis bracelet.</p>
            <ul className="mt-8 space-y-4">
              {look.map((p) => (
                <li key={p.id} className="flex items-center gap-4 border-b border-ivory/10 pb-4">
                  <img src={p.image} alt={p.name} loading="lazy" className="size-16 object-cover" />
                  <div className="flex-1">
                    <p className="font-display text-xl">{p.name}</p>
                    <Stars rating={p.rating} />
                  </div>
                  <div className="text-right">
                    <p>{formatPrice(p.price)}</p>
                    <p className="text-xs text-ivory/40 line-through">{formatPrice(p.compareAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button
              variant="gold"
              size="xl"
              className="mt-8 w-full"
              onClick={() => {
                look.forEach((p) => add(p.id));
                toast.success("The Noir & Gold set is in your bag");
                setOpen(true);
              }}
            >
              <ShoppingBag className="size-4" /> Add both · {formatPrice(lookTotal)}
            </Button>
            <p className="mt-3 text-center text-xs text-ivory/50">Free delivery included with this set</p>
          </Reveal>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-8">
        <Reveal className="text-center">
          <p className="eyebrow text-gold-deep">Loved by 10,000+ customers</p>
          <h2 className="mt-3 text-5xl md:text-6xl">What they're saying</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 150}>
              <figure className="group h-full border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-gold">
                <Quote className="size-8 text-gold transition-transform duration-500 group-hover:rotate-12" />
                <Stars rating={5} />
                <blockquote className="mt-4 font-display text-xl leading-snug">"{r.text}"</blockquote>
                <figcaption className="mt-6 text-sm">
                  <b>{r.name}</b> · {r.city}
                  <span className="mt-1 block text-xs text-gold-deep">✓ Bought {r.item}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Promises */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4 md:px-8">
          {[
            { I: Banknote, t: "Cash on delivery", d: "Pay when your order arrives." },
            { I: Truck, t: "Free delivery", d: "On orders above Rs. 5,000." },
            { I: ShieldCheck, t: "7-day returns", d: "Not in love? Send it back." },
            { I: Gem, t: "Premium finish", d: "Tarnish-resistant gold plating." },
          ].map(({ I, t, d }, i) => (
            <Reveal key={t} delay={i * 100} className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold text-gold transition-transform duration-700 hover:rotate-[360deg]">
                <I className="size-5" />
              </div>
              <h3 className="mt-4 text-2xl">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-onyx-gradient relative overflow-hidden py-28 text-center text-ivory">
        <div className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 animate-float" />
        <div className="absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30" />
        <Reveal className="relative px-6">
          <p className="eyebrow text-gold">Join the circle</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-5xl md:text-6xl">
            Sign up &amp; get <em className="text-gold-gradient animate-shimmer">10% off</em> your first order
          </h2>
          <Button variant="gold" size="xl" asChild className="mt-10">
            <Link to="/signup">Claim my 10%</Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
