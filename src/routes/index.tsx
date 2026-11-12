import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gem, Sparkles, Truck, ShieldCheck } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura & Adorn — Jewellery, Nails & Bracelets" },
      { name: "description", content: "Discover gold jewellery, luxury press-on nails and bracelets. Wear your aura, adorn your story." },
      { property: "og:title", content: "Aura & Adorn — Jewellery, Nails & Bracelets" },
      { property: "og:description", content: "Discover gold jewellery, luxury press-on nails and bracelets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MARQUEE = ["Handpicked Gold", "Luxury Press-On Nails", "Charm Bracelets", "Gift Ready Packaging", "Made to Shine"];

function Index() {
  const featured = PRODUCTS.filter((p) => p.badge);
  return (
    <>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden bg-onyx">
        <img
          src={hero}
          alt="Gold necklace, bangles and rings on black velvet"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
        />
        <div className="bg-hero-fade absolute inset-0" />
        {[
          "left-[12%] top-[20%]",
          "left-[40%] top-[70%]",
          "left-[30%] top-[35%]",
          "left-[8%] top-[78%]",
        ].map((pos, i) => (
          <Sparkles
            key={i}
            className={`absolute ${pos} size-4 text-gold animate-sparkle`}
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 md:px-8">
          <div className="max-w-xl text-ivory">
            <p className="eyebrow text-gold animate-fade-up">The New Collection</p>
            <h1 className="mt-5 text-6xl leading-[0.95] animate-fade-up [animation-delay:150ms] md:text-8xl">
              Wear your <em className="text-gold-gradient animate-shimmer">aura</em>,
              <br /> adorn your story.
            </h1>
            <p className="mt-6 max-w-md text-ivory/70 animate-fade-up [animation-delay:300ms]">
              Gold jewellery, luxury nails and bracelets made for the moments you want to remember.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:450ms]">
              <Button variant="gold" size="xl" asChild>
                <Link to="/products">Shop now</Link>
              </Button>
              <Button variant="outline-gold" size="xl" asChild>
                <Link to="/about">Our story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-gold/40 bg-onyx py-4">
        <div className="flex w-max animate-marquee">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
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
              <Link
                to="/products"
                search={{ category: c.id }}
                className="shine group relative block aspect-[3/4] overflow-hidden bg-onyx"
              >
                <img
                  src={c.image}
                  alt={c.label}
                  loading="lazy"
                  width={896}
                  height={1152}
                  className="h-full w-full object-cover opacity-90 transition-all duration-[1400ms] group-hover:scale-110 group-hover:opacity-70"
                />
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
              <p className="eyebrow text-gold-deep">Most loved</p>
              <h2 className="mt-3 text-5xl md:text-6xl">Featured pieces</h2>
            </div>
            <Button variant="outline-dark" size="lg" asChild>
              <Link to="/products">View all</Link>
            </Button>
          </Reveal>
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 120}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-3 md:px-8">
        {[
          { I: Gem, t: "Premium finish", d: "Tarnish-resistant gold plating that keeps its glow." },
          { I: Truck, t: "Fast delivery", d: "Delivered to your door, beautifully gift-wrapped." },
          { I: ShieldCheck, t: "Easy returns", d: "Not in love? Return within 7 days." },
        ].map(({ I, t, d }, i) => (
          <Reveal key={t} delay={i * 120} className="text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-gold text-gold transition-transform duration-700 hover:rotate-[360deg]">
              <I className="size-6" />
            </div>
            <h3 className="mt-5 text-2xl">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-onyx-gradient relative overflow-hidden py-28 text-center text-ivory">
        <div className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 animate-float" />
        <div className="absolute left-1/2 top-1/2 size-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30" />
        <Reveal className="relative px-6">
          <p className="eyebrow text-gold">Join the circle</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-5xl md:text-6xl">
            Create an account for <em className="text-gold-gradient animate-shimmer">exclusive</em> drops
          </h2>
          <Button variant="gold" size="xl" asChild className="mt-10">
            <Link to="/signup">Sign up</Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
