import { ProductCard } from './ProductCard';
import { Skeleton } from '../ui/Skeleton';
import type { Product } from '../../types/domain';
export function ProductGrid({ products, loading, onQuickView }: { products: Product[]; loading?: boolean; onQuickView?: (product: Product) => void }) {
  if (loading) return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">{Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-96" />)}</div>;
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} onQuickView={onQuickView}/>)}</div>;
}
