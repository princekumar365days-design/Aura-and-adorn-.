import pendant from "@/assets/cat-jewellery.jpg";
import earrings from "@/assets/p-earrings.jpg";
import ring from "@/assets/p-ring.jpg";
import nailsNoir from "@/assets/cat-nails.jpg";
import nailsNude from "@/assets/p-nails-nude.jpg";
import nailsPearl from "@/assets/p-nails-pearl.jpg";
import charms from "@/assets/cat-bracelets.jpg";
import tennis from "@/assets/p-tennis.jpg";
import onyx from "@/assets/p-onyx.jpg";

export type Category = "jewellery" | "nails" | "bracelets";

export const CATEGORIES: { id: Category; label: string; tagline: string; image: string }[] = [
  { id: "jewellery", label: "Jewellery", tagline: "Necklaces, earrings & rings", image: pendant },
  { id: "nails", label: "Nails", tagline: "Luxury press-on sets", image: nailsNoir },
  { id: "bracelets", label: "Bracelets", tagline: "Bangles, charms & tennis", image: charms },
];

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  compareAt: number;
  stock: number;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
};

export const PRODUCTS: Product[] = [
  { id: "teardrop-pendant", name: "Teardrop Pendant Set", category: "jewellery", price: 4500, compareAt: 6000, stock: 4, rating: 4.9, reviews: 212, image: pendant, badge: "Bestseller", description: "Gold-tone teardrop pendant with matching crystal studs." },
  { id: "pave-hoops", name: "Pavé Huggie Hoops", category: "jewellery", price: 2800, compareAt: 3500, stock: 9, rating: 4.8, reviews: 134, image: earrings, description: "Everyday hoops lined with tiny sparkling stones." },
  { id: "onyx-signet", name: "Onyx Signet Ring", category: "jewellery", price: 3200, compareAt: 4200, stock: 6, rating: 4.7, reviews: 58, image: ring, badge: "New", description: "Polished gold signet with a deep black onyx face." },
  { id: "noir-gold-tips", name: "Noir Gold Tips", category: "nails", price: 1800, compareAt: 2500, stock: 3, rating: 4.9, reviews: 341, image: nailsNoir, badge: "Bestseller", description: "Glossy black press-ons with mirror-gold French tips." },
  { id: "blush-glitter", name: "Blush Gold Glitter", category: "nails", price: 1600, compareAt: 2200, stock: 7, rating: 4.8, reviews: 187, image: nailsNude, description: "Soft nude almond nails dusted with gold glitter." },
  { id: "pearl-stardust", name: "Pearl Stardust", category: "nails", price: 1700, compareAt: 2400, stock: 5, rating: 4.9, reviews: 96, image: nailsPearl, badge: "New", description: "Pearly chrome nails with hand-painted gold stars." },
  { id: "charm-stack", name: "Pearl Charm Stack", category: "bracelets", price: 5200, compareAt: 7000, stock: 4, rating: 4.8, reviews: 121, image: charms, description: "A layered set of gold bangles with pearls and charms." },
  { id: "tennis-bracelet", name: "Classic Tennis Bracelet", category: "bracelets", price: 6500, compareAt: 9000, stock: 2, rating: 5.0, reviews: 268, image: tennis, badge: "Bestseller", description: "A continuous line of brilliant stones set in gold." },
  { id: "onyx-lotus", name: "Onyx Lotus Bracelet", category: "bracelets", price: 2400, compareAt: 3200, stock: 8, rating: 4.7, reviews: 77, image: onyx, description: "Black onyx beads, gold spacers and a lotus charm." },
];

export const formatPrice = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;

export const discountPct = (p: Product) => Math.round((1 - p.price / p.compareAt) * 100);

/** Orders at or above this subtotal ship free. */
export const FREE_DELIVERY_AT = 5000;
