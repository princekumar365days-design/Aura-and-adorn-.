import { createFileRoute, Link } from "@tanstack/react-router";
import bracelets from "@/assets/cat-bracelets.jpg";
import nails from "@/assets/p-nails-pearl.jpg";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Aura & Adorn" },
      { name: "description", content: "The story behind Aura & Adorn: jewellery, nails and bracelets made to shine." },
      { property: "og:title", content: "Our Story — Aura & Adorn" },
      { property: "og:description", content: "The story behind Aura & Adorn." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:px-8">
        <Reveal>
          <p className="eyebrow text-gold-deep">Our story</p>
          <h1 className="mt-4 text-6xl leading-[1] md:text-7xl">
            Every piece holds a little <em className="text-gold-gradient animate-shimmer">light</em>.
          </h1>
          <p className="mt-8 leading-relaxed text-muted-foreground">
            Aura &amp; Adorn began with a simple belief: the details you wear say the most about
            you. From delicate gold pendants to hand-finished press-on nails and stackable
            bracelets, every piece is chosen to make you feel confident, every single day.
          </p>
          <Button variant="luxe" size="xl" asChild className="mt-10">
            <Link to="/products">Explore the collection</Link>
          </Button>
        </Reveal>
        <div className="relative">
          <Reveal className="w-4/5">
            <img src={bracelets} alt="Gold charm bracelets" loading="lazy" width={896} height={1152} className="w-full shadow-card" />
          </Reveal>
          <Reveal delay={250} className="absolute -bottom-10 right-0 w-1/2 border-8 border-background animate-float">
            <img src={nails} alt="Pearl press-on nails" loading="lazy" width={768} height={960} className="w-full" />
          </Reveal>
        </div>
      </section>
      <section className="bg-onyx py-20 text-ivory">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 text-center md:grid-cols-3">
          {[
            ["Thoughtfully chosen", "Every design is picked for quality and lasting shine."],
            ["Gift ready", "Packed in our signature black and gold box."],
            ["Made for you", "Pieces for everyday, weddings and every celebration."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 120}>
              <h3 className="text-3xl text-gold">{t}</h3>
              <p className="mt-3 text-sm text-ivory/60">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
