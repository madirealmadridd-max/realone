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
      <div className="py-20 px-6 text-center">
        <h1 className="text-2xl font-extrabold tracking-widest text-[#291409] uppercase mb-2">
          Belts
        </h1>
        <p className="text-sm text-[#6b5a52] mb-6">Belt collection coming soon.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-block px-7 py-3 bg-[#291409] text-white text-xs font-bold tracking-widest uppercase rounded hover:bg-[#3d1f0e] transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  if (type === 'underwear') {
    return (
      <div className="py-20 px-6 text-center">
        <h1 className="text-2xl font-extrabold tracking-widest text-[#291409] uppercase mb-2">
          Underwear
        </h1>
        <p className="text-sm text-[#6b5a52] mb-6">Underwear collection coming soon.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-block px-7 py-3 bg-[#291409] text-white text-xs font-bold tracking-widest uppercase rounded hover:bg-[#3d1f0e] transition-colors"
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
      <div className="text-center py-4 mb-2">
        <h1 className="text-2xl font-bold tracking-widest text-[#291409] uppercase">
          Sunglasses
        </h1>
        <p className="text-xs text-[#888888] mt-1">
          UV400 Premium frames &amp; eyewear
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sunglasses.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
