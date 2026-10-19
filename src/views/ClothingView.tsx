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
      <div className="text-center py-4 mb-2">
        <h1 className="text-2xl font-bold tracking-widest text-[#291409] uppercase">
          Clothing
        </h1>
        <p className="text-xs text-[#888888] mt-1">
          {filteredItems.length} styles available
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-4 px-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedSub(tab.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-colors ${
              selectedSub === tab.id
                ? 'bg-[#291409] text-white border-[#291409]'
                : 'bg-transparent text-[#666666] border-black/10 hover:border-[#291409]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
