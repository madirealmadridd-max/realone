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
      <div className="text-center py-6 mb-4 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#888888] block mb-1">
          Niche &amp; Luxury Scents
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-[#291409] uppercase">
          Perfumes
        </h1>
        <p className="text-xs sm:text-sm text-[#888888] mt-1.5">
          Authentic fragrances &amp; French Avenue luxury extrait de parfum
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2.5 justify-center mb-8 px-2">
        <button
          onClick={() => setSubFilter('all')}
          className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all ${
            subFilter === 'all'
              ? 'bg-[#291409] text-white border-[#291409] shadow-sm font-bold'
              : 'bg-transparent text-[#666666] border-black/10 hover:border-[#291409]'
          }`}
        >
          All ({perfumeItems.length})
        </button>
        <button
          onClick={() => setSubFilter('parfum-complet')}
          className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all ${
            subFilter === 'parfum-complet'
              ? 'bg-[#291409] text-white border-[#291409] shadow-sm font-bold'
              : 'bg-transparent text-[#666666] border-black/10 hover:border-[#291409]'
          }`}
        >
          Parfum Complet (19)
        </button>
        <button
          onClick={() => setSubFilter('french-avenue')}
          className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all ${
            subFilter === 'french-avenue'
              ? 'bg-[#291409] text-white border-[#291409] shadow-sm font-bold'
              : 'bg-transparent text-[#666666] border-black/10 hover:border-[#291409]'
          }`}
        >
          French Avenue (6)
        </button>
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
