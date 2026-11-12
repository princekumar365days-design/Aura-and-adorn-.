/**
 * Browser-only accounts (no server). Accounts live in this browser's localStorage,
 * so an account made on one computer does not exist on another.
 */
export type LocalUser = { name: string; email: string };
type Stored = LocalUser & { hash: string };

const USERS = "aa-users";
const SESSION = "aa-session";
const EVENT = "aa-auth-change";

const norm = (e: string) => e.trim().toLowerCase();

function readUsers(): Record<string, Stored> {
  try {
    return JSON.parse(localStorage.getItem(USERS) || "{}");
  } catch {
    return {};
  }
}

async function hash(email: string, password: string) {
  const data = new TextEncoder().encode(`aura-adorn:${norm(email)}:${password}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const notify = () => window.dispatchEvent(new Event(EVENT));

export async function signUp(name: string, email: string, password: string): Promise<string | null> {
  const key = norm(email);
  if (!name.trim()) return "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key)) return "Please enter a valid email.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  const users = readUsers();
  if (users[key]) return "An account with this email already exists.";
  users[key] = { name: name.trim(), email: key, hash: await hash(key, password) };
  localStorage.setItem(USERS, JSON.stringify(users));
  localStorage.setItem(SESSION, key);
  notify();
  return null;
}

export async function logIn(email: string, password: string): Promise<string | null> {
  const key = norm(email);
  const user = readUsers()[key];
  if (!user || user.hash !== (await hash(key, password))) return "Wrong email or password.";
  localStorage.setItem(SESSION, key);
  notify();
  return null;
}

export function logOut() {
  localStorage.removeItem(SESSION);
  notify();
}

export function currentUser(): LocalUser | null {
  const key = localStorage.getItem(SESSION);
  if (!key) return null;
  const u = readUsers()[key];
  return u ? { name: u.name, email: u.email } : null;
}

export function onAuthChange(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
