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
      <div className="text-center py-4 mb-2">
        <h1 className="text-2xl font-bold tracking-widest text-[#291409] uppercase">
          Shopping Bag
        </h1>
        <p className="text-xs text-[#888888] mt-1">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center text-[#888888]">
          <svg className="w-16 h-16 mx-auto mb-4 text-[#cccccc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <p className="text-sm font-medium">Your shopping bag is empty.</p>
          <button
            onClick={() => setCurrentView('shop')}
            className="mt-6 px-7 py-3 bg-[#291409] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow hover:bg-[#3d1f0e] transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Items list */}
          <div className="bg-white rounded-xl border border-[#eeeeee] divide-y divide-[#eeeeee] p-4">
            {items.map((item) => {
              const lineTotal = parsePrice(item.price) * item.qty;
              return (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg bg-[#f5f5f5] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-sm font-semibold text-[#291409] line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#888888] mt-1 font-medium">
                        Unit Price: {item.price}
                      </p>
                      {item.size && (
                        <p className="text-xs text-[#888888]">Size: {item.size}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#eeeeee] rounded-md bg-[#fafafa]">
                        <button
                          onClick={() => updateBagQty(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-sm font-bold text-[#555555] hover:text-[#291409]"
                        >
                          −
                        </button>
                        <span className="text-xs font-bold min-w-[24px] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateBagQty(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm font-bold text-[#555555] hover:text-[#291409]"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold text-[#291409]">
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

          {/* Totals Summary */}
          <div className="bg-white rounded-xl border border-[#eeeeee] p-4 space-y-2.5">
            <h4 className="text-xs font-bold text-[#888888] uppercase tracking-wider mb-2">
              Order Summary
            </h4>
            <div className="flex justify-between text-sm text-[#555555]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#291409]">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-[#555555]">
              <span>Standard Shipping</span>
              <span className="font-semibold text-[#291409]">{formatPrice(shipping)}</span>
            </div>
            <div className="border-t border-[#eeeeee] pt-2.5 mt-2 flex justify-between text-base font-extrabold text-[#291409]">
              <span>Estimated Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5">
            <button
              onClick={() => {
                setCurrentView('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-4 bg-[#291409] text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-md hover:bg-[#3d1f0e] transition-colors"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => setCurrentView('shop')}
              className="w-full py-3 text-center border border-[#291409] text-[#291409] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-black/5 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
