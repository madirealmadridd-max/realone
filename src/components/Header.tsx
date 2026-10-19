import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ViewType } from '../types';

export const Header: React.FC = () => {
  const {
    cartCount,
    wishCount,
    setIsMenuOpen,
    setIsBagOpen,
    setIsWishOpen,
    currentView,
    setCurrentView,
    user,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Slim Top Bar */}
      <div className="bg-[#291409] text-white text-[10px] font-medium tracking-widest uppercase py-1 px-4 text-center">
        <span>Authentic Luxury Streetwear &amp; Fine Perfumes</span>
      </div>

      {/* Main Nav Bar */}
      <div
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-[#eeeeee]'
            : 'bg-[#FEFCFB]/95 backdrop-blur-md border-[#eeeeee]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto h-[52px] lg:h-[58px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* MOBILE LEFT: Menu button */}
          <div className="flex items-center lg:hidden min-w-[36px]">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-9 h-9 flex items-center justify-center text-[#291409] hover:opacity-75 transition-opacity"
              aria-label="Open navigation menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          </div>

          {/* BRAND WORDMARK (Zone 1) */}
          <div className="flex items-center">
            <button
              onClick={() => handleNav('home')}
              className="font-extrabold text-[16px] sm:text-[17px] lg:text-[18px] tracking-[2px] uppercase text-[#291409] cursor-pointer whitespace-nowrap"
            >
              WILD CLOTHING
            </button>
          </div>

          {/* STREAMLINED DESKTOP NAVIGATION (Zone 2 - Shortened, 4 concise sections) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-[#555555]">
            <button
              onClick={() => handleNav('shop')}
              className={`hover:text-[#291409] transition-colors py-1 relative ${
                currentView === 'shop' || currentView === 'new-arrivals' ? 'text-[#291409] font-extrabold' : ''
              }`}
            >
              Shop
              {(currentView === 'shop' || currentView === 'new-arrivals') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#291409]" />
              )}
            </button>

            <button
              onClick={() => handleNav('clothing')}
              className={`hover:text-[#291409] transition-colors py-1 relative ${
                currentView === 'clothing' ? 'text-[#291409] font-extrabold' : ''
              }`}
            >
              Clothing
              {currentView === 'clothing' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#291409]" />
              )}
            </button>

            <button
              onClick={() => handleNav('perfumes')}
              className={`hover:text-[#291409] transition-colors py-1 relative ${
                currentView.startsWith('perfumes') ? 'text-[#291409] font-extrabold' : ''
              }`}
            >
              Perfumes
              {currentView.startsWith('perfumes') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#291409]" />
              )}
            </button>

            <button
              onClick={() => handleNav('sale')}
              className={`hover:text-[#e53935] transition-colors py-1 relative text-[#e53935] ${
                currentView === 'sale' ? 'font-extrabold' : ''
              }`}
            >
              Sale
              {currentView === 'sale' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e53935]" />
              )}
            </button>
          </nav>

          {/* COMPACT ACTIONS (Zone 3) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon / Toggle */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center bg-[#f5f3f0] rounded-full px-3 py-1 w-44 lg:w-56 ring-1 ring-[#291409] transition-all">
                  <svg className="w-3.5 h-3.5 text-[#888888] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none text-xs text-[#291409] pl-2 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="text-[#888888] hover:text-[#291409] text-xs font-bold px-1"
                    aria-label="Close search"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-9 h-9 flex items-center justify-center text-[#291409] hover:bg-black/5 rounded-full transition-colors"
                  aria-label="Search products"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              )}
            </div>

            {/* Account Icon */}
            <button
              onClick={() => handleNav('account')}
              className="w-9 h-9 flex items-center justify-center text-[#291409] hover:bg-black/5 rounded-full transition-colors"
              aria-label="Account"
              title={user.isLoggedIn ? user.name : 'Sign In'}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishOpen(true)}
              className="w-9 h-9 flex items-center justify-center text-[#291409] relative hover:bg-black/5 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#291409] text-[#FEFCFB] text-[9px] font-bold min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-1 leading-none">
                  {wishCount}
                </span>
              )}
            </button>

            {/* Bag Icon */}
            <button
              onClick={() => setIsBagOpen(true)}
              className="w-9 h-9 flex items-center justify-center text-[#291409] relative hover:bg-black/5 rounded-full transition-colors"
              aria-label="Shopping bag"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#291409] text-[#FEFCFB] text-[9px] font-bold min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-1 leading-none">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
