import React from 'react';
import { useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { MenuDrawer } from './components/MenuDrawer';
import { BagDrawer } from './components/BagDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Toast } from './components/Toast';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ClothingView } from './views/ClothingView';
import { PerfumesView } from './views/PerfumesView';
import { AccessoriesView } from './views/AccessoriesView';
import { SaleView } from './views/SaleView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { AccountView } from './views/AccountView';

export const AppContent: React.FC = () => {
  const { currentView } = useShop();

  const renderView = () => {
    switch (currentView) {
      case 'home':
      case 'new-arrivals':
        return <HomeView />;
      case 'shop':
        return <ShopView />;
      case 'clothing':
        return <ClothingView />;
      case 'perfumes':
        return <PerfumesView initialSub="all" />;
      case 'perfumes-parfum-complet':
        return <PerfumesView initialSub="parfum-complet" />;
      case 'perfumes-french-avenue':
        return <PerfumesView initialSub="french-avenue" />;
      case 'sunglasses':
        return <AccessoriesView type="sunglasses" />;
      case 'belts':
        return <AccessoriesView type="belts" />;
      case 'underwear':
        return <AccessoriesView type="underwear" />;
      case 'sale':
        return <SaleView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'account':
        return <AccountView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFCFB] text-[#291409] flex flex-col selection:bg-[#291409] selection:text-white">
      {/* Sticky Top Header (Desktop & Mobile) */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {renderView()}
      </main>

      {/* Desktop & Mobile Footer */}
      <Footer />

      {/* Mobile Bottom Navigation (lg:hidden) */}
      <BottomNav />

      {/* Drawers & Modals */}
      <MenuDrawer />
      <BagDrawer />
      <WishlistDrawer />
      <ProductDetailModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
