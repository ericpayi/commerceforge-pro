import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { ProductGrid } from '../components/common/ProductGrid';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Rating } from '../components/ui/Rating';
import { EmptyState } from '../components/ui/EmptyState';
import { useProducts } from '../hooks/useProducts';
import { useDebouncedValue } from '../utils/debounce';
import { formatMoney } from '../utils/money';
import { getFacets } from '../services/productService';
import type { Category, Product, ProductFilters } from '../types/domain';
import { PAGE_SIZE } from '../constants/site';
import { useCartStore } from '../store/cartStore';

export function ProductsPage() {
  const [params] = useSearchParams();
  const facets = useMemo(() => getFacets(), []);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 250);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(params.get('category') ? [params.get('category') as Category] : []);
  const [brands, setBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(facets.maxPrice);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState<ProductFilters['sort']>('featured');
  const [page, setPage] = useState(1);
  const [quick, setQuick] = useState<Product | null>(null);
  const filters: ProductFilters = { query: debouncedQuery, categories: selectedCategories, brands, minPrice: 0, maxPrice, rating, sort, page };
  const { data, isLoading } = useProducts(filters);
  const toggle = <T,>(items: T[], item: T) => items.includes(item) ? items.filter((entry) => entry !== item) : [...items, item];
  const add = useCartStore((state) => state.add);
  return <section className="section"><div className="container-page"><div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><p className="font-bold text-brand-600">Catalog</p><h1 className="text-4xl font-black text-ink dark:text-white">Discover premium products</h1><p className="mt-2 text-slate-500">Search, filter, sort, paginate, quick-view, and add to cart.</p></div><div className="flex gap-3"><Input label="" aria-label="Search products" placeholder="Search products..." value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }}/><select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value as ProductFilters['sort'])} className="rounded-2xl border border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-900"><option value="featured">Featured</option><option value="price-asc">Price low to high</option><option value="price-desc">Price high to low</option><option value="rating">Top rated</option><option value="newest">Newest</option></select></div></div><div className="grid gap-8 lg:grid-cols-[280px_1fr]"><aside className="h-max rounded-[2rem] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><h2 className="flex items-center gap-2 font-black text-ink dark:text-white"><SlidersHorizontal className="h-5 w-5"/> Filters</h2><div className="mt-6 space-y-6"><fieldset><legend className="font-bold">Categories</legend><div className="mt-3 grid gap-2">{facets.categories.map((category) => <label key={category} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => { setSelectedCategories(toggle(selectedCategories, category)); setPage(1); }}/>{category}</label>)}</div></fieldset><fieldset><legend className="font-bold">Brands</legend><div className="mt-3 grid gap-2">{facets.brands.map((brand) => <label key={brand} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={brands.includes(brand)} onChange={() => setBrands(toggle(brands, brand))}/>{brand}</label>)}</div></fieldset><label className="grid gap-2 text-sm font-bold">Max price: {formatMoney(maxPrice)}<input type="range" min="500" max={facets.maxPrice} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}/></label><label className="grid gap-2 text-sm font-bold">Minimum rating<select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950"><option value="0">Any</option><option value="4.5">4.5+</option><option value="4.8">4.8+</option></select></label></div></aside><div>{data?.items.length === 0 ? <EmptyState title="No matching products" description="Try removing filters or searching for a broader term."/> : <ProductGrid products={data?.items ?? []} loading={isLoading} onQuickView={setQuick}/>}<div className="mt-10 flex items-center justify-between"><p className="text-sm text-slate-500">Showing {data?.items.length ?? 0} of {data?.total ?? 0} products · {PAGE_SIZE} per page</p>{data?.hasMore && <Button onClick={() => setPage((current) => current + 1)}>Load more / Infinite scroll</Button>}</div></div></div></div><Modal open={Boolean(quick)} title={quick?.name ?? 'Quick view'} onClose={() => setQuick(null)}>{quick && <div className="grid gap-6 md:grid-cols-2"><img src={quick.image} alt={quick.name} className="rounded-[1.5rem] object-cover"/><div><Rating value={quick.rating} count={quick.reviews}/><p className="mt-4 text-slate-600 dark:text-slate-300">{quick.description}</p><p className="mt-6 text-3xl font-black text-ink dark:text-white">{formatMoney(quick.price)}</p><Button className="mt-6" onClick={() => add(quick.id)}>Add to cart</Button></div></div>}</Modal></section>;
}
