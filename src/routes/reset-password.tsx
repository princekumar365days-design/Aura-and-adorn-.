import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "@/components/site/AuthShell";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set New Password — Aura & Adorn" },
      { name: "description", content: "Choose a new password for your Aura & Adorn account." },
      { property: "og:title", content: "Set New Password — Aura & Adorn" },
      { property: "og:description", content: "Choose a new password for your account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated!");
    navigate({ to: "/" });
  };

  return (
    <AuthShell title="New password" subtitle="Choose a new password for your account.">
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password" className="eyebrow text-[0.6rem]">New password</Label>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-none" />
        </div>
        <Button variant="luxe" size="xl" type="submit" disabled={busy} className="w-full">
          {busy ? "Saving…" : "Update password"}
        </Button>
      </form>
    </AuthShell>
  );
}
