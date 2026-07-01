import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: 'sm' | 'md' | 'lg'; children: ReactNode; }
export function Button({ className, variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
  return <button className={cn('inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:cursor-not-allowed disabled:opacity-50',
    variant === 'primary' && 'bg-ink text-white shadow-soft hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-ink',
    variant === 'secondary' && 'border border-slate-200 bg-white text-ink hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white',
    variant === 'ghost' && 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
    variant === 'danger' && 'bg-rose-600 text-white hover:bg-rose-700',
    size === 'sm' && 'px-3 py-2 text-sm', size === 'md' && 'px-5 py-3 text-sm', size === 'lg' && 'px-7 py-4 text-base', className)} {...props}>{children}</button>;
}
