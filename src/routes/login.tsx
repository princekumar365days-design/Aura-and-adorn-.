import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { logIn } from "@/lib/local-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/site/AuthShell";

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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const err = await logIn(email, password);
    setBusy(false);
    if (err) {
      toast.error(err);
      return;
    }
    toast.success("Welcome back!");
    navigate({ to: "/" });
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to your account to continue.">
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="eyebrow text-[0.6rem]">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-none" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="eyebrow text-[0.6rem]">Password</Label>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-none" />
        </div>
        <Button variant="luxe" size="xl" type="submit" disabled={busy} className="w-full">
          {busy ? "Please wait…" : "Log in"}
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        New here? <Link to="/signup" className="text-gold-deep hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}
