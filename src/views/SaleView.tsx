import React from 'react';
import { useShop } from '../context/ShopContext';

export const SaleView: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="pb-16 pt-6 text-center px-4">
      <div className="bg-[#291409] text-white p-6 rounded-2xl mb-8">
        <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded">
          Seasonal Sale
        </span>
        <h1 className="text-2xl font-black tracking-wide uppercase mt-3">
          WILD ARCHIVE SALE
        </h1>
        <p className="text-xs text-white/80 mt-2 max-w-xs mx-auto">
          Private drop updates are released to members first. Up to 40% off selected outerwear &amp; seasonal staples.
        </p>
      </div>

      <div className="py-8">
        <p className="text-sm font-semibold tracking-wider uppercase text-[#291409]/60">
          No active public discounts today
        </p>
        <p className="text-xs text-[#888888] mt-1">
          Stay tuned or check out our brand new arrivals.
        </p>
        <button
          onClick={() => setCurrentView('new-arrivals')}
          className="mt-6 px-6 py-3 bg-[#291409] text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow hover:bg-[#3d1f0e] transition-colors"
        >
          Explore New Arrivals
        </button>
      </div>
    </div>
  );
};
