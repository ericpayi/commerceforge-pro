import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn('rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900/85', className)} {...props}/>; }
