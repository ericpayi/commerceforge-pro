# CommerceForge Pro

A production-ready e-commerce portfolio application built with React 19, TypeScript, Vite, Tailwind CSS, React Router v7, TanStack Query, Zustand, React Hook Form, Zod, Framer Motion, Recharts, Vitest, ESLint, and Prettier.

CommerceForge Pro is designed to feel closer to a commercial storefront than a tutorial demo: polished responsive UI, dark mode, feature-based architecture, persisted cart/wishlist/auth state, mocked service layer, checkout validation, order history, admin analytics, command palette, and PWA-ready build tooling.

## Highlights

- **Modern storefront UX:** hero, featured products, categories, product listing, quick view, product details, gallery, reviews, related products.
- **Commerce flows:** cart, discount code (`PORTFOLIO10`), wishlist, checkout wizard, order confirmation, order tracking timeline, invoice/reorder actions.
- **Authentication:** login, register, forgot password, protected routes, profile, logout. Mocked locally for safe portfolio review.
- **Admin dashboard:** revenue charts, category performance, inventory, low-stock alerts, recent orders, management entry points.
- **Quality architecture:** feature-based folders, typed domain model, service layer, reusable UI primitives, custom hooks, Zustand stores, TanStack Query caching.
- **UX extras:** dark/light mode, command palette (`Ctrl/Cmd + K`), responsive layout, accessible labels, loading skeletons, empty states, smooth animations.
- **Production tooling:** strict TypeScript, Vite build, PWA plugin, ESLint, Prettier, Vitest, React Testing Library.

## Tech Stack

React 19 · TypeScript · Vite · Tailwind CSS · React Router v7 · TanStack Query · Zustand · React Hook Form · Zod · Axios · Framer Motion · Recharts · Vitest · React Testing Library · ESLint · Prettier · PWA plugin

## Folder Structure

```text
src/
  api/                 axios client and mock latency helpers
  app/                 providers and router
  assets/              static assets
  components/
    ui/                reusable primitives (Button, Card, Modal, Tabs, etc.)
    layout/            application shell
    common/            product cards, command palette, order summary
  constants/           app constants and pricing rules
  data/                seed products, reviews, orders
  features/            feature-level tests and future expansion points
  hooks/               query hooks and keyboard shortcuts
  pages/               route-level pages
  routes/              protected/admin route guards
  services/            mock API/service layer
  store/               Zustand persisted stores
  types/               domain models
  utils/               formatting, class merging, debounce
```

## Getting Started

```bash
cd C:\Users\Datonomy\apps\commerceforge-pro
npm install
npm run dev
```

Open the local Vite URL shown in your terminal, usually `http://localhost:5173`.

## Demo Credentials

Any valid email and a password of at least 6 characters will log in. Try:

```text
Email: demo@commerceforge.dev
Password: password
```

The mock user has admin access so you can view `/admin`.

## Useful Scripts

```bash
npm run dev        # start Vite dev server
npm run build      # type-check and production build
npm run preview    # preview production build
npm run test       # run Vitest + React Testing Library tests
npm run lint       # run ESLint
npm run format     # format with Prettier
npm run typecheck  # strict TypeScript check
```

## Environment Variables

Copy `.env.example` to `.env` if you want to override defaults:

```text
VITE_APP_NAME=CommerceForge Pro
VITE_MOCK_LATENCY=250
```

## Notes for Reviewers

- Data is intentionally mocked in `src/data/products.ts` and accessed through services to mirror a real API boundary.
- Product media is local SVG artwork under `public/product-media`, so the UI does not depend on external image APIs or rate-limited third-party assets.
- Cart, wishlist, auth, and theme persist to local storage through Zustand middleware.
- TanStack Query caches product/order reads and isolates async state from UI components.
- Checkout uses React Hook Form + Zod for typed validation.
- The admin dashboard uses Recharts and production-style cards rather than placeholder text.
- The app is PWA-ready through `vite-plugin-pwa`.
