import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { cn } from "@/lib/utils";

const IDS = CATEGORIES.map((c) => c.id) as string[];

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): { category?: Category } =>
    typeof s["category"] === "string" && IDS.includes(s["category"])
      ? { category: s["category"] as Category }
      : {},
  head: () => ({
    meta: [
      { title: "Shop All — Aura & Adorn" },
      { name: "description", content: "Browse our full collection of gold jewellery, press-on nails and bracelets." },
      { property: "og:title", content: "Shop All — Aura & Adorn" },
      { property: "og:description", content: "Browse gold jewellery, press-on nails and bracelets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { category } = Route.useSearch();
  const list = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;
  const current = CATEGORIES.find((c) => c.id === category);

  return (
    <>
      <section className="bg-onyx py-20 text-center text-ivory">
        <p className="eyebrow text-gold animate-fade-up">The Collection</p>
        <h1 className="mt-4 text-6xl animate-fade-up [animation-delay:120ms] md:text-7xl">
          {current ? current.label : "Shop all"}
        </h1>
        <p className="mt-4 text-ivory/60 animate-fade-up [animation-delay:240ms]">
          {current ? current.tagline : "Jewellery, nails and bracelets in one place"}
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/products"
            search={{}}
            className={cn(
              "eyebrow border px-6 py-3 text-[0.6rem] transition-all duration-500",
              !category ? "border-onyx bg-onyx text-ivory" : "border-border hover:border-gold",
            )}
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/products"
              search={{ category: c.id }}
              className={cn(
                "eyebrow border px-6 py-3 text-[0.6rem] transition-all duration-500",
                category === c.id ? "border-onyx bg-onyx text-ivory" : "border-border hover:border-gold",
              )}
            >
              {c.label}
            </Link>
          ))}
        </div>

        <div key={category ?? "all"} className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 120}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
