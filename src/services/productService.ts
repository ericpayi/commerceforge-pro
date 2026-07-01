import { mockDelay } from '../api/client';
import { PAGE_SIZE } from '../constants/site';
import { products, reviews } from '../data/products';
import type { Product, ProductFilters, Review } from '../types/domain';

export interface ProductResult { items: Product[]; total: number; hasMore: boolean; facets: { brands: string[]; categories: string[]; maxPrice: number }; }

const score = (product: Product, query: string) => `${product.name} ${product.brand} ${product.category} ${product.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());

export async function getProducts(filters: ProductFilters): Promise<ProductResult> {
  await mockDelay();
  let filtered = products.filter((product) => {
    const queryMatch = filters.query.length === 0 || score(product, filters.query);
    const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
    const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand);
    const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice;
    const ratingMatch = product.rating >= filters.rating;
    return queryMatch && categoryMatch && brandMatch && priceMatch && ratingMatch;
  });
  filtered = [...filtered].sort((a, b) => {
    if (filters.sort === 'price-asc') return a.price - b.price;
    if (filters.sort === 'price-desc') return b.price - a.price;
    if (filters.sort === 'rating') return b.rating - a.rating;
    if (filters.sort === 'newest') return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
    return Number(Boolean(b.isTrending)) - Number(Boolean(a.isTrending));
  });
  const total = filtered.length;
  const end = filters.page * PAGE_SIZE;
  return { items: filtered.slice(0, end), total, hasMore: end < total, facets: getFacets() };
}

export async function getProductBySlug(slug: string): Promise<Product> {
  await mockDelay();
  const product = products.find((item) => item.slug === slug);
  if (!product) throw new Error('Product not found');
  return product;
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  await mockDelay();
  return reviews.filter((review) => review.productId === productId || reviews.length > 0).slice(0, 4);
}

export function getFacets() {
  return { brands: [...new Set(products.map((product) => product.brand))], categories: [...new Set(products.map((product) => product.category))], maxPrice: Math.max(...products.map((product) => product.price)) };
}

export function getRecommendations(product?: Product): Product[] {
  if (!product) return products.filter((item) => item.isTrending).slice(0, 4);
  return products.filter((item) => item.id !== product.id && (item.category === product.category || item.brand === product.brand)).slice(0, 4);
}
