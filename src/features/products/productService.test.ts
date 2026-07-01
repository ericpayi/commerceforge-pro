import { describe, expect, it } from 'vitest';
import { getProducts } from '../../services/productService';
import type { ProductFilters } from '../../types/domain';

const filters: ProductFilters = { query: 'watch', categories: [], brands: [], minPrice: 0, maxPrice: 20000, rating: 0, sort: 'featured', page: 1 };

describe('product service', () => {
  it('filters products by search query', async () => {
    const result = await getProducts(filters);
    expect(result.items.some((item) => item.name.toLowerCase().includes('watch'))).toBe(true);
  });
});
