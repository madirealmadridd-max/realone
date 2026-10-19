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
      <div className="text-center py-3 mb-2">
        <h1 className="text-2xl font-bold tracking-widest text-[#291409] uppercase">
          Checkout
        </h1>
        <p className="text-xs text-[#888888] mt-0.5">
          Complete your order
        </p>
      </div>

      {items.length === 0 && !orderRef ? (
        <div className="py-16 text-center text-[#888888]">
          <p className="text-sm font-medium">Your shopping bag is empty.</p>
          <button
            onClick={() => setCurrentView('shop')}
            className="mt-4 px-6 py-2.5 bg-[#291409] text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
          >
            Return to Shop
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Order Summary Box */}
          <div className="bg-white rounded-xl border border-[#eeeeee] p-4">
            <h2 className="text-xs font-bold text-[#888888] uppercase tracking-wider mb-3">
              Order Summary
            </h2>
            <div className="divide-y divide-[#eeeeee] max-h-56 overflow-y-auto">
              {items.map((item) => {
                const lineTotal = parsePrice(item.price) * item.qty;
                return (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-10 h-12 object-cover rounded bg-[#f5f5f5]"
                      />
                      <div>
                        <p className="font-semibold text-[#291409] line-clamp-1">{item.name}</p>
                        <p className="text-[#888888]">
                          Qty: {item.qty} {item.size && `• Size ${item.size}`}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#291409]">{formatPrice(lineTotal)}</span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-[#eeeeee] pt-3 mt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#555555]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#291409]">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-[#555555]">
                <span>Shipping</span>
                <span className="font-semibold text-[#291409]">{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#291409] pt-2 border-t border-dashed border-[#eeeeee]">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contact */}
            <div className="bg-white rounded-xl border border-[#eeeeee] p-4 space-y-3">
              <h2 className="text-xs font-bold text-[#888888] uppercase tracking-wider">
                Contact Information
              </h2>
              <div>
                <label className="block text-xs font-medium text-[#555555] mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-lg focus:outline-none focus:border-[#291409] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#555555] mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="06 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-lg focus:outline-none focus:border-[#291409] focus:bg-white"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl border border-[#eeeeee] p-4 space-y-3">
              <h2 className="text-xs font-bold text-[#888888] uppercase tracking-wider">
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#555555] mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-lg focus:outline-none focus:border-[#291409] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#555555] mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-lg focus:outline-none focus:border-[#291409] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#555555] mb-1">Address</label>
                <input
                  type="text"
                  required
                  placeholder="Street, residence, apartment"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-lg focus:outline-none focus:border-[#291409] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#555555] mb-1">City</label>
                  <input
                    type="text"
                    required
                    placeholder="Casablanca, Rabat, etc."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-lg focus:outline-none focus:border-[#291409] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#555555] mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    placeholder="20000"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-lg focus:outline-none focus:border-[#291409] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#555555] mb-1">Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-lg focus:outline-none focus:border-[#291409] focus:bg-white"
                >
                  <option value="MA">Morocco</option>
                  <option value="FR">France</option>
                  <option value="ES">Spain</option>
                  <option value="DE">Germany</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="AE">United Arab Emirates</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#555555] mb-1">Order Notes (optional)</label>
                <textarea
                  placeholder="Delivery instructions or gate code..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-lg focus:outline-none focus:border-[#291409] focus:bg-white resize-none"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-xl border border-[#eeeeee] p-4 space-y-3">
              <h2 className="text-xs font-bold text-[#888888] uppercase tracking-wider">
                Payment Method
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`py-3 px-3 text-center rounded-lg text-xs font-semibold border transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#291409] bg-[#291409]/5 text-[#291409] shadow-sm font-bold ring-1 ring-[#291409]'
                      : 'border-[#eeeeee] bg-[#fafafa] text-[#555555]'
                  }`}
                >
                  Cash on Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-3 px-3 text-center rounded-lg text-xs font-semibold border transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#291409] bg-[#291409]/5 text-[#291409] shadow-sm font-bold ring-1 ring-[#291409]'
                      : 'border-[#eeeeee] bg-[#fafafa] text-[#555555]'
                  }`}
                >
                  Credit Card
                </button>
              </div>
              <p className="text-[11px] text-[#888888] pt-1">
                {paymentMethod === 'cod'
                  ? 'Pay in cash directly upon parcel delivery to your doorstep.'
                  : 'Encrypted 256-bit secure payment processing.'}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#291409] text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg hover:bg-[#3d1f0e] active:scale-98 transition-all"
            >
              Place Order • {formatPrice(grandTotal)}
            </button>
            <p className="text-[10px] text-[#888888] text-center leading-relaxed">
              By placing your order, you agree to WILD CLOTHING’s terms of service and shipping policies.
            </p>
          </form>
        </div>
      )}

      {/* Confirmation Modal */}
      {orderRef && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-300 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#291409] text-white flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#291409]">Order Placed!</h2>
            <p className="text-xs text-[#666666] mt-2 leading-relaxed">
              Thank you for shopping with WILD CLOTHING. We have received your order and are preparing it for shipment.
            </p>
            <div className="my-4 p-3 bg-[#fafafa] rounded-lg border border-[#eeeeee]">
              <span className="text-[11px] uppercase tracking-wider text-[#888888] block">Order Reference</span>
              <span className="text-sm font-bold text-[#291409] tracking-wider">{orderRef}</span>
            </div>
            <button
              onClick={() => {
                setOrderRef(null);
                setCurrentView('home');
              }}
              className="w-full py-3.5 bg-[#291409] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#3d1f0e] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
