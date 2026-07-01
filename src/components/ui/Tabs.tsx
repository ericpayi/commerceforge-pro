import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
export interface TabItem { id: string; label: string; content: ReactNode; }
export function Tabs({ tabs, active, onChange }: { tabs: TabItem[]; active: string; onChange: (id: string) => void }) { return <div><div className="flex flex-wrap gap-2" role="tablist">{tabs.map((tab) => <button key={tab.id} role="tab" aria-selected={active === tab.id} onClick={() => onChange(tab.id)} className={cn('rounded-full px-4 py-2 text-sm font-semibold', active === tab.id ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300')}>{tab.label}</button>)}</div><div className="mt-6">{tabs.find((tab) => tab.id === active)?.content}</div></div>; }
