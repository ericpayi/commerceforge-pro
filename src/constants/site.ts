export const APP_NAME = String(import.meta.env.VITE_APP_NAME ?? 'CommerceForge Pro');
export const TAX_RATE = 0.15;
export const FREE_SHIPPING_THRESHOLD = 150;
export const SHIPPING_FLAT_RATE = 12;
export const PAGE_SIZE = 8;
export const CURRENCY = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' });
