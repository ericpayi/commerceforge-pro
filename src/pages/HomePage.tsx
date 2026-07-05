import { ArrowRight, ShieldCheck, Sparkles, Truck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { ProductGrid } from '../components/common/ProductGrid';
import { products } from '../data/products';
import { formatMoney } from '../utils/money';

export function HomePage() {
  const featured = products.filter((product) => product.isTrending).slice(0, 4);
  const categories = ['Electronics', 'Footwear', 'Home', 'Beauty', 'Outdoor', 'Fashion'];

  return (
    <>
      <section className="relative overflow-hidden bg-hero-grid dark:bg-slate-950">
        <div className="container-page grid min-h-[auto] items-center gap-8 py-10 sm:py-14 lg:min-h-[74vh] lg:grid-cols-[1fr_.9fr] lg:gap-12 lg:py-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge>Portfolio-grade commerce platform</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-ink dark:text-white min-[420px]:text-5xl sm:mt-6 sm:text-6xl lg:text-7xl">
              Luxury shopping UX, engineered like a serious product.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
              React 19, TypeScript, TanStack Query, Zustand, accessible components, mock commerce services, checkout flows, analytics, PWA support, and dark mode.
            </p>
            <div className="mt-7 grid gap-3 min-[420px]:flex min-[420px]:flex-wrap sm:mt-8">
              <Link to="/products" className="w-full min-[420px]:w-auto">
                <Button size="lg" className="w-full min-[420px]:w-auto">
                  Explore collection <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/admin" className="w-full min-[420px]:w-auto">
                <Button size="lg" variant="secondary" className="w-full min-[420px]:w-auto">
                  View admin dashboard
                </Button>
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
              {[
                { icon: Truck, label: 'Fast local delivery' },
                { icon: ShieldCheck, label: 'Secure checkout' },
                { icon: Sparkles, label: 'AI recommendations' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  <item.icon className="h-5 w-5 shrink-0 text-brand-600" />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-brand-400/20 blur-3xl sm:-inset-6 sm:rounded-[3rem]" />
            <Card className="relative overflow-hidden p-3 sm:p-4">
              <img src={products[4].image} alt="Featured smartwatch" className="h-72 w-full rounded-3xl object-cover sm:h-[420px] lg:h-[520px]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/85 p-4 backdrop-blur-xl dark:bg-slate-950/80 sm:bottom-8 sm:left-8 sm:right-8 sm:p-5">
                <p className="text-sm font-semibold text-brand-600">Editor’s pick</p>
                <h2 className="text-xl font-black text-ink dark:text-white sm:text-2xl">{products[4].name}</h2>
                <p className="mt-1 text-sm text-slate-500 sm:text-base">From {formatMoney(products[4].price)}</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <div>
              <Badge>Featured</Badge>
              <h2 className="mt-3 text-3xl font-black text-ink dark:text-white sm:text-4xl">Trending now</h2>
            </div>
            <Link to="/products" className="shrink-0 font-bold text-brand-600">Shop all</Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="section bg-white dark:bg-slate-900/40">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {categories.map((category, index) => (
              <Link key={category} to={`/products?category=${category}`}>
                <Card className="group min-h-44 overflow-hidden bg-gradient-to-br from-slate-900 to-brand-800 text-white sm:min-h-52">
                  <Zap className="h-8 w-8 text-brand-200" />
                  <h3 className="mt-8 text-2xl font-black sm:mt-10">{category}</h3>
                  <p className="mt-2 text-sm text-slate-200">{products.filter((p) => p.category === category).length + index} curated drops</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-6 lg:grid-cols-3 lg:gap-8">
          <Card className="lg:col-span-2">
            <Badge>Newsletter</Badge>
            <h2 className="mt-4 text-2xl font-black text-ink dark:text-white sm:text-3xl">Get private drops and architecture notes.</h2>
            <form className="mt-6 grid gap-3 sm:flex">
              <input aria-label="Email" placeholder="you@example.com" className="min-w-0 flex-1 rounded-full border border-slate-200 px-5 py-4 dark:border-slate-700 dark:bg-slate-900" />
              <Button>Subscribe</Button>
            </form>
          </Card>
          <Card>
            <h3 className="text-xl font-black text-ink dark:text-white">Loved by operators</h3>
            <p className="mt-4 text-slate-500 dark:text-slate-400">“The UX feels premium, but the folder structure and typed domain model are what made this stand out in review.”</p>
            <p className="mt-4 font-bold">— Engineering Manager</p>
          </Card>
        </div>
        <div className="container-page mt-10 grid grid-cols-2 gap-3 opacity-60 sm:mt-12 sm:grid-cols-5 sm:gap-4">
          {['NOVA', 'VANTA', 'ROAM', 'HEARTH', 'LUMIO'].map((brand) => (
            <div key={brand} className="rounded-2xl border border-slate-200 py-5 text-center text-xs font-black tracking-[.22em] dark:border-slate-800 sm:py-6 sm:text-base sm:tracking-[.3em]">
              {brand}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
