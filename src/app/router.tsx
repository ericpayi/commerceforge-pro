/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense, type ComponentType } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute, AdminRoute } from '../routes/ProtectedRoute';
import { Spinner } from '../components/ui/Skeleton';

const HomePage = lazy(() => import('../pages/HomePage').then((module) => ({ default: module.HomePage })));
const ProductsPage = lazy(() => import('../pages/ProductsPage').then((module) => ({ default: module.ProductsPage })));
const ProductDetailsPage = lazy(() => import('../pages/ProductDetailsPage').then((module) => ({ default: module.ProductDetailsPage })));
const CartPage = lazy(() => import('../pages/CartPage').then((module) => ({ default: module.CartPage })));
const WishlistPage = lazy(() => import('../pages/WishlistPage').then((module) => ({ default: module.WishlistPage })));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage').then((module) => ({ default: module.CheckoutPage })));
const OrdersPage = lazy(() => import('../pages/OrdersPage').then((module) => ({ default: module.OrdersPage })));
const AdminDashboardPage = lazy(() => import('../pages/AdminDashboardPage').then((module) => ({ default: module.AdminDashboardPage })));
const AuthPage = lazy(() => import('../pages/AuthPage').then((module) => ({ default: module.AuthPage })));
const ProfilePage = lazy(() => import('../pages/ProfilePage').then((module) => ({ default: module.ProfilePage })));
const ComparePage = lazy(() => import('../pages/ComparePage').then((module) => ({ default: module.ComparePage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

function withSuspense<P extends object>(Component: ComponentType<P>, props: P) {
  return (
    <Suspense fallback={<div className="grid min-h-[60vh] place-items-center"><Spinner /></div>}>
      <Component {...props} />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: withSuspense(HomePage, {}) },
      { path: 'products', element: withSuspense(ProductsPage, {}) },
      { path: 'products/:slug', element: withSuspense(ProductDetailsPage, {}) },
      { path: 'cart', element: withSuspense(CartPage, {}) },
      { path: 'wishlist', element: withSuspense(WishlistPage, {}) },
      { path: 'compare', element: withSuspense(ComparePage, {}) },
      { path: 'login', element: withSuspense(AuthPage, { mode: 'login' }) },
      { path: 'register', element: withSuspense(AuthPage, { mode: 'register' }) },
      { path: 'forgot-password', element: withSuspense(AuthPage, { mode: 'forgot' }) },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'checkout', element: withSuspense(CheckoutPage, {}) },
          { path: 'orders', element: withSuspense(OrdersPage, {}) },
          { path: 'profile', element: withSuspense(ProfilePage, {}) },
        ],
      },
      { element: <AdminRoute />, children: [{ path: 'admin', element: withSuspense(AdminDashboardPage, {}) }] },
      { path: '*', element: withSuspense(NotFoundPage, {}) },
    ],
  },
]);
