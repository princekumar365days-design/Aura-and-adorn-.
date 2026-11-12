import { describe, expect, it } from "vitest";
import { cartTotals } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

describe("cart totals", () => {
  it("adds price × quantity across lines", () => {
    // Teardrop Pendant Set Rs. 4,500 ×2 + Noir Gold Tips Rs. 1,800 ×1
    expect(cartTotals([{ id: "teardrop-pendant", qty: 2 }, { id: "noir-gold-tips", qty: 1 }])).toEqual({ count: 3, total: 10800 });
  });
  it("ignores unknown products", () => {
    expect(cartTotals([{ id: "missing", qty: 4 }])).toEqual({ count: 0, total: 0 });
  });
  it("formats prices in rupees", () => {
    expect(formatPrice(6500)).toBe("Rs. 6,500");
  });
});
