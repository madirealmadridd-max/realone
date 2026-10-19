# WILD CLOTHING — Mobile Application (React + Vite + TypeScript)

A modern, responsive, mobile-first boutique e-commerce web application for **WILD CLOTHING**, rewrote from static HTML/CSS into a modular React single-page application (SPA).

## Features

- **Mobile-First App Shell**: Native-feel framed viewport (448px), sticky blur header, dynamic badge counters, and bottom navigation.
- **Home View**: Dynamic hero banner with action CTAs, filterable category pills, interactive multi-slide New Arrivals carousel, and categorized product grid.
- **Shop View**: Curated horizontal sliding rail carousels for Outerwear, Hoodies, Sweatshirts, T-Shirts, Shirts, Knitwear, Sunglasses, Parfum Complet, and French Avenue.
- **Clothing Catalog**: Dedicated collection view with instant sub-category filter tags (Jackets, Gilets, Hoodies, T-Shirts, Sweaters, Knitted Tees, Sweatshirts, Shirts).
- **Perfumes Collections**: Parfum Complet & French Avenue luxury fragrances with bottle zoom and quick-add overlays.
- **Accessories**: Sunglasses collection, plus Belts and Underwear teaser states.
- **Shopping Cart & Bag Drawer**: Live quantity increment/decrement, remove items, subtotal calculation, and persistence via `localStorage` (`mwBag`).
- **Wishlist Drawer**: Save favorites with interactive hearts and one-tap transfer to shopping bag (`mwWishlist`).
- **Quick View Modal**: Inspect product photos, select clothing sizes (S, M, L, XL) or fragrance volumes, and adjust quantity.
- **Checkout Flow**: Complete order placement with contact details, shipping address, delivery notes, payment method selection (Cash on Delivery or Credit Card), and order confirmation modal with generated reference numbers.
- **User Account**: Sign in, register, and guest checkout support with profile statistics.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS v4 + custom Rubik typography
- **State Management**: React Context (`ShopContext`) + LocalStorage persistence

## Development

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Production build
npm run build
```
