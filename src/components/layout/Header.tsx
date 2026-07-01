import { Command, Heart, Moon, Search, ShoppingBag, Sun, User } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '../ui/Button';
import { APP_NAME } from '../../constants/site';
import { useCartSummary } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';

const nav = [{ to: '/', label: 'Home' }, { to: '/products', label: 'Shop' }, { to: '/compare', label: 'Compare' }, { to: '/admin', label: 'Admin' }];
export function Header({ onCommand }: { onCommand: () => void }) {
  const { count } = useCartSummary();
  const wishlistCount = useWishlistStore((state) => state.ids.length);
  const { theme, toggleTheme } = useThemeStore();
  const user = useAuthStore((state) => state.user);
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); }, [theme]);
  return <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"><Link to="/" className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white shadow-glow dark:bg-white dark:text-ink"><ShoppingBag className="h-5 w-5"/></span><span><strong className="block text-lg text-ink dark:text-white">{APP_NAME}</strong><small className="hidden text-slate-500 sm:block">Curated premium commerce</small></span></Link><nav className="hidden items-center gap-1 lg:flex">{nav.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold ${isActive ? 'bg-slate-100 text-ink dark:bg-slate-800 dark:text-white' : 'text-slate-500 hover:text-ink dark:text-slate-400 dark:hover:text-white'}`}>{item.label}</NavLink>)}</nav><div className="flex items-center gap-2"><Button variant="secondary" size="sm" onClick={onCommand} aria-label="Open command palette"><Command className="h-4 w-4"/><span className="hidden sm:inline">⌘K</span></Button><Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}</Button><Link to="/wishlist" className="relative rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Wishlist"><Heart className="h-5 w-5"/>{wishlistCount > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 text-xs font-bold text-white">{wishlistCount}</span>}</Link><Link to="/cart" className="relative rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Cart"><ShoppingBag className="h-5 w-5"/>{count > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-brand-600 px-1.5 text-xs font-bold text-white">{count}</span>}</Link><Link to={user ? '/profile' : '/login'} className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Account"><User className="h-5 w-5"/></Link><Link to="/products" className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden" aria-label="Search"><Search className="h-5 w-5"/></Link></div></div></header>;
}
