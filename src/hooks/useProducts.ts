import { useQuery } from '@tanstack/react-query';
import { getProducts, getProductBySlug, getProductReviews } from '../services/productService';
import type { ProductFilters } from '../types/domain';
export const useProducts = (filters: ProductFilters) => useQuery({ queryKey: ['products', filters], queryFn: () => getProducts(filters), placeholderData: (previous) => previous });
export const useProduct = (slug: string) => useQuery({ queryKey: ['product', slug], queryFn: () => getProductBySlug(slug) });
export const useProductReviews = (productId?: string) => useQuery({ queryKey: ['reviews', productId], queryFn: () => getProductReviews(productId ?? ''), enabled: Boolean(productId) });
