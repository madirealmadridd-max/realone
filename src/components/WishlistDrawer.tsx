import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const { isWishOpen, setIsWishOpen, wishlist, removeFromWishlist, addToBag, wishCount, setCurrentView } = useShop();

  if (!isWishOpen) return null;

  const wishlistedItems = PRODUCTS.filter((p) => wishlist.has(String(p.id)));

  return (
    <>
      <div
        onClick={() => setIsWishOpen(false)}
        className="fixed inset-0 bg-black/50 z-50 transition-opacity backdrop-blur-[2px]"
      />

      <aside className="fixed top-0 bottom-0 right-0 max-w-[360px] w-[90%] bg-[#FEFCFB] z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#eeeeee]">
          <span className="font-bold text-[16px] tracking-wide text-[#291409]">
            Wishlist ({wishCount})
          </span>
          <button
            onClick={() => setIsWishOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-2xl text-[#291409] hover:opacity-70 transition-opacity"
            aria-label="Close wishlist"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {wishlistedItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center py-16 text-center text-[#888888]">
              <svg className="w-14 h-14 mb-3 text-[#cccccc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <p className="text-sm font-medium">Your wishlist is empty</p>
              <button
                onClick={() => {
                  setIsWishOpen(false);
                  setCurrentView('shop');
                }}
                className="mt-4 px-6 py-2.5 bg-[#291409] text-white text-xs font-semibold uppercase tracking-wider rounded-md"
              >
                Explore Collections
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#eeeeee]">
              {wishlistedItems.map((item) => (
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
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      <button
                        onClick={() => addToBag(item)}
                        className="text-[12px] font-semibold text-[#291409] hover:underline"
                      >
                        + Add to Bag
                      </button>

                      <button
                        onClick={() => removeFromWishlist(item.id)}
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
      </aside>
    </>
  );
};
