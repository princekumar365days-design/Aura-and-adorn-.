import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, User, X, LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count, setOpen } = useCart();
  const { user, name, signOut } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [count]);

  const logout = async () => {
    await signOut();
    toast.success("You have been logged out");
    navigate({ to: "/" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/90 py-3 backdrop-blur-md"
          : "bg-background py-5",
      )}
    >
      <div className="bg-onyx py-1.5 text-center text-ivory">
        <p className="eyebrow text-[0.6rem]">
          Free delivery on orders above <span className="text-gold">Rs. 5,000</span>
        </p>
      </div>
      <div className="mx-auto mt-3 grid max-w-7xl grid-cols-3 items-center px-5 md:px-8">
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="gold-line eyebrow text-onyx transition-colors hover:text-gold-deep"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden"
          aria-label="Open menu"
          onClick={() => setMobile(true)}
        >
          <Menu className="size-6" />
        </button>

        <Logo className="justify-self-center" />

        <div className="flex items-center justify-end gap-4">
          {user ? (
            <div className="hidden items-center gap-3 sm:flex">
              <span className="eyebrow text-muted-foreground">Hi, {name}</span>
              <button
                onClick={logout}
                aria-label="Log out"
                className="text-onyx transition-colors hover:text-gold-deep"
              >
                <LogOut className="size-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              aria-label="Login"
              className="flex items-center gap-2 text-onyx transition-colors hover:text-gold-deep"
            >
              <User className="size-5" />
              <span className="eyebrow hidden lg:inline">Login</span>
            </Link>
          )}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open shopping bag"
            className="relative text-onyx transition-colors hover:text-gold-deep"
          >
            <ShoppingBag className={cn("size-5 transition-transform", bump && "scale-125")} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-gold text-[0.6rem] font-medium text-onyx animate-in zoom-in">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-onyx text-ivory transition-all duration-500 md:hidden",
          mobile ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between p-6">
          <Logo light />
          <button aria-label="Close menu" onClick={() => setMobile(false)}>
            <X className="size-7" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          {NAV.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setMobile(false)}
              className={cn(
                "font-display text-4xl transition-all duration-700 hover:text-gold",
                mobile ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: `${i * 80 + 150}ms` }}
            >
              {n.label}
            </Link>
          ))}
          {user ? (
            <button onClick={() => { setMobile(false); logout(); }} className="eyebrow mt-6 text-gold">
              Log out
            </button>
          ) : (
            <Link to="/login" onClick={() => setMobile(false)} className="eyebrow mt-6 text-gold">
              Login / Sign up
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
