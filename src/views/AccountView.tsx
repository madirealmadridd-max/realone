import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const AccountView: React.FC = () => {
  const { user, login, logout, setCurrentView, wishlist, cart } = useShop();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, fullName);
  };

  if (user.isLoggedIn) {
    return (
      <div className="pb-16 pt-4 max-w-2xl mx-auto">
        <div className="text-center py-6 mb-6 bg-white rounded-3xl border border-[#eeeeee] p-8 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#291409] text-white flex items-center justify-center mx-auto text-2xl font-bold uppercase mb-3 shadow-md">
            {user.name.charAt(0) || user.email.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold text-[#291409]">{user.name}</h1>
          <p className="text-xs text-[#888888] mt-1">{user.email}</p>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            onClick={() => setCurrentView('cart')}
            className="p-5 bg-white rounded-2xl border border-[#eeeeee] cursor-pointer hover:border-[#291409] transition-all shadow-sm group"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#888888] block mb-1 group-hover:text-[#291409]">
              Shopping Bag
            </span>
            <span className="text-2xl font-black text-[#291409]">
              {Object.keys(cart).length} Items
            </span>
          </div>
          <div
            onClick={() => setCurrentView('shop')}
            className="p-5 bg-white rounded-2xl border border-[#eeeeee] cursor-pointer hover:border-[#291409] transition-all shadow-sm group"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#888888] block mb-1 group-hover:text-[#291409]">
              Wishlist Saved
            </span>
            <span className="text-2xl font-black text-[#291409]">
              {wishlist.size} Items
            </span>
          </div>
        </div>

        {/* Account details */}
        <div className="bg-white rounded-2xl border border-[#eeeeee] p-6 space-y-4 mb-6 shadow-sm">
          <h2 className="text-xs font-bold text-[#888888] uppercase tracking-widest">
            Membership &amp; Shipping Preferences
          </h2>
          <div className="text-xs space-y-2 text-[#555555]">
            <p>• <strong>Member Tier:</strong> WILD VIP Member (Free Shipping &amp; Early Archive Access)</p>
            <p>• <strong>Country / Region:</strong> Morocco (MA)</p>
            <p>• <strong>Currency:</strong> Moroccan Dirham (DH)</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full py-4 border border-[#e53935] text-[#e53935] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#e53935]/5 transition-colors"
        >
          Sign Out of Account
        </button>
      </div>
    );
  }

  return (
    <div className="pb-16 pt-4 max-w-md mx-auto">
      <div className="text-center py-6 mb-4">
        <span className="text-xs font-bold uppercase tracking-[3px] text-[#888888] block mb-1">
          WILD VIP Portal
        </span>
        <h1 className="text-3xl font-black tracking-widest text-[#291409] uppercase">
          {isRegister ? 'Create Account' : 'Sign In'}
        </h1>
        <p className="text-xs text-[#888888] mt-1.5">
          {isRegister
            ? 'Join WILD CLOTHING for exclusive private drops & faster checkout'
            : 'Access your saved wishlist & recent orders'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#eeeeee] mb-6">
        <button
          onClick={() => setIsRegister(false)}
          className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-colors ${
            !isRegister ? 'border-b-2 border-[#291409] text-[#291409]' : 'text-[#888888]'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setIsRegister(true)}
          className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-colors ${
            isRegister ? 'border-b-2 border-[#291409] text-[#291409]' : 'text-[#888888]'
          }`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#eeeeee] p-6 sm:p-8 space-y-4 shadow-sm">
        {isRegister && (
          <div>
            <label className="block text-xs font-medium text-[#555555] mb-1.5">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Johnson"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-xl focus:outline-none focus:border-[#291409] focus:bg-white transition-colors"
            />
          </div>
        )}

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
          <label className="block text-xs font-medium text-[#555555] mb-1.5">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-xl focus:outline-none focus:border-[#291409] focus:bg-white transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#291409] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg hover:bg-[#3d1f0e] active:scale-98 transition-all"
        >
          {isRegister ? 'Create Account' : 'Sign In'}
        </button>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => login('guest@mywildclothing.com', 'Guest Shopper')}
            className="text-xs text-[#888888] hover:text-[#291409] underline font-medium"
          >
            Continue as Guest Shopper
          </button>
        </div>
      </form>
    </div>
  );
};
