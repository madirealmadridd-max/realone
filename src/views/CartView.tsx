import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice, parsePrice } from '../data/products';

export const CartView: React.FC = () => {
  const { cart, updateBagQty, removeFromBag, cartTotal, setCurrentView } = useShop();

  const items = Object.values(cart);
  const shipping = items.length > 0 ? 30 : 0;
  const grandTotal = cartTotal + shipping;

  return (
    <div className="pb-16 pt-2">
      <div className="text-center py-6 mb-4 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#888888] block mb-1">
          Review Your Order
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-[#291409] uppercase">
          Shopping Bag
        </h1>
        <p className="text-xs sm:text-sm text-[#888888] mt-1">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center text-[#888888] bg-white rounded-2xl border border-[#eeeeee] max-w-xl mx-auto">
          <svg className="w-16 h-16 mx-auto mb-4 text-[#cccccc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <p className="text-sm font-semibold text-[#291409]">Your shopping bag is empty.</p>
          <p className="text-xs text-[#888888] mt-1">Explore our latest drops and find your style.</p>
          <button
            onClick={() => setCurrentView('shop')}
            className="mt-6 px-8 py-3.5 bg-[#291409] text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-md hover:bg-[#3d1f0e] transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* Items list (Left 7-8 cols on desktop) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#eeeeee] divide-y divide-[#eeeeee] p-5 sm:p-6 shadow-sm">
            {items.map((item) => {
              const lineTotal = parsePrice(item.price) * item.qty;
              return (
                <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex gap-5 items-center">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl bg-[#f5f5f5] shrink-0"
                  />
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#291409] line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#888888] mt-1 font-medium">
                        Unit Price: {item.price}
                      </p>
                      {item.size && (
                        <p className="text-xs text-[#666666] mt-0.5">
                          <span className="font-semibold">Size:</span> {item.size}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#eeeeee] rounded-lg bg-[#fafafa]">
                        <button
                          onClick={() => updateBagQty(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#555555] hover:text-[#291409]"
                        >
                          −
                        </button>
                        <span className="text-xs font-bold min-w-[28px] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateBagQty(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#555555] hover:text-[#291409]"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right min-w-[80px]">
                        <p className="text-sm sm:text-base font-extrabold text-[#291409]">
                          {formatPrice(lineTotal)}
                        </p>
                        <button
                          onClick={() => removeFromBag(item.id)}
                          className="text-[11px] text-[#888888] hover:text-[#e53935] uppercase tracking-wider underline cursor-pointer mt-0.5"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals Summary (Right 4-5 cols on desktop, sticky) */}
          <div className="lg:col-span-4 mt-6 lg:mt-0 sticky top-28 space-y-4">
            <div className="bg-white rounded-2xl border border-[#eeeeee] p-6 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-[#888888] uppercase tracking-widest mb-3">
                Order Summary
              </h4>
              <div className="flex justify-between text-sm text-[#555555]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#291409]">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#555555]">
                <span>Standard Shipping (Morocco)</span>
                <span className="font-semibold text-[#291409]">{formatPrice(shipping)}</span>
              </div>
              <div className="border-t border-[#eeeeee] pt-3 mt-3 flex justify-between text-lg font-black text-[#291409]">
                <span>Estimated Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setCurrentView('checkout');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-4 bg-[#291409] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg hover:bg-[#3d1f0e] transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>

              <div className="pt-2 text-[11px] text-[#888888] space-y-1 text-center">
                <p>✓ Cash on Delivery &amp; Card Accepted</p>
                <p>✓ 100% Authentic Quality Guaranteed</p>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('shop')}
              className="w-full py-3.5 text-center border border-[#291409] text-[#291409] text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black/5 transition-colors"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
