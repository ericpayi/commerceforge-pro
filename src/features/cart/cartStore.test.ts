import { describe, expect, it, beforeEach } from 'vitest';
import { useCartStore } from '../../store/cartStore';

describe('cart store', () => {
  beforeEach(() => useCartStore.getState().clear());
  it('adds and updates quantities', () => {
    useCartStore.getState().add('p-001');
    useCartStore.getState().add('p-001', 2);
    expect(useCartStore.getState().lines).toEqual([{ productId: 'p-001', quantity: 3 }]);
    useCartStore.getState().update('p-001', 1);
    expect(useCartStore.getState().lines[0]?.quantity).toBe(1);
  });
});
