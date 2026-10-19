import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';

export const Header: React.FC = () => {
  const { cartCount, wishCount, setIsMenuOpen, setIsBagOpen, setIsWishOpen, setCurrentView } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[448px] h-[56px] z-40 transition-all duration-300 flex items-center justify-between px-4 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5'
          : 'bg-white/90 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="flex items-center min-w-[70px]">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="w-11 h-11 flex items-center justify-center text-[#291409] hover:opacity-75 transition-opacity"
          aria-label="Open menu"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </div>

      <button
        onClick={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="font-bold text-[15px] tracking-[1.5px] uppercase text-[#291409] cursor-pointer"
      >
        WILD CLOTHING
      </button>

      <div className="flex items-center justify-end min-w-[70px] gap-1">
        <button
          onClick={() => setIsWishOpen(true)}
          className="w-10 h-10 flex items-center justify-center text-[#291409] relative hover:opacity-75 transition-opacity"
          aria-label="Wishlist"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {wishCount > 0 && (
            <span className="absolute top-1 right-0.5 bg-[#291409] text-[#FEFCFB] text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center px-1 leading-none">
              {wishCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsBagOpen(true)}
          className="w-10 h-10 flex items-center justify-center text-[#291409] relative hover:opacity-75 transition-opacity"
          aria-label="Shopping bag"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-1 right-0.5 bg-[#291409] text-[#FEFCFB] text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center px-1 leading-none">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
