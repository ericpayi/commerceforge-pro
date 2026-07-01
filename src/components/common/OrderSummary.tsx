import { formatMoney } from '../../utils/money';
export function OrderSummary({ subtotal, discount, shipping, tax, total }: { subtotal: number; discount: number; shipping: number; tax: number; total: number }) {
  const row = (label: string, value: number) => <div className="flex justify-between text-sm"><span className="text-slate-500 dark:text-slate-400">{label}</span><strong className="text-ink dark:text-white">{formatMoney(value)}</strong></div>;
  return <div className="space-y-3">{row('Subtotal', subtotal)}{discount > 0 && row('Discount', -discount)}{row('Shipping', shipping)}{row('Tax', tax)}<div className="border-t border-slate-200 pt-4 dark:border-slate-800"><div className="flex justify-between text-lg"><span className="font-bold text-ink dark:text-white">Total</span><strong className="text-ink dark:text-white">{formatMoney(total)}</strong></div></div></div>;
}
