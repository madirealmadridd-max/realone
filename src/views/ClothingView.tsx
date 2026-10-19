import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ClothingView: React.FC = () => {
  const [selectedSub, setSelectedSub] = useState('all');

  const clothingItems = PRODUCTS.filter((p) => p.cat === 'clothing');

  const filteredItems = clothingItems.filter((p) => {
    if (selectedSub === 'all') return true;
    if (selectedSub === 'jackets') return p.sub === 'jackets';
    if (selectedSub === 'gilet') return p.sub === 'gilet';
    if (selectedSub === 'hoodies') return p.sub === 'hoodies';
    if (selectedSub === 'tshirts') return p.sub === 't-shirt';
    if (selectedSub === 'sweaters') return p.sub === 'sweaters';
    if (selectedSub === 'knitted-tees') return p.sub === 'knitted-tee-shirt';
    if (selectedSub === 'sweatshirts') return p.sub === 'sweatshirts';
    if (selectedSub === 'shirts') return p.sub === 'shirts';
    return true;
  });

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'jackets', label: 'Jackets' },
    { id: 'gilet', label: 'Gilets' },
    { id: 'hoodies', label: 'Hoodies' },
    { id: 'tshirts', label: 'T-Shirts' },
    { id: 'sweaters', label: 'Sweaters' },
    { id: 'knitted-tees', label: 'Knitted Tees' },
    { id: 'sweatshirts', label: 'Sweatshirts' },
    { id: 'shirts', label: 'Shirts' },
  ];

  return (
    <div className="pb-16 pt-2">
      <div className="text-center py-6 mb-4 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#888888] block mb-1">
          Wardrobe Staples
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-[#291409] uppercase">
          Clothing
        </h1>
        <p className="text-xs sm:text-sm text-[#888888] mt-1.5">
          {filteredItems.length} styles available • Heavyweight cotton &amp; tailored silhouettes
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center pb-3 mb-8 px-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedSub(tab.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all ${
              selectedSub === tab.id
                ? 'bg-[#291409] text-white border-[#291409] shadow-sm font-bold'
                : 'bg-transparent text-[#666666] border-black/10 hover:border-[#291409]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
        {filteredItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
