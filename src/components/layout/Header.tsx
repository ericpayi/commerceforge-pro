import { Command, Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { APP_NAME } from '../../constants/site';
import { useCartSummary } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Shop' },
  { to: '/compare', label: 'Compare' },
  { to: '/admin', label: 'Admin' },
];

export function Header({ onCommand }: { onCommand: () => void }) {
  const { count } = useCartSummary();
  const wishlistCount = useWishlistStore((state) => state.ids.length);
  const { theme, toggleTheme } = useThemeStore();
  const user = useAuthStore((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-slate-100 text-ink dark:bg-slate-800 dark:text-white'
        : 'text-slate-500 hover:bg-slate-100 hover:text-ink dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="container-page flex min-h-16 items-center justify-between gap-2 py-3 sm:gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={() => setMobileOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-ink text-white shadow-glow dark:bg-white dark:text-ink sm:h-11 sm:w-11">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <strong className="block truncate text-base text-ink dark:text-white sm:text-lg">{APP_NAME}</strong>
            <small className="hidden truncate text-slate-500 sm:block">Curated premium commerce</small>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button variant="secondary" size="sm" onClick={onCommand} aria-label="Open command palette" className="hidden sm:inline-flex">
            <Command className="h-4 w-4" />
            <span className="hidden md:inline">⌘K</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle theme" className="px-3">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link to="/wishlist" className="relative rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 text-xs font-bold text-white">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="relative rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-brand-600 px-1.5 text-xs font-bold text-white">{count}</span>}
          </Link>
          <Link to={user ? '/profile' : '/login'} className="hidden rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 sm:inline-flex" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/products" className="hidden rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 sm:inline-flex lg:hidden" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          <Button variant="ghost" size="sm" className="px-3 lg:hidden" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label="Toggle mobile menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-2 pt-4" aria-label="Mobile navigation">
            {[...nav, { to: user ? '/profile' : '/login', label: user ? 'Profile' : 'Login' }].map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass} onClick={() => setMobileOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
