import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Rating } from '../ui/Rating';
import { formatMoney } from '../../utils/money';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import type { Product } from '../../types/domain';

export function ProductCard({ product, onQuickView }: { product: Product; onQuickView?: (product: Product) => void }) {
  const add = useCartStore((state) => state.add);
  const { toggle, has } = useWishlistStore();
  const wished = has(product.id);
  return <Card className="group overflow-hidden p-3 transition hover:-translate-y-1 hover:shadow-glow"><div className="relative overflow-hidden rounded-[1.5rem] bg-slate-100 dark:bg-slate-800"><Link to={`/products/${product.slug}`}><img src={product.image} alt={product.name} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"/></Link><div className="absolute left-3 top-3 flex gap-2">{product.isNew && <Badge>New</Badge>}{product.isTrending && <Badge className="bg-amber-100 text-amber-700">Trending</Badge>}</div><button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-700 shadow dark:bg-slate-950/80 dark:text-white" onClick={() => toggle(product.id)} aria-label="Toggle wishlist"><Heart className={wished ? 'h-5 w-5 fill-rose-500 text-rose-500' : 'h-5 w-5'}/></button></div><div className="p-3 sm:p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-slate-500">{product.brand}</p><Link to={`/products/${product.slug}`} className="mt-1 block text-base font-bold sm:text-lg text-ink hover:text-brand-600 dark:text-white">{product.name}</Link></div><Rating value={product.rating}/></div><p className="mt-3 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{product.description}</p><div className="mt-5 flex items-center justify-between"><div><strong className="text-lg text-ink sm:text-xl dark:text-white">{formatMoney(product.price)}</strong>{product.compareAtPrice && <span className="ml-2 text-sm text-slate-400 line-through">{formatMoney(product.compareAtPrice)}</span>}</div></div><div className="mt-5 grid grid-cols-1 gap-2 min-[380px]:grid-cols-2 sm:grid-cols-2"><Button onClick={() => add(product.id)}><ShoppingBag className="h-4 w-4"/> Add</Button><Button variant="secondary" onClick={() => onQuickView?.(product)}><Eye className="h-4 w-4"/> Quick</Button></div></div></Card>;
}
