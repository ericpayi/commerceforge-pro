export type ID = string;

export type Category = 'Electronics' | 'Footwear' | 'Home' | 'Beauty' | 'Outdoor' | 'Fashion';

export interface Product {
  id: ID;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  isNew?: boolean;
  isTrending?: boolean;
  image: string;
  gallery: string[];
  description: string;
  specifications: Record<string, string>;
  tags: string[];
}

export interface CartLine { productId: ID; quantity: number; }
export interface User { id: ID; name: string; email: string; role: 'customer' | 'admin'; avatar?: string; }
export type OrderStatus = 'Processing' | 'Packed' | 'In transit' | 'Delivered';
export interface OrderItem { productId: ID; name: string; quantity: number; price: number; }
export interface Order {
  id: ID; createdAt: string; status: OrderStatus; total: number; items: OrderItem[];
  trackingNumber: string; shippingAddress: string;
}
export interface Review { id: ID; productId: ID; author: string; rating: number; content: string; createdAt: string; }
export interface ProductFilters {
  query: string; categories: Category[]; brands: string[]; minPrice: number; maxPrice: number; rating: number;
  sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'; page: number;
}
export interface CheckoutFormValues {
  fullName: string; email: string; phone: string; address: string; city: string; country: string; postalCode: string;
  billingSameAsShipping: boolean; paymentMethod: 'card' | 'paypal' | 'eft'; cardNumber?: string; discountCode?: string;
}
