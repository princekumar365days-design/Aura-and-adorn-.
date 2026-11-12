import { useEffect, useState } from "react";
import { currentUser, logOut, onAuthChange, type LocalUser } from "@/lib/local-auth";

export function useAuth() {
  const [user, setUser] = useState<LocalUser | null>(null);
  useEffect(() => {
    const sync = () => setUser(currentUser());
    sync();
    return onAuthChange(sync);
  }, []);
  return { user, name: user?.name.split(" ")[0], signOut: async () => logOut() };
}
