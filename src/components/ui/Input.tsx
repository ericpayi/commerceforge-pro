import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string; }
export function Input({ className, label, error, id, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor={inputId}>{label}<input id={inputId} className={cn('rounded-2xl border border-slate-200 bg-white px-4 py-3 text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-brand-900/40', className)} {...props}/>{error && <span className="text-xs text-rose-600">{error}</span>}</label>;
}
