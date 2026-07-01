import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface WishlistState { ids: string[]; toggle: (id: string) => void; remove: (id: string) => void; has: (id: string) => boolean; }
export const useWishlistStore = create<WishlistState>()(persist((set, get) => ({
  ids: [],
  toggle: (id) => set((state) => ({ ids: state.ids.includes(id) ? state.ids.filter((item) => item !== id) : [...state.ids, id] })),
  remove: (id) => set((state) => ({ ids: state.ids.filter((item) => item !== id) })),
  has: (id) => get().ids.includes(id),
}), { name: 'commerceforge-wishlist' }));
