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

  const perSlide = 2;
  const totalSlides = Math.ceil(items.length / perSlide);

  return (
    <section className="my-6">
      <div className="flex items-baseline justify-between mb-2.5 px-1">
        <h2 className="text-sm font-bold tracking-wider text-[#291409] uppercase">
          {section.title}
        </h2>
        <button
          onClick={() => {
            setCurrentView(section.targetView);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xs text-[#888888] hover:text-[#291409] transition-colors"
        >
          View all →
        </button>
      </div>

      {/* Slide track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, i) => {
            const chunk = items.slice(i * perSlide, i * perSlide + perSlide);
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

      {/* Slide dots */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                slide === i ? 'w-4 bg-[#291409]' : 'w-1.5 bg-[#291409]/20'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export const ShopView: React.FC = () => {
  return (
    <div className="pb-16 pt-2">
      <section className="text-center py-4 mb-2">
        <h1 className="text-2xl font-bold tracking-widest text-[#291409] uppercase">SHOP</h1>
        <p className="text-xs text-[#888888] mt-1">Browse every collection at a glance.</p>
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
