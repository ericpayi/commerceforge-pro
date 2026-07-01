import { mockDelay } from '../api/client';
import { orders } from '../data/products';
import type { CheckoutFormValues, Order } from '../types/domain';
export async function getOrders(): Promise<Order[]> { await mockDelay(); return orders; }
export async function submitOrder(values: CheckoutFormValues, total: number): Promise<Order> {
  await mockDelay();
  return { id: `ORD-${Math.floor(10000 + Math.random() * 89999)}`, createdAt: new Date().toISOString().slice(0, 10), status: 'Processing', total, trackingNumber: `CFP-ZA-${Math.floor(10000 + Math.random() * 89999)}`, shippingAddress: `${values.address}, ${values.city}`, items: [] };
}
