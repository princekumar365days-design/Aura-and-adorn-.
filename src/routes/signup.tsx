import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { MailCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell, SocialButtons } from "@/components/site/AuthShell";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — Aura & Adorn" },
      { name: "description", content: "Create your Aura & Adorn account for exclusive drops." },
      { property: "og:title", content: "Sign Up — Aura & Adorn" },
      { property: "og:description", content: "Create your Aura & Adorn account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    if (password !== confirm) { toast.error("Passwords do not match."); return; }
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin, data: { full_name: name } },
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    if (data.session) {
      toast.success("Account created!");
      navigate({ to: "/" });
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <AuthShell title="Check your email" subtitle={`We sent a confirmation link to ${email}.`}>
        <div className="flex flex-col items-center gap-6 text-center">
          <MailCheck className="size-14 text-gold animate-float" />
          <p className="text-muted-foreground">Click the link in the email to activate your account, then log in.</p>
          <Button variant="luxe" size="xl" asChild><Link to="/login">Go to login</Link></Button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Create account" subtitle="Join Aura & Adorn for exclusive drops and offers.">
      <SocialButtons onDone={() => { toast.success("Welcome!"); navigate({ to: "/" }); }} />
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="eyebrow text-[0.6rem]">Full name</Label>
          <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-none" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="eyebrow text-[0.6rem]">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-none" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password" className="eyebrow text-[0.6rem]">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-none" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm" className="eyebrow text-[0.6rem]">Confirm</Label>
            <Input id="confirm" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className="h-12 rounded-none" />
          </div>
        </div>
        <Button variant="gold" size="xl" type="submit" disabled={busy} className="w-full">
          {busy ? "Creating…" : "Sign up"}
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account? <Link to="/login" className="text-gold-deep hover:underline">Log in</Link>
      </p>
    </AuthShell>
  );
}
