import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToBag, isInWishlist, toggleWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);

  if (!selectedProduct) return null;

  const wishlisted = isInWishlist(selectedProduct.id);
  const isClothing = selectedProduct.cat === 'clothing';
  const isPerfume = selectedProduct.cat === 'perfumes';

  const sizes = isClothing ? ['S', 'M', 'L', 'XL'] : isPerfume ? ['50ML', '100ML'] : ['Standard'];

  const handleAdd = () => {
    addToBag(selectedProduct, qty, selectedSize);
    setSelectedProduct(null);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity"
      />

      {/* Responsive Modal Container: Bottom sheet on mobile, centered modal card on tablet & desktop */}
      <div className="fixed inset-x-0 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-2xl lg:max-w-3xl bg-[#FEFCFB] z-50 rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl animate-in sm:zoom-in-95 duration-200">
        {/* Header / Close button */}
        <div className="sticky top-0 bg-[#FEFCFB]/95 backdrop-blur-sm z-10 px-6 py-3.5 flex items-center justify-between border-b border-[#eeeeee]">
          <span className="text-xs uppercase tracking-widest font-bold text-[#888888]">
            Product Details
          </span>
          <button
            onClick={() => setSelectedProduct(null)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xl text-[#291409] hover:bg-black/5 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Modal Body (2-column layout on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Left: Product Image */}
          <div className="relative aspect-[4/5] bg-[#f5f5f5] rounded-2xl overflow-hidden shadow-inner">
            <img
              src={selectedProduct.img}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90 transition-transform"
              aria-label="Toggle wishlist"
            >
              <svg
                className={`w-5 h-5 ${
                  wishlisted ? 'fill-[#e53935] stroke-[#e53935]' : 'fill-none stroke-[#291409]'
                }`}
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Right: Details & Purchase Module */}
          <div className="flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-[#291409]/10 text-[#291409] rounded-full">
                  {selectedProduct.sub || selectedProduct.cat}
                </span>
                {selectedProduct.isNew && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-[#291409] text-white rounded-full">
                    New In
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#291409] leading-tight">
                {selectedProduct.name}
              </h2>
              <p className="text-xl font-black text-[#291409] mt-2">
                {selectedProduct.price}
              </p>
            </div>

            {/* Size Selector */}
            <div>
              <label className="block text-xs font-bold text-[#555555] uppercase tracking-wider mb-2">
                Size / Variant
              </label>
              <div className="flex gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                      selectedSize === s
                        ? 'border-[#291409] bg-[#291409] text-white shadow-sm'
                        : 'border-[#eeeeee] bg-[#fafafa] text-[#291409] hover:border-[#291409]/40'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-bold text-[#555555] uppercase tracking-wider mb-2">
                Quantity
              </label>
              <div className="flex items-center border border-[#eeeeee] rounded-xl w-36 bg-[#fafafa]">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-base font-bold text-[#555555] hover:text-[#291409]"
                >
                  −
                </button>
                <span className="flex-1 text-center font-bold text-sm text-[#291409]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-base font-bold text-[#555555] hover:text-[#291409]"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={handleAdd}
                className="w-full py-4 bg-[#291409] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg hover:bg-[#3d1f0e] active:scale-98 transition-all"
              >
                Add to Bag • {selectedProduct.price}
              </button>
            </div>

            {/* Guarantees */}
            <div className="pt-4 border-t border-[#eeeeee] text-[11px] text-[#666666] space-y-1.5 leading-normal">
              <p>• 100% Guaranteed authentic merchandise.</p>
              <p>• Fast courier dispatch across Morocco with Cash on Delivery.</p>
              <p>• Size exchange available within 7 days of receipt.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
