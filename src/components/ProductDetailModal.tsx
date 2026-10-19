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
      <div
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-x-0 bottom-0 max-w-[448px] mx-auto bg-[#FEFCFB] z-50 rounded-t-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 shadow-2xl pb-6">
        {/* Modal Handle & Close */}
        <div className="sticky top-0 bg-[#FEFCFB] z-10 px-4 py-3 flex items-center justify-between border-b border-[#eeeeee]">
          <div className="w-10 h-1 bg-[#dddddd] rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
          <span className="text-xs uppercase tracking-wider font-bold text-[#888888] mt-1">
            Product Details
          </span>
          <button
            onClick={() => setSelectedProduct(null)}
            className="w-8 h-8 flex items-center justify-center text-xl text-[#291409] hover:opacity-70 mt-1"
          >
            &times;
          </button>
        </div>

        {/* Product Media */}
        <div className="relative aspect-[4/5] bg-[#f5f5f5] overflow-hidden">
          <img
            src={selectedProduct.img}
            alt={selectedProduct.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => toggleWishlist(selectedProduct.id)}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90 transition-transform"
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

        {/* Content Details */}
        <div className="p-5 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#291409]/10 text-[#291409] rounded">
                {selectedProduct.sub || selectedProduct.cat}
              </span>
              {selectedProduct.isNew && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#291409] text-white rounded">
                  New
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-[#291409] leading-tight">
              {selectedProduct.name}
            </h2>
            <p className="text-base font-extrabold text-[#291409] mt-1">
              {selectedProduct.price}
            </p>
          </div>

          {/* Size Selector */}
          <div>
            <label className="block text-xs font-bold text-[#555555] uppercase tracking-wider mb-2">
              Select Size
            </label>
            <div className="flex gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`flex-1 py-2 text-xs font-semibold rounded border transition-colors ${
                    selectedSize === s
                      ? 'border-[#291409] bg-[#291409] text-white'
                      : 'border-[#eeeeee] bg-[#fafafa] text-[#291409] hover:border-[#291409]/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="block text-xs font-bold text-[#555555] uppercase tracking-wider mb-2">
              Quantity
            </label>
            <div className="flex items-center border border-[#eeeeee] rounded-lg w-32 bg-[#fafafa]">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-base font-bold text-[#555555] hover:text-[#291409]"
              >
                −
              </button>
              <span className="flex-1 text-center font-bold text-sm text-[#291409]">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-base font-bold text-[#555555] hover:text-[#291409]"
              >
                +
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 py-3.5 bg-[#291409] text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-md hover:bg-[#3d1f0e] active:scale-98 transition-all"
            >
              Add to Bag • {selectedProduct.price}
            </button>
          </div>

          {/* Features / Description */}
          <div className="pt-4 border-t border-[#eeeeee] text-xs text-[#666666] space-y-2">
            <p>
              • 100% Authentic product curated by WILD CLOTHING.
            </p>
            <p>
              • Fast dispatch with door-to-door delivery across Morocco &amp; worldwide.
            </p>
            <p>
              • Cash on Delivery or Secure Credit Card payment accepted.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
