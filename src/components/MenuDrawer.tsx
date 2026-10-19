import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ViewType } from '../types';

export const MenuDrawer: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen, setCurrentView, currentView, user } = useShop();
  const [openPerfumesSub, setOpenPerfumesSub] = useState(false);
  const [openAccessoriesSub, setOpenAccessoriesSub] = useState(false);

  if (!isMenuOpen) return null;

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className="fixed inset-0 bg-black/50 z-50 transition-opacity backdrop-blur-[2px]"
      />

      {/* Drawer */}
      <aside
        className="fixed top-0 bottom-0 left-0 max-w-[320px] w-[85%] bg-[#FEFCFB] z-50 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#eeeeee]">
          <span className="font-bold text-[17px] tracking-wide text-[#291409]">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-2xl text-[#291409] hover:opacity-70 transition-opacity"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto py-2">
          {/* New Arrivals */}
          <button
            onClick={() => navigateTo('new-arrivals')}
            className={`w-full flex items-center justify-between px-5 py-4 text-left border-b border-[#eeeeee] transition-colors text-[15px] ${
              currentView === 'new-arrivals' ? 'font-bold bg-[#faf6f3] text-[#291409]' : 'font-medium text-[#291409]'
            }`}
          >
            <span>New Arrivals</span>
            <svg className="w-4 h-4 text-[#888888]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Shop */}
          <button
            onClick={() => navigateTo('shop')}
            className={`w-full flex items-center justify-between px-5 py-4 text-left border-b border-[#eeeeee] transition-colors text-[15px] ${
              currentView === 'shop' ? 'font-bold bg-[#faf6f3] text-[#291409]' : 'font-medium text-[#291409]'
            }`}
          >
            <span>Shop</span>
            <svg className="w-4 h-4 text-[#888888]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Clothing */}
          <button
            onClick={() => navigateTo('clothing')}
            className={`w-full flex items-center justify-between px-5 py-4 text-left border-b border-[#eeeeee] transition-colors text-[15px] ${
              currentView === 'clothing' ? 'font-bold bg-[#faf6f3] text-[#291409]' : 'font-medium text-[#291409]'
            }`}
          >
            <span>Clothing</span>
            <svg className="w-4 h-4 text-[#888888]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Perfumes Accordion */}
          <div>
            <button
              onClick={() => setOpenPerfumesSub(!openPerfumesSub)}
              className="w-full flex items-center justify-between px-5 py-4 text-left border-b border-[#eeeeee] font-medium text-[#291409] text-[15px]"
            >
              <span>Perfumes</span>
              <svg
                className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${
                  openPerfumesSub ? 'rotate-90 text-[#291409]' : ''
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            {openPerfumesSub && (
              <div className="bg-[#fcf9f7] border-b border-[#eeeeee]">
                <button
                  onClick={() => navigateTo('perfumes')}
                  className="w-full flex items-center justify-between pl-10 pr-5 py-3 text-left text-[14px] text-[#291409] hover:bg-[#f6f0eb]"
                >
                  <span>All Perfumes</span>
                  <span className="text-xs text-[#888888]">Explore</span>
                </button>
                <button
                  onClick={() => navigateTo('perfumes-parfum-complet')}
                  className="w-full flex items-center justify-between pl-10 pr-5 py-3 text-left text-[14px] text-[#291409] hover:bg-[#f6f0eb]"
                >
                  <span>Parfum Complet</span>
                  <span className="text-xs text-[#888888]">19</span>
                </button>
                <button
                  onClick={() => navigateTo('perfumes-french-avenue')}
                  className="w-full flex items-center justify-between pl-10 pr-5 py-3 text-left text-[14px] text-[#291409] hover:bg-[#f6f0eb]"
                >
                  <span>French Avenue</span>
                  <span className="text-xs text-[#888888]">6</span>
                </button>
              </div>
            )}
          </div>

          {/* Accessories Accordion */}
          <div>
            <button
              onClick={() => setOpenAccessoriesSub(!openAccessoriesSub)}
              className="w-full flex items-center justify-between px-5 py-4 text-left border-b border-[#eeeeee] font-medium text-[#291409] text-[15px]"
            >
              <span>Accessories</span>
              <svg
                className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${
                  openAccessoriesSub ? 'rotate-90 text-[#291409]' : ''
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            {openAccessoriesSub && (
              <div className="bg-[#fcf9f7] border-b border-[#eeeeee]">
                <button
                  onClick={() => navigateTo('sunglasses')}
                  className="w-full flex items-center justify-between pl-10 pr-5 py-3 text-left text-[14px] text-[#291409] hover:bg-[#f6f0eb]"
                >
                  <span>Sunglasses</span>
                  <span className="text-xs text-[#888888]">8</span>
                </button>
                <button
                  onClick={() => navigateTo('belts')}
                  className="w-full flex items-center justify-between pl-10 pr-5 py-3 text-left text-[14px] text-[#291409] hover:bg-[#f6f0eb]"
                >
                  <span>Belts</span>
                  <span className="text-[10px] uppercase tracking-wide bg-[#291409]/10 text-[#291409] px-1.5 py-0.5 rounded">Soon</span>
                </button>
                <button
                  onClick={() => navigateTo('underwear')}
                  className="w-full flex items-center justify-between pl-10 pr-5 py-3 text-left text-[14px] text-[#291409] hover:bg-[#f6f0eb]"
                >
                  <span>Underwear</span>
                  <span className="text-[10px] uppercase tracking-wide bg-[#291409]/10 text-[#291409] px-1.5 py-0.5 rounded">Soon</span>
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          <button
            onClick={() => navigateTo('cart')}
            className={`w-full flex items-center justify-between px-5 py-4 text-left border-b border-[#eeeeee] transition-colors text-[15px] ${
              currentView === 'cart' ? 'font-bold bg-[#faf6f3] text-[#291409]' : 'font-medium text-[#291409]'
            }`}
          >
            <span>Cart</span>
            <svg className="w-4 h-4 text-[#888888]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Sale */}
          <button
            onClick={() => navigateTo('sale')}
            className={`w-full flex items-center justify-between px-5 py-4 text-left border-b border-[#eeeeee] transition-colors text-[15px] ${
              currentView === 'sale' ? 'font-bold bg-[#faf6f3] text-[#291409]' : 'font-medium text-[#291409]'
            }`}
          >
            <span className="text-[#e53935] font-semibold">Sale</span>
            <svg className="w-4 h-4 text-[#888888]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#eeeeee] bg-[#FEFCFB]">
          <button
            onClick={() => navigateTo('account')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-[#291409] text-[#291409] rounded-lg text-sm font-semibold hover:bg-[#291409] hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{user.isLoggedIn ? `Account (${user.name})` : 'Sign In / Account'}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
