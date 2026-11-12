import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Aura & Adorn" },
      { name: "description", content: "Get in touch with Aura & Adorn for orders, gifting and questions." },
      { property: "og:title", content: "Contact Us — Aura & Adorn" },
      { property: "og:description", content: "Get in touch with Aura & Adorn." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2 md:px-8">
      <Reveal>
        <p className="eyebrow text-gold-deep">Say hello</p>
        <h1 className="mt-4 text-6xl">We'd love to hear from you</h1>
        <ul className="mt-10 space-y-6">
          {[
            { I: Phone, t: "+92 300 0000000" },
            { I: Mail, t: "hello@auraandadorn.com" },
            { I: MapPin, t: "Karachi, Pakistan" },
          ].map(({ I, t }) => (
            <li key={t} className="flex items-center gap-4">
              <span className="flex size-11 items-center justify-center rounded-full border border-gold text-gold">
                <I className="size-4" />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={200}>
        <form
          className="space-y-5 bg-card p-8 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Thank you! We'll get back to you soon.");
            (e.target as HTMLFormElement).reset();
          }}
        >
          <Input required placeholder="Your name" className="h-12 rounded-none" />
          <Input required type="email" placeholder="Email address" className="h-12 rounded-none" />
          <Textarea required placeholder="Your message" rows={5} className="rounded-none" />
          <Button variant="luxe" size="xl" type="submit" className="w-full">
            Send message
          </Button>
        </form>
      </Reveal>
    </section>
  );
}
