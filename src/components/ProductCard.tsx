import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'carousel' | 'compact';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'grid' }) => {
  const { isInWishlist, toggleWishlist, addToBag, setSelectedProduct } = useShop();
  const wishlisted = isInWishlist(product.id);

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md flex flex-col"
    >
      {/* Image container */}
      <div className="relative aspect-[10/13] bg-[#f5f5f5] overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLElement).style.backgroundColor = '#eeeeee';
          }}
        />

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm z-10 transition-transform active:scale-90"
          aria-label="Wishlist"
        >
          <svg
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-[#e53935] stroke-[#e53935]' : 'fill-none stroke-[#291409]'
            }`}
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick Add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToBag(product);
            }}
            className="w-full py-2 bg-[#291409] text-white text-[11px] font-semibold tracking-wider uppercase rounded shadow hover:bg-[#3d1f0e] active:scale-95 transition-transform cursor-pointer"
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-[13px] font-medium text-[#291409] line-clamp-1 leading-snug">
            {product.name}
          </h3>
          <p className="text-[12.5px] font-semibold text-[#888888] mt-1">
            {product.price}
          </p>
        </div>

        {/* Mobile quick add button if touched */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToBag(product);
          }}
          className="mt-2.5 w-full py-1.5 bg-[#291409] text-white text-[11px] font-semibold tracking-wider uppercase rounded sm:hidden active:scale-95 transition-transform"
        >
          + Bag
        </button>
      </div>
    </div>
  );
};
