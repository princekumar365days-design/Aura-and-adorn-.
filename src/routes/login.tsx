import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell, SocialButtons } from "@/components/site/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Aura & Adorn" },
      { name: "description", content: "Log in to your Aura & Adorn account." },
      { property: "og:title", content: "Login — Aura & Adorn" },
      { property: "og:description", content: "Log in to your Aura & Adorn account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [forgot, setForgot] = useState(false);

  const done = () => {
    toast.success("Welcome back!");
    navigate({ to: "/" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (forgot) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setBusy(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Check your email for a reset link.");
      setForgot(false);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    done();
  };

  return (
    <AuthShell
      title={forgot ? "Reset password" : "Welcome back"}
      subtitle={forgot ? "We'll email you a link to set a new password." : "Log in to your account to continue."}
    >
      {!forgot && <SocialButtons onDone={done} />}
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="eyebrow text-[0.6rem]">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-none" />
        </div>
        {!forgot && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="eyebrow text-[0.6rem]">Password</Label>
              <button type="button" onClick={() => setForgot(true)} className="text-xs text-gold-deep hover:underline">
                Forgot password?
              </button>
            </div>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-none" />
          </div>
        )}
        <Button variant="luxe" size="xl" type="submit" disabled={busy} className="w-full">
          {busy ? "Please wait…" : forgot ? "Send reset link" : "Log in"}
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        {forgot ? (
          <button onClick={() => setForgot(false)} className="text-gold-deep hover:underline">Back to login</button>
        ) : (
          <>New here? <Link to="/signup" className="text-gold-deep hover:underline">Create an account</Link></>
        )}
      </p>
    </AuthShell>
  );
}
