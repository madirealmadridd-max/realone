import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product, ViewType } from '../types';

interface ShopSectionConfig {
  id: string;
  title: string;
  targetView: ViewType;
  filter: (p: Product) => boolean;
}

const SHOP_SECTIONS: ShopSectionConfig[] = [
  {
    id: 'outerwear',
    title: 'OUTERWEAR',
    targetView: 'clothing',
    filter: (p) => p.cat === 'clothing' && (p.sub === 'jackets' || p.sub === 'gilet'),
  },
  {
    id: 'hoodies',
    title: 'HOODIES',
    targetView: 'clothing',
    filter: (p) => p.sub === 'hoodies',
  },
  {
    id: 'sweatshirts',
    title: 'SWEATSHIRTS',
    targetView: 'clothing',
    filter: (p) => p.sub === 'sweatshirts',
  },
  {
    id: 'tshirts',
    title: 'T-SHIRTS',
    targetView: 'clothing',
    filter: (p) => p.sub === 't-shirt' || p.sub === 'knitted-tee-shirt',
  },
  {
    id: 'shirts',
    title: 'SHIRTS',
    targetView: 'clothing',
    filter: (p) => p.sub === 'shirts',
  },
  {
    id: 'knitwear',
    title: 'KNITWEAR',
    targetView: 'clothing',
    filter: (p) => p.sub === 'sweaters',
  },
  {
    id: 'sunglasses',
    title: 'SUNGLASSES',
    targetView: 'sunglasses',
    filter: (p) => p.cat === 'sunglasses',
  },
  {
    id: 'perfumes',
    title: 'PARFUM COMPLET',
    targetView: 'perfumes-parfum-complet',
    filter: (p) => p.sub === 'parfum-complet',
  },
  {
    id: 'french-avenue',
    title: 'FRENCH AVENUE',
    targetView: 'perfumes-french-avenue',
    filter: (p) => p.sub === 'french-avenue',
  },
];

const SectionCarousel: React.FC<{ section: ShopSectionConfig; items: Product[] }> = ({
  section,
  items,
}) => {
  const { setCurrentView } = useShop();
  const [slide, setSlide] = useState(0);

  if (!items.length) return null;

  // On desktop, 4 items per slide; on mobile, 2 items per slide
  const perSlideDesktop = 4;
  const totalSlidesDesktop = Math.ceil(items.length / perSlideDesktop);

  const perSlideMobile = 2;
  const totalSlidesMobile = Math.ceil(items.length / perSlideMobile);

  return (
    <section className="my-8 sm:my-12">
      <div className="flex items-center justify-between mb-4 px-1 border-b border-[#eeeeee] pb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold tracking-wider text-[#291409] uppercase">
            {section.title}
          </h2>
          <span className="text-xs text-[#888888] font-medium">
            {items.length} styles
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Arrow controls on desktop */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => setSlide((prev) => Math.max(0, prev - 1))}
              disabled={slide === 0}
              className="w-8 h-8 rounded-full border border-[#eeeeee] bg-white flex items-center justify-center hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              aria-label="Previous items"
            >
              <svg className="w-3.5 h-3.5 text-[#291409]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => setSlide((prev) => prev + 1)}
              className="w-8 h-8 rounded-full border border-[#eeeeee] bg-white flex items-center justify-center hover:bg-black/5 shadow-sm"
              aria-label="Next items"
            >
              <svg className="w-3.5 h-3.5 text-[#291409]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => {
              setCurrentView(section.targetView);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold uppercase tracking-wider text-[#291409] hover:underline"
          >
            View all →
          </button>
        </div>
      </div>

      {/* Desktop slide track (4 items) */}
      <div className="hidden lg:block overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${(slide % totalSlidesDesktop) * 100}%)` }}
        >
          {Array.from({ length: totalSlidesDesktop }).map((_, i) => {
            const chunk = items.slice(i * perSlideDesktop, i * perSlideDesktop + perSlideDesktop);
            return (
              <div key={i} className="w-full shrink-0 grid grid-cols-4 gap-6">
                {chunk.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile/Tablet slide track (2 items) */}
      <div className="lg:hidden overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${(slide % totalSlidesMobile) * 100}%)` }}
        >
          {Array.from({ length: totalSlidesMobile }).map((_, i) => {
            const chunk = items.slice(i * perSlideMobile, i * perSlideMobile + perSlideMobile);
            return (
              <div key={i} className="w-full shrink-0 grid grid-cols-2 gap-3">
                {chunk.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const ShopView: React.FC = () => {
  return (
    <div className="pb-16 pt-2">
      <section className="text-center py-6 mb-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#888888] block mb-1">
          Complete Boutique
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-[#291409] uppercase">
          Shop All Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#666666] mt-2">
          Discover every curated apparel category, fine fragrance edition, and exclusive accessory drop.
        </p>
      </section>

      <div>
        {SHOP_SECTIONS.map((sec) => (
          <SectionCarousel
            key={sec.id}
            section={sec}
            items={PRODUCTS.filter(sec.filter)}
          />
        ))}
      </div>
    </div>
  );
};
