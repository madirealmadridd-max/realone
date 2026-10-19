import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice, parsePrice } from '../data/products';

export const CheckoutView: React.FC = () => {
  const { cart, cartTotal, clearBag, setCurrentView } = useShop();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [country, setCountry] = useState('MA');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

  const [orderRef, setOrderRef] = useState<string | null>(null);

  const items = Object.values(cart);
  const shipping = items.length > 0 ? 30 : 0;
  const grandTotal = cartTotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const ref = 'WC-' + Date.now().toString(36).toUpperCase();
    setOrderRef(ref);
    clearBag();
  };

  return (
    <div className="pb-16 pt-2">
      <div className="text-center py-6 mb-4 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#888888] block mb-1">
          Final Step
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-[#291409] uppercase">
          Checkout
        </h1>
        <p className="text-xs sm:text-sm text-[#888888] mt-1">
          Door-to-door delivery across Morocco &amp; Worldwide
        </p>
      </div>

      {items.length === 0 && !orderRef ? (
        <div className="py-20 text-center text-[#888888] bg-white rounded-2xl border border-[#eeeeee] max-w-md mx-auto">
          <p className="text-sm font-semibold text-[#291409]">Your shopping bag is empty.</p>
          <button
            onClick={() => setCurrentView('shop')}
            className="mt-4 px-7 py-3 bg-[#291409] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow"
          >
            Return to Shop
          </button>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* Left Form (7 cols on desktop) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact */}
              <div className="bg-white rounded-2xl border border-[#eeeeee] p-6 shadow-sm space-y-4">
                <h2 className="text-xs font-bold text-[#888888] uppercase tracking-widest">
                  1. Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#555555] mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-xl focus:outline-none focus:border-[#291409] focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#555555] mb-1.5">Phone Number (WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      placeholder="06 12 34 56 78"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-xl focus:outline-none focus:border-[#291409] focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl border border-[#eeeeee] p-6 shadow-sm space-y-4">
                <h2 className="text-xs font-bold text-[#888888] uppercase tracking-widest">
                  2. Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#555555] mb-1.5">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-xl focus:outline-none focus:border-[#291409] focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#555555] mb-1.5">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Johnson"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-xl focus:outline-none focus:border-[#291409] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#555555] mb-1.5">Street Address &amp; Apartment / Villa</label>
                  <input
                    type="text"
                    required
                    placeholder="Boulevard d'Anfa, Res. Atlas, Apt 14"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-xl focus:outline-none focus:border-[#291409] focus:bg-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#555555] mb-1.5">City</label>
                    <input
                      type="text"
                      required
                      placeholder="Casablanca, Marrakech, Rabat..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-xl focus:outline-none focus:border-[#291409] focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#555555] mb-1.5">Postal Code</label>
                    <input
                      type="text"
                      required
                      placeholder="20000"
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-xl focus:outline-none focus:border-[#291409] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#555555] mb-1.5">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-xl focus:outline-none focus:border-[#291409] focus:bg-white transition-colors"
                  >
                    <option value="MA">Morocco (المغرب)</option>
                    <option value="FR">France</option>
                    <option value="ES">Spain</option>
                    <option value="DE">Germany</option>
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="AE">United Arab Emirates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#555555] mb-1.5">Delivery Notes (Optional)</label>
                  <textarea
                    placeholder="Gate code, landmark, or best delivery time..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-xl focus:outline-none focus:border-[#291409] focus:bg-white resize-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-[#eeeeee] p-6 shadow-sm space-y-4">
                <h2 className="text-xs font-bold text-[#888888] uppercase tracking-widest">
                  3. Payment Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-4 px-4 text-left rounded-xl border transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#291409] bg-[#291409]/5 ring-1 ring-[#291409]'
                        : 'border-[#eeeeee] bg-[#fafafa]'
                    }`}
                  >
                    <p className="text-xs font-bold text-[#291409] uppercase">Cash on Delivery</p>
                    <p className="text-[11px] text-[#666666] mt-1">Pay when parcel arrives at your door</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-4 px-4 text-left rounded-xl border transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#291409] bg-[#291409]/5 ring-1 ring-[#291409]'
                        : 'border-[#eeeeee] bg-[#fafafa]'
                    }`}
                  >
                    <p className="text-xs font-bold text-[#291409] uppercase">Credit / Debit Card</p>
                    <p className="text-[11px] text-[#666666] mt-1">Visa, Mastercard, CMI (256-bit encrypted)</p>
                  </button>
                </div>
              </div>

              {/* Desktop Place order trigger inside form */}
              <button
                type="submit"
                className="w-full py-4.5 bg-[#291409] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-xl hover:bg-[#3d1f0e] active:scale-98 transition-all"
              >
                Place Order • {formatPrice(grandTotal)}
              </button>
            </form>
          </div>

          {/* Right Summary (5 cols on desktop, sticky) */}
          <div className="lg:col-span-5 mt-8 lg:mt-0 sticky top-28 space-y-4">
            <div className="bg-white rounded-2xl border border-[#eeeeee] p-6 shadow-sm">
              <h2 className="text-xs font-bold text-[#888888] uppercase tracking-widest mb-4">
                Order Items ({items.length})
              </h2>

              <div className="divide-y divide-[#eeeeee] max-h-80 overflow-y-auto pr-1">
                {items.map((item) => {
                  const lineTotal = parsePrice(item.price) * item.qty;
                  return (
                    <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-12 h-14 object-cover rounded-lg bg-[#f5f5f5]"
                        />
                        <div>
                          <p className="font-bold text-[#291409] line-clamp-1">{item.name}</p>
                          <p className="text-[#888888]">
                            Qty: {item.qty} {item.size && `• Size ${item.size}`}
                          </p>
                        </div>
                      </div>
                      <span className="font-extrabold text-[#291409]">{formatPrice(lineTotal)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[#eeeeee] pt-4 mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#555555]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#291409]">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-[#555555]">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#291409]">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#291409] pt-3 border-t border-[#eeeeee]">
                  <span>Total Amount</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#faf8f6] rounded-xl border border-[#eeeeee] text-xs text-[#666666] space-y-1.5">
              <p className="font-bold text-[#291409]">WILD Security &amp; Delivery Guarantee</p>
              <p>• All orders are packed in protective luxury branded packaging.</p>
              <p>• You may inspect the package contents upon delivery.</p>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {orderRef && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center animate-in zoom-in-95 duration-300 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-[#291409] text-white flex items-center justify-center mx-auto mb-5 shadow-lg">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-[#291409]">Order Confirmed!</h2>
            <p className="text-sm text-[#666666] mt-2 leading-relaxed">
              Thank you for shopping with WILD CLOTHING. Your order has been registered and is being prepared for express delivery.
            </p>
            <div className="my-6 p-4 bg-[#f8f5f2] rounded-2xl border border-[#eeeeee]">
              <span className="text-[11px] uppercase tracking-widest text-[#888888] font-bold block mb-1">
                Order Tracking Reference
              </span>
              <span className="text-lg font-black text-[#291409] tracking-wider">{orderRef}</span>
            </div>
            <button
              onClick={() => {
                setOrderRef(null);
                setCurrentView('home');
              }}
              className="w-full py-4 bg-[#291409] text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#3d1f0e] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
