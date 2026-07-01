import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Rating } from '../components/ui/Rating';
import { Tabs } from '../components/ui/Tabs';
import { ProductGrid } from '../components/common/ProductGrid';
import { Skeleton } from '../components/ui/Skeleton';
import { useProduct, useProductReviews } from '../hooks/useProducts';
import { getRecommendations } from '../services/productService';
import { formatMoney } from '../utils/money';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';

export function ProductDetailsPage() {
  const { slug = '' } = useParams();
  const { data: product, isLoading } = useProduct(slug);
  const { data: reviews = [] } = useProductReviews(product?.id);
  const [image, setImage] = useState<string | null>(null);
  const [tab, setTab] = useState('description');
  const add = useCartStore((state) => state.add); const wishlist = useWishlistStore();
  if (isLoading) return <section className="section"><div className="container-page"><Skeleton className="h-[600px]"/></div></section>;
  if (!product) return <section className="section"><div className="container-page">Product not found.</div></section>;
  const currentImage = image ?? product.image;
  return <section className="section"><div className="container-page"><div className="mb-6 text-sm text-slate-500"><Link to="/">Home</Link> / <Link to="/products">Products</Link> / {product.name}</div><div className="grid gap-10 lg:grid-cols-2"><div><div className="group overflow-hidden rounded-[2rem] bg-white p-3 shadow-soft dark:bg-slate-900"><img src={currentImage} alt={product.name} className="h-[560px] w-full rounded-[1.5rem] object-cover transition group-hover:scale-[1.03]"/></div><div className="mt-4 flex gap-3 overflow-auto">{product.gallery.map((item) => <button key={item} onClick={() => setImage(item)} className="rounded-2xl border border-slate-200 p-1 dark:border-slate-800"><img src={item} alt={`${product.name} thumbnail`} className="h-20 w-24 rounded-xl object-cover"/></button>)}</div></div><div><Badge>{product.category}</Badge><h1 className="mt-4 text-5xl font-black tracking-tight text-ink dark:text-white">{product.name}</h1><div className="mt-4 flex items-center gap-4"><Rating value={product.rating} count={product.reviews}/><span className="text-sm text-emerald-600">{product.stock > 10 ? 'In stock' : `Only ${product.stock} left`}</span></div><p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{product.description}</p><div className="mt-8 flex items-end gap-3"><strong className="text-4xl text-ink dark:text-white">{formatMoney(product.price)}</strong>{product.compareAtPrice && <span className="text-xl text-slate-400 line-through">{formatMoney(product.compareAtPrice)}</span>}</div><div className="mt-8 flex flex-wrap gap-3"><Button size="lg" onClick={() => add(product.id)}>Add to cart</Button><Button size="lg" variant="secondary" onClick={() => wishlist.toggle(product.id)}><Heart className={wishlist.has(product.id) ? 'h-5 w-5 fill-rose-500 text-rose-500' : 'h-5 w-5'}/> Wishlist</Button></div><div className="mt-8 grid gap-3 sm:grid-cols-3">{[{icon:Truck,label:'Free shipping threshold'},{icon:RotateCcw,label:'30-day returns'},{icon:ShieldCheck,label:'Secure payments'}].map((item) => <Card key={item.label} className="p-4"><item.icon className="h-5 w-5 text-brand-600"/><p className="mt-2 text-sm font-semibold">{item.label}</p></Card>)}</div><div className="mt-8"><Tabs active={tab} onChange={setTab} tabs={[{id:'description', label:'Description', content:<p className="leading-7 text-slate-600 dark:text-slate-300">{product.description}</p>},{id:'specs', label:'Specifications', content:<dl className="grid gap-3">{Object.entries(product.specifications).map(([key,value]) => <div key={key} className="flex justify-between border-b border-slate-200 py-2 dark:border-slate-800"><dt>{key}</dt><dd className="font-bold">{value}</dd></div>)}</dl>},{id:'reviews', label:'Reviews', content:<div className="space-y-4">{reviews.map((review) => <Card key={review.id} className="p-4"><Rating value={review.rating}/><p className="mt-2">{review.content}</p><p className="mt-2 text-sm font-bold">{review.author}</p></Card>)}</div>}]} /></div></div></div><section className="mt-20"><h2 className="text-3xl font-black text-ink dark:text-white">Frequently bought together</h2><div className="mt-6"><ProductGrid products={getRecommendations(product).slice(0,4)}/></div></section><section className="mt-20"><h2 className="text-3xl font-black text-ink dark:text-white">Recently viewed & related products</h2><div className="mt-6"><ProductGrid products={getRecommendations(product).reverse().slice(0,4)}/></div></section></div></section>;
}
