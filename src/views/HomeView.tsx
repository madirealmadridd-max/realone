import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const HomeView: React.FC = () => {
  const { setCurrentView, searchQuery, setSearchQuery } = useShop();
  const [mainFilter, setMainFilter] = useState<'new' | 'perfumes' | 'sale'>('new');
  const [perfumeSubFilter, setPerfumeSubFilter] = useState('all');
  const [catFilter, setCatFilter] = useState<'all' | 'clothing' | 'sunglasses'>('all');
  const [clothingSubFilter, setClothingSubFilter] = useState('all');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // New arrivals items
  const newArrivals = PRODUCTS.filter((p) => p.isNew);
  // On desktop we show 4 per slide (total 2 slides), on mobile 2 per slide (total 4 slides)
  // Let's make the carousel dynamically responsive
  const totalMobileSlides = Math.ceil(newArrivals.length / 2);
  const totalDesktopSlides = Math.ceil(newArrivals.length / 4);

  // Filtered products for catalog grid
  const filteredProducts = PRODUCTS.filter((p) => {
    // If global search query is active
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q) ||
        p.sub.toLowerCase().includes(q)
      );
    }

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
      {/* Search Header Banner if user is searching */}
      {searchQuery && (
        <div className="mb-6 p-4 bg-[#f8f5f2] rounded-xl flex items-center justify-between border border-[#eeeeee]">
          <div>
            <span className="text-xs text-[#888888] uppercase tracking-wider block">Search Results</span>
            <h2 className="text-base font-bold text-[#291409]">
              “{searchQuery}” — {filteredProducts.length} items found
            </h2>
          </div>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-semibold uppercase tracking-wider text-[#291409] hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Hero Banner (Responsive: portrait on small mobile, expansive widescreen on desktop) */}
      {!searchQuery && (
        <section className="relative w-full aspect-[9/13] sm:aspect-[16/9] lg:aspect-[21/9] lg:min-h-[480px] rounded-2xl overflow-hidden mb-8 lg:mb-12 bg-[#d9d4cf] isolate shadow-sm">
          <img
            src="https://cdn.shopify.com/s/files/1/0985/8000/5139/files/banner_mobile_version.png?v=1776882409"
            alt="WILD CLOTHING hero campaign"
            className="absolute inset-0 w-full h-full object-cover object-[center_30%] sm:object-[center_25%]"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FEFCFB]/90 via-[#FEFCFB]/30 to-[#291409]/75 sm:to-[#291409]/70 pointer-events-none" />

          {/* Banner Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col h-full justify-between max-w-4xl">
            <div>
              <span className="inline-block text-[11px] lg:text-xs font-bold uppercase tracking-[3px] text-[#291409]/80 mb-2">
                New 2026 Collection
              </span>
              <h1 className="font-black text-[38px] sm:text-[54px] lg:text-[68px] uppercase leading-[0.95] tracking-tight text-[#291409]">
                <span>Style It</span>
                <span className="block sm:inline sm:ml-4 text-[#291409]">Your Way</span>
              </h1>
            </div>

            <div className="space-y-4 max-w-xl">
              <p className="text-[13px] sm:text-sm lg:text-base font-medium text-white/95 leading-relaxed drop-shadow-md">
                Finest garments by authentic brands. Luxury streetwear, curated fragrances &amp; designer accessories built for those who wear their identity.
              </p>
              <div className="flex gap-3 sm:w-80">
                <button
                  onClick={() => {
                    document.getElementById('new-arrivals-anchor')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-3.5 px-6 rounded-full text-xs font-bold tracking-widest uppercase bg-[#291409] text-white shadow-lg hover:bg-[#3d1f0e] active:scale-95 transition-all text-center"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => {
                    document.getElementById('new-arrivals-anchor')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-3.5 px-6 rounded-full text-xs font-bold tracking-widest uppercase bg-white/80 text-[#291409] backdrop-blur-md hover:bg-white active:scale-95 transition-all text-center"
                >
                  New Arrivals
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Filter Pills */}
      {!searchQuery && (
        <div className="flex gap-2 sm:gap-3 justify-center flex-wrap mb-4 sm:mb-6">
          <button
            onClick={() => setMainFilter('new')}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase border transition-all ${
              mainFilter === 'new'
                ? 'bg-[#291409] text-white border-[#291409] shadow-sm'
                : 'bg-transparent text-[#555555] border-black/10 hover:border-[#291409]'
            }`}
          >
            New Arrivals
          </button>
          <button
            onClick={() => setMainFilter('perfumes')}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase border transition-all ${
              mainFilter === 'perfumes'
                ? 'bg-[#291409] text-white border-[#291409] shadow-sm'
                : 'bg-transparent text-[#555555] border-black/10 hover:border-[#291409]'
            }`}
          >
            Perfumes
          </button>
          <button
            onClick={() => setMainFilter('sale')}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase border transition-all ${
              mainFilter === 'sale'
                ? 'bg-[#291409] text-white border-[#291409] shadow-sm'
                : 'bg-transparent text-[#555555] border-black/10 hover:border-[#291409]'
            }`}
          >
            Sale
          </button>
        </div>
      )}

      {/* Perfume sub-pills */}
      {mainFilter === 'perfumes' && !searchQuery && (
        <div className="flex gap-2 justify-center flex-wrap mb-6">
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
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase border transition-colors ${
                perfumeSubFilter === pill.id
                  ? 'bg-[#291409] text-white border-[#291409]'
                  : 'bg-transparent text-[#666666] border-black/10 hover:border-[#291409]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      )}

      {/* Sale empty message */}
      {mainFilter === 'sale' && !searchQuery && (
        <div className="text-center py-20 px-4 bg-white rounded-2xl border border-[#eeeeee] my-6">
          <span className="text-xs uppercase tracking-widest text-[#e53935] font-bold block mb-2">
            Archive Access
          </span>
          <p className="text-lg font-bold tracking-wider uppercase text-[#291409]">
            Sale collection updating soon
          </p>
          <p className="text-xs text-[#888888] mt-2 max-w-sm mx-auto">
            Subscribe or sign in to receive early invitations to our private archive sales.
          </p>
          <button
            onClick={() => setMainFilter('new')}
            className="mt-6 px-6 py-2.5 bg-[#291409] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow hover:bg-[#3d1f0e] transition-colors"
          >
            Back to New Arrivals
          </button>
        </div>
      )}

      {/* NEW ARRIVALS CAROUSEL (Desktop: 4 items per view, Mobile: 2 items per view) */}
      {mainFilter === 'new' && !searchQuery && (
        <section id="new-arrivals-anchor" className="mb-10 sm:mb-14">
          <div className="flex items-center justify-between mb-4 px-1">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#888888]">
                Featured Drop
              </span>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#291409]">
                New Arrivals
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCarouselIndex((prev) => Math.max(0, prev - 1))}
                disabled={carouselIndex === 0}
                className="w-9 h-9 rounded-full border border-[#eeeeee] bg-white flex items-center justify-center hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                aria-label="Previous slide"
              >
                <svg className="w-4 h-4 text-[#291409]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() =>
                  setCarouselIndex((prev) =>
                    Math.min(
                      (typeof window !== 'undefined' && window.innerWidth >= 1024
                        ? totalDesktopSlides
                        : totalMobileSlides) - 1,
                      prev + 1
                    )
                  )
                }
                className="w-9 h-9 rounded-full border border-[#eeeeee] bg-white flex items-center justify-center hover:bg-black/5 transition-all shadow-sm"
                aria-label="Next slide"
              >
                <svg className="w-4 h-4 text-[#291409]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop Carousel (4 items grid) */}
          <div className="hidden lg:block overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {Array.from({ length: totalDesktopSlides }).map((_, slideIdx) => {
                const quad = newArrivals.slice(slideIdx * 4, slideIdx * 4 + 4);
                return (
                  <div key={slideIdx} className="w-full shrink-0 grid grid-cols-4 gap-6">
                    {quad.map((p) => (
                      <ProductCard key={p.id} product={p} variant="carousel" />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Carousel (2 items grid) */}
          <div className="lg:hidden overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {Array.from({ length: totalMobileSlides }).map((_, slideIdx) => {
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

      {/* Category Filter Pills (ALL, CLOTHING, SUNGLASSES) */}
      {mainFilter === 'new' && !searchQuery && (
        <>
          <div className="flex gap-2 sm:gap-3 justify-center flex-wrap mb-3 sm:mb-4">
            {(['all', 'clothing', 'sunglasses'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCatFilter(cat);
                  setClothingSubFilter('all');
                }}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-bold tracking-widest uppercase border transition-all ${
                  catFilter === cat
                    ? 'bg-[#291409] text-white border-[#291409] shadow-sm'
                    : 'bg-transparent text-[#555555] border-black/10 hover:border-[#291409]'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Clothing Sub-filters */}
          {(catFilter === 'all' || catFilter === 'clothing') && (
            <div className="flex gap-1.5 sm:gap-2 justify-center flex-wrap mb-6 sm:mb-8">
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
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase border transition-colors ${
                    clothingSubFilter === sub.id
                      ? 'bg-[#291409] text-white border-[#291409]'
                      : 'bg-transparent text-[#666666] border-black/10 hover:border-[#291409]'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Product Catalog Grid (Desktop: 4 columns, Tablet: 3 columns, Mobile: 2 columns) */}
      {mainFilter !== 'sale' && (
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs text-[#888888] uppercase tracking-wider font-semibold">
              Showing {filteredProducts.length} items
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#eeeeee]">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#888888]">
                No items match your criteria
              </p>
              <button
                onClick={() => {
                  setCatFilter('all');
                  setClothingSubFilter('all');
                  setPerfumeSubFilter('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-5 py-2 bg-[#291409] text-white text-xs font-semibold uppercase tracking-wider rounded"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
