import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface PerfumesViewProps {
  initialSub?: 'all' | 'parfum-complet' | 'french-avenue';
}

export const PerfumesView: React.FC<PerfumesViewProps> = ({ initialSub = 'all' }) => {
  const [subFilter, setSubFilter] = useState<'all' | 'parfum-complet' | 'french-avenue'>(initialSub);

  const perfumeItems = PRODUCTS.filter((p) => p.cat === 'perfumes');

  const filteredItems = perfumeItems.filter((p) => {
    if (subFilter === 'all') return true;
    return p.sub === subFilter;
  });

  return (
    <div className="pb-16 pt-2">
      <div className="text-center py-4 mb-2">
        <h1 className="text-2xl font-bold tracking-widest text-[#291409] uppercase">
          Perfumes
        </h1>
        <p className="text-xs text-[#888888] mt-1">
          Authentic fragrances &amp; French Avenue luxury
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 justify-center mb-5 px-2">
        <button
          onClick={() => setSubFilter('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-colors ${
            subFilter === 'all'
              ? 'bg-[#291409] text-white border-[#291409]'
              : 'bg-transparent text-[#666666] border-black/10'
          }`}
        >
          All ({perfumeItems.length})
        </button>
        <button
          onClick={() => setSubFilter('parfum-complet')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-colors ${
            subFilter === 'parfum-complet'
              ? 'bg-[#291409] text-white border-[#291409]'
              : 'bg-transparent text-[#666666] border-black/10'
          }`}
        >
          Parfum Complet
        </button>
        <button
          onClick={() => setSubFilter('french-avenue')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border transition-colors ${
            subFilter === 'french-avenue'
              ? 'bg-[#291409] text-white border-[#291409]'
              : 'bg-transparent text-[#666666] border-black/10'
          }`}
        >
          French Avenue
        </button>
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
