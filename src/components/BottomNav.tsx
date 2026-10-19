import React from 'react';
import { useShop } from '../context/ShopContext';
import { ViewType } from '../types';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, cartCount, setIsBagOpen, setIsWishOpen } = useShop();

  const handleNav = (targetView: ViewType) => {
    setCurrentView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[448px] h-[64px] bg-[#FEFCFB] border-t border-[#eeeeee] flex items-center justify-around z-40 px-2 pb-[env(safe-area-inset-bottom,0px)]">
      {/* Home */}
      <button
        onClick={() => handleNav('home')}
        className={`flex-1 h-full flex flex-col items-center justify-center gap-1 transition-colors ${
          currentView === 'home' ? 'text-[#291409] font-bold' : 'text-[#888888] font-medium'
        }`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="text-[10px] tracking-wide">Home</span>
      </button>

      {/* Shop */}
      <button
        onClick={() => handleNav('shop')}
        className={`flex-1 h-full flex flex-col items-center justify-center gap-1 transition-colors ${
          currentView === 'shop' || currentView === 'clothing' || currentView.startsWith('perfumes') || currentView === 'sunglasses'
            ? 'text-[#291409] font-bold'
            : 'text-[#888888] font-medium'
        }`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        <span className="text-[10px] tracking-wide">Shop</span>
      </button>

      {/* Wishlist */}
      <button
        onClick={() => setIsWishOpen(true)}
        className="flex-1 h-full flex flex-col items-center justify-center gap-1 transition-colors text-[#888888] font-medium hover:text-[#291409]"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className="text-[10px] tracking-wide">Wishlist</span>
      </button>

      {/* Cart */}
      <button
        onClick={() => {
          // If already on cart view, open bag drawer or navigate to cart
          handleNav('cart');
        }}
        className={`flex-1 h-full flex flex-col items-center justify-center gap-1 transition-colors relative ${
          currentView === 'cart' || currentView === 'checkout' ? 'text-[#291409] font-bold' : 'text-[#888888] font-medium'
        }`}
      >
        <div className="relative">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#291409] text-[#FEFCFB] text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] tracking-wide">Cart</span>
      </button>

      {/* Account */}
      <button
        onClick={() => handleNav('account')}
        className={`flex-1 h-full flex flex-col items-center justify-center gap-1 transition-colors ${
          currentView === 'account' ? 'text-[#291409] font-bold' : 'text-[#888888] font-medium'
        }`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="text-[10px] tracking-wide">Account</span>
      </button>
    </nav>
  );
};
