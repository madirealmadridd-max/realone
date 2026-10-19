import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const HomeView: React.FC = () => {
  const { setCurrentView } = useShop();
  const [mainFilter, setMainFilter] = useState<'new' | 'perfumes' | 'sale'>('new');
  const [perfumeSubFilter, setPerfumeSubFilter] = useState('all');
  const [catFilter, setCatFilter] = useState<'all' | 'clothing' | 'sunglasses'>('all');
  const [clothingSubFilter, setClothingSubFilter] = useState('all');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // New arrivals items (8 items in pairs of 2 = 4 slides)
  const newArrivals = PRODUCTS.filter((p) => p.isNew);
  const totalSlides = Math.ceil(newArrivals.length / 2);

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % totalSlides);
  };

  // Filtered products for the catalog grid
  const filteredProducts = PRODUCTS.filter((p) => {
    if (mainFilter === 'perfumes') {
      if (p.cat !== 'perfumes') return false;
      if (perfumeSubFilter === 'all') return true;
      if (perfumeSubFilter === 'french-avenue') return p.sub === 'french-avenue';
      if (perfumeSubFilter === 'complet') return p.sub === 'parfum-complet';
      return p.sub === perfumeSubFilter;
    }

    if (mainFilter === 'sale') {
      return false;
    }

    // mainFilter === 'new'
    if (catFilter === 'sunglasses') {
      return p.cat === 'sunglasses';
    }
    if (catFilter === 'clothing') {
      if (p.cat !== 'clothing') return false;
      if (clothingSubFilter === 'all') return true;
      if (clothingSubFilter === 'jackets') return p.sub === 'jackets' || p.sub === 'gilet';
      if (clothingSubFilter === 'hoodies') return p.sub === 'hoodies';
      if (clothingSubFilter === 'tshirts') return p.sub === 't-shirt' || p.sub === 'knitted-tee-shirt';
      if (clothingSubFilter === 'sweaters') return p.sub === 'sweaters';
      if (clothingSubFilter === 'sweatshirts') return p.sub === 'sweatshirts';
      if (clothingSubFilter === 'shirts') return p.sub === 'shirts';
      return true;
    }

    // catFilter === 'all'
    if (clothingSubFilter !== 'all') {
      if (clothingSubFilter === 'jackets') return p.sub === 'jackets' || p.sub === 'gilet';
      if (clothingSubFilter === 'hoodies') return p.sub === 'hoodies';
      if (clothingSubFilter === 'tshirts') return p.sub === 't-shirt' || p.sub === 'knitted-tee-shirt';
      if (clothingSubFilter === 'sweaters') return p.sub === 'sweaters';
      if (clothingSubFilter === 'sweatshirts') return p.sub === 'sweatshirts';
      return true;
    }

    return p.cat === 'clothing' || p.cat === 'sunglasses';
  });

  return (
    <div className="pb-12">
      {/* Hero Banner */}
      <section className="relative w-full aspect-[9/14] rounded-2xl overflow-hidden mb-6 bg-[#d9d4cf] isolate">
        <img
          src="https://cdn.shopify.com/s/files/1/0985/8000/5139/files/banner_mobile_version.png?v=1776882409"
          alt="WILD CLOTHING banner"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FEFCFB]/95 via-[#FEFCFB]/20 to-[#291409]/60 pointer-events-none" />

        <div className="relative z-10 p-5 flex flex-col h-full justify-between">
          <h1 className="font-extrabold text-[36px] uppercase leading-none tracking-tight text-[#291409]">
            <span className="block">Style It</span>
            <span className="block text-right mt-1">Your Way</span>
          </h1>

          <div className="space-y-3 mt-auto">
            <p className="text-[12.5px] font-medium text-white/95 text-center leading-relaxed max-w-[90%] mx-auto drop-shadow-md">
              Finest garments by authentic brands. Clothing, perfumes &amp; accessories curated for those who wear their identity.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => {
                  document.getElementById('new-arrivals-anchor')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 py-3 px-4 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-[#291409]/75 text-white border border-white/25 backdrop-blur-md hover:bg-[#291409] active:scale-95 transition-all text-center"
              >
                Shop Now
              </button>
              <button
                onClick={() => {
                  document.getElementById('new-arrivals-anchor')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 py-3 px-4 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-[#FEFCFB]/45 text-[#291409] border border-white/50 backdrop-blur-md hover:bg-[#291409] hover:text-white active:scale-95 transition-all text-center"
              >
                New Arrivals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter Pills */}
      <div className="flex gap-2 justify-center flex-wrap mb-3 px-2">
        <button
          onClick={() => setMainFilter('new')}
          className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border transition-colors ${
            mainFilter === 'new'
              ? 'bg-[#291409] text-white border-[#291409]'
              : 'bg-transparent text-[#555555] border-black/10 hover:border-[#291409]'
          }`}
        >
          New Arrivals
        </button>
        <button
          onClick={() => setMainFilter('perfumes')}
          className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border transition-colors ${
            mainFilter === 'perfumes'
              ? 'bg-[#291409] text-white border-[#291409]'
              : 'bg-transparent text-[#555555] border-black/10 hover:border-[#291409]'
          }`}
        >
          Perfumes
        </button>
        <button
          onClick={() => setMainFilter('sale')}
          className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border transition-colors ${
            mainFilter === 'sale'
              ? 'bg-[#291409] text-white border-[#291409]'
              : 'bg-transparent text-[#555555] border-black/10 hover:border-[#291409]'
          }`}
        >
          Sale
        </button>
      </div>

      {/* Perfume sub-pills */}
      {mainFilter === 'perfumes' && (
        <div className="flex gap-1.5 justify-center flex-wrap mb-5 px-2">
          {[
            { id: 'all', label: 'All Perfumes' },
            { id: 'complet', label: 'Parfum Complet' },
            { id: 'french-avenue', label: 'French Avenue' },
            { id: 'decant', label: 'Decant' },
            { id: 'dupe', label: 'Dupe' },
            { id: 'zara', label: 'Zara Perfum' },
            { id: 'nos', label: 'Nos Pack' },
            { id: 'deo', label: "Men's Deodorant" },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setPerfumeSubFilter(pill.id)}
              className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border transition-colors ${
                perfumeSubFilter === pill.id
                  ? 'bg-[#291409] text-white border-[#291409]'
                  : 'bg-transparent text-[#666666] border-black/10'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      )}

      {/* Sale empty message */}
      {mainFilter === 'sale' && (
        <div className="text-center py-16 px-4">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#291409]/60">
            Sale collection updating soon
          </p>
          <p className="text-xs text-[#888888] mt-2">
            Sign up or check back later for private archive drops.
          </p>
          <button
            onClick={() => setMainFilter('new')}
            className="mt-4 px-5 py-2 bg-[#291409] text-white text-xs font-semibold uppercase tracking-wider rounded"
          >
            Back to New Arrivals
          </button>
        </div>
      )}

      {/* NEW ARRIVALS CAROUSEL (shown when mainFilter === 'new') */}
      {mainFilter === 'new' && (
        <section id="new-arrivals-anchor" className="mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            {/* Dots */}
            <div className="flex gap-1.5 items-center">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    carouselIndex === i ? 'w-4 bg-[#291409]' : 'w-1.5 bg-[#291409]/20'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-1">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full border border-[#eeeeee] bg-white flex items-center justify-center hover:bg-black/5"
                aria-label="Previous slide"
              >
                <svg className="w-4 h-4 text-[#291409]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full border border-[#eeeeee] bg-white flex items-center justify-center hover:bg-black/5"
                aria-label="Next slide"
              >
                <svg className="w-4 h-4 text-[#291409]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel Slide */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIdx) => {
                const pair = newArrivals.slice(slideIdx * 2, slideIdx * 2 + 2);
                return (
                  <div key={slideIdx} className="w-full shrink-0 grid grid-cols-2 gap-3">
                    {pair.map((p) => (
                      <ProductCard key={p.id} product={p} variant="carousel" />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Clothing & Sunglasses Category Filters */}
      {mainFilter === 'new' && (
        <>
          <div className="flex gap-2 justify-center flex-wrap mb-2 mt-4 px-2">
            {(['all', 'clothing', 'sunglasses'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCatFilter(cat);
                  setClothingSubFilter('all');
                }}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border transition-colors ${
                  catFilter === cat
                    ? 'bg-[#291409] text-white border-[#291409]'
                    : 'bg-transparent text-[#555555] border-black/10 hover:border-[#291409]'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Clothing Sub-filters */}
          {(catFilter === 'all' || catFilter === 'clothing') && (
            <div className="flex gap-1.5 justify-center flex-wrap mb-4 px-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'jackets', label: 'Jackets' },
                { id: 'hoodies', label: 'Hoodies' },
                { id: 'tshirts', label: 'T-Shirts' },
                { id: 'sweaters', label: 'Sweaters' },
                { id: 'sweatshirts', label: 'Sweatshirts' },
                { id: 'shirts', label: 'Shirts' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setClothingSubFilter(sub.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border transition-colors ${
                    clothingSubFilter === sub.id
                      ? 'bg-[#291409] text-white border-[#291409]'
                      : 'bg-transparent text-[#666666] border-black/10'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Product Grid */}
      {mainFilter !== 'sale' && (
        <section className="grid grid-cols-2 gap-3 mt-4">
          {filteredProducts.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-[#888888] text-xs uppercase tracking-wider">
              No products found in this category
            </div>
          ) : (
            filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </section>
      )}
    </div>
  );
};
