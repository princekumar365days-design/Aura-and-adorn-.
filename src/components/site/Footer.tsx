import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-onyx text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Logo light className="items-start" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">
            Jewellery, nails and bracelets crafted to make every moment shine. Wear your aura,
            adorn your story.
          </p>
          <div className="mt-6 flex gap-4">
            {[Instagram, Facebook, Mail].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex size-10 items-center justify-center rounded-full border border-ivory/20 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:text-gold"
              >
                <I className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="eyebrow mb-5 text-gold">Shop</h4>
          <ul className="space-y-3 text-sm text-ivory/70">
            <li><Link to="/products" search={{ category: "jewellery" }} className="hover:text-gold">Jewellery</Link></li>
            <li><Link to="/products" search={{ category: "nails" }} className="hover:text-gold">Nails</Link></li>
            <li><Link to="/products" search={{ category: "bracelets" }} className="hover:text-gold">Bracelets</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-5 text-gold">Help</h4>
          <ul className="space-y-3 text-sm text-ivory/70">
            <li><Link to="/about" className="hover:text-gold">About us</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/login" className="hover:text-gold">My account</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-6 text-center">
        <p className="eyebrow text-[0.6rem] text-ivory/40">
          © {new Date().getFullYear()} Aura &amp; Adorn · All rights reserved
        </p>
      </div>
    </footer>
  );
}
