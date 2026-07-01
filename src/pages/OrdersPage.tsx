import { useQuery } from '@tanstack/react-query';
import { Download, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getOrders } from '../services/orderService';
import { formatMoney } from '../utils/money';
const stages = ['Processing','Packed','In transit','Delivered'];
export function OrdersPage() { const { data: orders = [] } = useQuery({ queryKey:['orders'], queryFn:getOrders }); return <section className="section"><div className="container-page"><h1 className="text-4xl font-black text-ink dark:text-white">Order history</h1><div className="mt-8 space-y-5">{orders.map((order) => <Card key={order.id}><div className="flex flex-col justify-between gap-4 md:flex-row"><div><p className="font-bold text-brand-600">{order.id}</p><h2 className="text-2xl font-black text-ink dark:text-white">{formatMoney(order.total)}</h2><p className="text-slate-500">{order.createdAt} · Tracking {order.trackingNumber}</p></div><div className="flex gap-2"><Button variant="secondary"><Download className="h-4 w-4"/> Invoice</Button><Button><RotateCcw className="h-4 w-4"/> Reorder</Button></div></div><div className="mt-6 grid gap-2 md:grid-cols-4">{stages.map((stage) => <div key={stage} className={`rounded-2xl p-3 text-sm font-bold ${stages.indexOf(stage) <= stages.indexOf(order.status) ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>{stage}</div>)}</div></Card>)}</div></div></section>; }
