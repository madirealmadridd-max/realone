import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

interface AccessoriesViewProps {
  type: 'sunglasses' | 'belts' | 'underwear';
}

export const AccessoriesView: React.FC<AccessoriesViewProps> = ({ type }) => {
  const { setCurrentView } = useShop();

  if (type === 'belts') {
    return (
      <div className="py-24 px-6 text-center max-w-md mx-auto">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#888888] block mb-1">
          Accessories
        </span>
        <h1 className="text-3xl font-black tracking-widest text-[#291409] uppercase mb-3">
          Belts
        </h1>
        <p className="text-sm text-[#6b5a52] mb-8 leading-relaxed">
          The leather &amp; canvas belt collection is currently being crafted. Private release dropping soon.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-block px-8 py-3.5 bg-[#291409] text-white text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-[#3d1f0e] transition-colors shadow-sm"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  if (type === 'underwear') {
    return (
      <div className="py-24 px-6 text-center max-w-md mx-auto">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#888888] block mb-1">
          Essentials
        </span>
        <h1 className="text-3xl font-black tracking-widest text-[#291409] uppercase mb-3">
          Underwear
        </h1>
        <p className="text-sm text-[#6b5a52] mb-8 leading-relaxed">
          Premium organic cotton essentials collection dropping next season.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-block px-8 py-3.5 bg-[#291409] text-white text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-[#3d1f0e] transition-colors shadow-sm"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  // Sunglasses
  const sunglasses = PRODUCTS.filter((p) => p.cat === 'sunglasses');

  return (
    <div className="pb-16 pt-2">
      <div className="text-center py-6 mb-4 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#888888] block mb-1">
          Eyewear Collection
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-[#291409] uppercase">
          Sunglasses
        </h1>
        <p className="text-xs sm:text-sm text-[#888888] mt-1.5">
          UV400 Certified protection • Contemporary acetate &amp; metal frames
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
        {sunglasses.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
