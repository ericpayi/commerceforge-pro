import { cn } from '../../utils/cn';
export function Skeleton({ className }: { className?: string }) { return <div className={cn('animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800', className)} />; }
export function Spinner() { return <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-brand-500" aria-label="Loading" />; }
