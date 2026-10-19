import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/products';

export const BagDrawer: React.FC = () => {
  const { isBagOpen, setIsBagOpen, cart, updateBagQty, removeFromBag, cartTotal, cartCount, setCurrentView } = useShop();

  if (!isBagOpen) return null;

  const items = Object.values(cart);

  const handleCheckout = () => {
    setIsBagOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCart = () => {
    setIsBagOpen(false);
    setCurrentView('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div
        onClick={() => setIsBagOpen(false)}
        className="fixed inset-0 bg-black/50 z-50 transition-opacity backdrop-blur-[2px]"
      />

      <aside className="fixed top-0 bottom-0 right-0 max-w-[360px] w-[90%] bg-[#FEFCFB] z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#eeeeee]">
          <span className="font-bold text-[16px] tracking-wide text-[#291409]">
            Your Bag ({cartCount})
          </span>
          <button
            onClick={() => setIsBagOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-2xl text-[#291409] hover:opacity-70 transition-opacity"
            aria-label="Close bag"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center py-16 text-center text-[#888888]">
              <svg className="w-14 h-14 mb-3 text-[#cccccc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-sm font-medium">Your bag is empty</p>
              <button
                onClick={() => {
                  setIsBagOpen(false);
                  setCurrentView('shop');
                }}
                className="mt-4 px-6 py-2.5 bg-[#291409] text-white text-xs font-semibold uppercase tracking-wider rounded-md"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#eeeeee]">
              {items.map((item) => (
                <div key={item.id} className="py-3.5 flex gap-3.5">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-[70px] h-[90px] object-cover rounded-md bg-[#f5f5f5] shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = '#eeeeee';
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-[13px] font-medium text-[#291409] line-clamp-2 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[13px] font-semibold text-[#291409] mt-1">
                        {item.price}
                      </p>
                      {item.size && (
                        <p className="text-[11px] text-[#888888] mt-0.5">Size: {item.size}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      <div className="flex items-center border border-[#eeeeee] rounded">
                        <button
                          onClick={() => updateBagQty(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-sm text-[#555555] hover:text-[#291409]"
                        >
                          −
                        </button>
                        <span className="text-xs font-semibold min-w-[20px] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateBagQty(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-sm text-[#555555] hover:text-[#291409]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromBag(item.id)}
                        className="text-[11px] text-[#888888] hover:text-[#e53935] uppercase tracking-wider underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#eeeeee] bg-[#FEFCFB] space-y-3">
            <div className="flex items-center justify-between text-base font-semibold text-[#291409]">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-[11px] text-[#888888]">Taxes and shipping calculated at checkout</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleViewCart}
                className="w-full py-3 text-center border border-[#291409] text-[#291409] rounded-md text-xs font-bold uppercase tracking-wider hover:bg-[#291409]/5 transition-colors"
              >
                View Cart
              </button>
              <button
                onClick={handleCheckout}
                className="w-full py-3 text-center bg-[#291409] text-[#FEFCFB] rounded-md text-xs font-bold uppercase tracking-wider hover:bg-[#3d1f0e] transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
