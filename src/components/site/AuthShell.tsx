import type { ReactNode } from "react";
import { toast } from "sonner";
import "@lovable.dev/cloud-auth-js/styles.css";
import authImg from "@/assets/cat-jewellery.jpg";
import { lovable } from "@/integrations/lovable/index";

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <section className="grid min-h-[calc(100vh-7.5rem)] md:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-onyx md:block">
        <img src={authImg} alt="Gold pendant necklace" className="absolute inset-0 h-full w-full object-cover opacity-80 animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/20 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-ivory animate-fade-up">
          <p className="eyebrow text-gold">Aura &amp; Adorn</p>
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

const GoogleG = () => (
  <svg aria-hidden="true" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.090 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.950-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.570.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
);

export function SocialButtons({ onDone }: { onDone: () => void }) {
  const go = async (provider: "google" | "lovable") => {
    const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
    if (result.error) {
      toast.error("Could not sign in. Please try again.");
      return;
    }
    if (result.redirected) return;
    onDone();
  };
  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => go("google")}
        className="google-btn flex h-12 w-full items-center justify-center gap-[10px] rounded-sm px-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
      >
        <GoogleG /> Continue with Google
      </button>
      <button type="button" className="lovable-auth-button w-full" onClick={() => go("lovable")}>
        Continue with Lovable
      </button>
      <div className="flex items-center gap-4 py-3">
        <span className="h-px flex-1 bg-border" />
        <span className="eyebrow text-[0.55rem] text-muted-foreground">or with email</span>
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
