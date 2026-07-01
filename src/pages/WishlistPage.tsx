import { products } from '../data/products';
import { ProductGrid } from '../components/common/ProductGrid';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
export function WishlistPage() { const ids = useWishlistStore((state) => state.ids); const items = products.filter((product) => ids.includes(product.id)); return <section className="section"><div className="container-page"><h1 className="text-4xl font-black text-ink dark:text-white">Wishlist</h1><div className="mt-8">{items.length ? <ProductGrid products={items}/> : <EmptyState title="No saved products" description="Use the heart icon to save products for later." action={<Link to="/products"><Button>Browse catalog</Button></Link>}/>}</div></div></section>; }
