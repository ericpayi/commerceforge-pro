import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT_RATE, TAX_RATE } from '../constants/site';
import { products } from '../data/products';
import type { CartLine } from '../types/domain';

interface CartState {
  lines: CartLine[]; discountCode?: string;
  add: (productId: string, quantity?: number) => void; remove: (productId: string) => void; update: (productId: string, quantity: number) => void;
  clear: () => void; applyDiscount: (code: string) => void;
}
export const useCartStore = create<CartState>()(persist((set) => ({
  lines: [],
  add: (productId, quantity = 1) => set((state) => {
    const existing = state.lines.find((line) => line.productId === productId);
    return { lines: existing ? state.lines.map((line) => line.productId === productId ? { ...line, quantity: Math.min(line.quantity + quantity, 9) } : line) : [...state.lines, { productId, quantity }] };
  }),
  remove: (productId) => set((state) => ({ lines: state.lines.filter((line) => line.productId !== productId) })),
  update: (productId, quantity) => set((state) => ({ lines: quantity <= 0 ? state.lines.filter((line) => line.productId !== productId) : state.lines.map((line) => line.productId === productId ? { ...line, quantity } : line) })),
  clear: () => set({ lines: [], discountCode: undefined }),
  applyDiscount: (code) => set({ discountCode: code.trim().toUpperCase() }),
}), { name: 'commerceforge-cart' }));

export function useCartSummary() {
  const { lines, discountCode } = useCartStore();
  const detailed = lines.map((line) => ({ ...line, product: products.find((product) => product.id === line.productId) })).filter((line) => Boolean(line.product));
  const subtotal = detailed.reduce((sum, line) => sum + (line.product?.price ?? 0) * line.quantity, 0);
  const discount = discountCode === 'PORTFOLIO10' ? subtotal * 0.1 : 0;
  const shipping = subtotal - discount >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT_RATE;
  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + tax + shipping;
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  return { lines: detailed, subtotal, discount, shipping, tax, total, count };
}
