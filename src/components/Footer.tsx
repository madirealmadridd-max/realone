import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setCurrentView, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast('Subscribed to WILD VIP drops!');
    setNewsletterEmail('');
  };

  return (
    <footer className="w-full bg-[#1e0f07] text-[#e8e4df] pt-14 pb-20 lg:pb-12 mt-16 border-t border-[#331c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="space-y-4">
            <h3 className="text-lg font-black tracking-[2px] uppercase text-white">
              WILD CLOTHING
            </h3>
            <p className="text-xs leading-relaxed text-[#b5aba4] max-w-sm">
              Finest garments by authentic brands. Clothing, perfumes &amp; accessories curated for those who wear their identity with boldness.
            </p>
            <div className="pt-2 text-xs text-[#b5aba4] space-y-1">
              <p>📍 Casablanca &amp; Rabat, Morocco</p>
              <p>⚡ Fast Doorstep Dispatch Nationwide</p>
              <p>💵 Cash on Delivery Supported</p>
            </div>
          </div>

          {/* Collections Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white">
              Collections
            </h4>
            <ul className="text-xs space-y-2 text-[#b5aba4]">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('new-arrivals');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('clothing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Outerwear &amp; Jackets
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('clothing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hoodies &amp; Sweatshirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('perfumes-parfum-complet');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Parfum Complet
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('perfumes-french-avenue');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  French Avenue Fragrances
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('sunglasses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  UV400 Sunglasses
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white">
              Customer Support
            </h4>
            <ul className="text-xs space-y-2 text-[#b5aba4]">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('checkout');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Delivery &amp; Shipping Rates
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('cart');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shopping Bag &amp; Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('account');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Account &amp; VIP Membership
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('sale');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Private Sale Archive
                </button>
              </li>
              <li className="text-[#8e847e] pt-1">
                WhatsApp: +212 600 000 000
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white">
              Join The Wild Club
            </h4>
            <p className="text-xs text-[#b5aba4] leading-relaxed">
              Subscribe to unlock private drops, early archive access, and seasonal lookbooks.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-md text-xs text-white placeholder-white/40 focus:outline-none focus:border-white focus:bg-white/15"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-white text-[#291409] text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#e8e4df] transition-colors"
              >
                Join Private Drop List
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8e847e] gap-3">
          <p>© 2026 WILD CLOTHING. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Authentic Sourcing</span>
            <span>Secure Cash on Delivery</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
