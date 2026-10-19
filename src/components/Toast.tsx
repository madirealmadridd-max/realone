import React from 'react';
import { useShop } from '../context/ShopContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#291409] text-[#FEFCFB] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
      {toastMessage}
    </div>
  );
};
