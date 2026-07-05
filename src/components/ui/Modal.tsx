import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title}><div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white p-4 sm:p-6 shadow-2xl dark:bg-slate-950"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold sm:text-2xl text-ink dark:text-white">{title}</h2><Button variant="ghost" size="sm" onClick={onClose} aria-label="Close modal"><X className="h-5 w-5"/></Button></div>{children}</div></div>;
}
