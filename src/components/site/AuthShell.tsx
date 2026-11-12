import type { ReactNode } from "react";
import authImg from "@/assets/cat-bracelets.jpg";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <section className="grid min-h-[calc(100vh-7.25rem)] md:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-onyx md:block">
        <img src={authImg} alt="Gold charm bracelets" className="absolute inset-0 h-full w-full object-cover opacity-80 animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/20 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-ivory animate-fade-up">
          <p className="eyebrow text-gold">Members get 10% off</p>
          <p className="mt-3 font-display text-4xl italic">"Elegance is the only beauty that never fades."</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md animate-fade-up">
          <h1 className="text-5xl">{title}</h1>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </section>
  );
}
