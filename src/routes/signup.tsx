import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { signUp } from "@/lib/local-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/site/AuthShell";

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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setBusy(true);
    const err = await signUp(name, email, password);
    setBusy(false);
    if (err) {
      toast.error(err);
      return;
    }
    toast.success(`Welcome, ${name.split(" ")[0]}! Use code AURA10 for 10% off.`);
    navigate({ to: "/products" });
  };

  return (
    <AuthShell title="Create account" subtitle="Join Aura & Adorn and get 10% off your first order.">
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
