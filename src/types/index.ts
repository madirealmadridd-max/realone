export interface Product {
  id: number | string;
  name: string;
  price: string;
  cat: string;
  sub: string;
  img: string;
  link?: string;
  description?: string;
  isNew?: boolean;
  salePrice?: string;
}

export interface CartItem {
  id: number | string;
  name: string;
  price: string;
  img: string;
  qty: number;
  size?: string;
}

export type ViewType =
  | 'home'
  | 'shop'
  | 'clothing'
  | 'perfumes'
  | 'perfumes-parfum-complet'
  | 'perfumes-french-avenue'
  | 'sunglasses'
  | 'belts'
  | 'underwear'
  | 'sale'
  | 'new-arrivals'
  | 'cart'
  | 'checkout'
  | 'account';

export interface OrderInfo {
  ref: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal: string;
    country: string;
    notes?: string;
    paymentMethod: 'cod' | 'card';
  };
}
