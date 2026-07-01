import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
export function Badge({ children, className }: { children: ReactNode; className?: string }) { return <span className={cn('inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 dark:bg-brand-900/30 dark:text-brand-200', className)}>{children}</span>; }
