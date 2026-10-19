import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ViewType } from '../types';
import { PRODUCTS, parsePrice } from '../data/products';

interface UserProfile {
  isLoggedIn: boolean;
  email: string;
  name: string;
}

interface ShopContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  cart: Record<string, CartItem>;
  wishlist: Set<string>;
  addToBag: (itemOrId: Product | string | number, qty?: number, size?: string) => void;
  updateBagQty: (id: string | number, delta: number) => void;
  removeFromBag: (id: string | number) => void;
  clearBag: () => void;
  toggleWishlist: (id: string | number) => void;
  removeFromWishlist: (id: string | number) => void;
  isInWishlist: (id: string | number) => boolean;
  cartCount: number;
  cartTotal: number;
  wishCount: number;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  isWishOpen: boolean;
  setIsWishOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  user: UserProfile;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isWishOpen, setIsWishOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize Bag from localStorage
  const [cart, setCart] = useState<Record<string, CartItem>>(() => {
    try {
      const saved = localStorage.getItem('mwBag');
      if (!saved) return {};
      const parsed = JSON.parse(saved);
      // Ensure compatibility if array was saved previously
      if (Array.isArray(parsed)) {
        const map: Record<string, CartItem> = {};
        parsed.forEach((it: any) => {
          if (it && it.id) {
            map[String(it.id)] = it;
          }
        });
        return map;
      }
      return parsed;
    } catch {
      return {};
    }
  });

  // Initialize Wishlist from localStorage
  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('mwWishlist');
      if (!saved) return new Set<string>();
      return new Set<string>(JSON.parse(saved));
    } catch {
      return new Set<string>();
    }
  });

  // Initialize User
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('mwUser');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { isLoggedIn: false, email: '', name: '' };
  });

  // Persist Bag
  useEffect(() => {
    try {
      localStorage.setItem('mwBag', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist Wishlist
  useEffect(() => {
    try {
      localStorage.setItem('mwWishlist', JSON.stringify(Array.from(wishlist)));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Persist User
  useEffect(() => {
    try {
      localStorage.setItem('mwUser', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2000);
  };

  const addToBag = (itemOrId: Product | string | number, qty: number = 1, size?: string) => {
    let p: Product | undefined;
    if (typeof itemOrId === 'object' && itemOrId !== null) {
      p = itemOrId;
    } else {
      const idStr = String(itemOrId);
      p = PRODUCTS.find((x) => String(x.id) === idStr);
    }

    if (!p) return;
    const strId = String(p.id);

    setCart((prev) => {
      const existing = prev[strId];
      if (existing) {
        return {
          ...prev,
          [strId]: {
            ...existing,
            qty: existing.qty + qty,
            size: size || existing.size,
          },
        };
      } else {
        return {
          ...prev,
          [strId]: {
            id: p!.id,
            name: p!.name,
            price: p!.price,
            img: p!.img,
            qty,
            size: size || 'M',
          },
        };
      }
    });

    showToast('Added to bag!');
  };

  const updateBagQty = (id: string | number, delta: number) => {
    const strId = String(id);
    setCart((prev) => {
      const item = prev[strId];
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        const next = { ...prev };
        delete next[strId];
        return next;
      }
      return {
        ...prev,
        [strId]: {
          ...item,
          qty: newQty,
        },
      };
    });
  };

  const removeFromBag = (id: string | number) => {
    const strId = String(id);
    setCart((prev) => {
      const next = { ...prev };
      delete next[strId];
      return next;
    });
  };

  const clearBag = () => {
    setCart({});
  };

  const toggleWishlist = (id: string | number) => {
    const strId = String(id);
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(strId)) {
        next.delete(strId);
        showToast('Removed from wishlist');
      } else {
        next.add(strId);
        showToast('Added to wishlist!');
      }
      return next;
    });
  };

  const removeFromWishlist = (id: string | number) => {
    const strId = String(id);
    setWishlist((prev) => {
      const next = new Set(prev);
      next.delete(strId);
      return next;
    });
  };

  const isInWishlist = (id: string | number) => {
    return wishlist.has(String(id));
  };

  const cartCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = Object.values(cart).reduce((sum, item) => sum + parsePrice(item.price) * item.qty, 0);
  const wishCount = wishlist.size;

  const login = (email: string, name: string = '') => {
    setUser({
      isLoggedIn: true,
      email,
      name: name || email.split('@')[0],
    });
    showToast('Logged in successfully!');
  };

  const logout = () => {
    setUser({ isLoggedIn: false, email: '', name: '' });
    showToast('Signed out');
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        cart,
        wishlist,
        addToBag,
        updateBagQty,
        removeFromBag,
        clearBag,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        cartCount,
        cartTotal,
        wishCount,
        isMenuOpen,
        setIsMenuOpen,
        isBagOpen,
        setIsBagOpen,
        isWishOpen,
        setIsWishOpen,
        selectedProduct,
        setSelectedProduct,
        toastMessage,
        showToast,
        user,
        login,
        logout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
};
