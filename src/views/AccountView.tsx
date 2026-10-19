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
      <div className="pb-16 pt-2">
        <div className="text-center py-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-[#291409] text-white flex items-center justify-center mx-auto text-xl font-bold uppercase mb-2">
            {user.name.charAt(0) || user.email.charAt(0)}
          </div>
          <h1 className="text-xl font-bold text-[#291409]">{user.name}</h1>
          <p className="text-xs text-[#888888]">{user.email}</p>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div
            onClick={() => setCurrentView('cart')}
            className="p-4 bg-white rounded-xl border border-[#eeeeee] cursor-pointer hover:border-[#291409] transition-colors"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">Bag</span>
            <span className="text-lg font-extrabold text-[#291409]">
              {Object.keys(cart).length} Items
            </span>
          </div>
          <div
            onClick={() => setCurrentView('shop')}
            className="p-4 bg-white rounded-xl border border-[#eeeeee] cursor-pointer hover:border-[#291409] transition-colors"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#888888] block">Wishlist</span>
            <span className="text-lg font-extrabold text-[#291409]">
              {wishlist.size} Saved
            </span>
          </div>
        </div>

        {/* Account details */}
        <div className="bg-white rounded-xl border border-[#eeeeee] p-5 space-y-4 mb-6">
          <h2 className="text-xs font-bold text-[#888888] uppercase tracking-wider">
            Membership &amp; Shipping
          </h2>
          <div className="text-xs space-y-2 text-[#555555]">
            <p>• <strong>Member Status:</strong> WILD VIP Member</p>
            <p>• <strong>Country / Region:</strong> Morocco (MA)</p>
            <p>• <strong>Preferred Currency:</strong> Moroccan Dirham (DH)</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full py-3.5 border border-[#e53935] text-[#e53935] text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#e53935]/5 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="pb-16 pt-2">
      <div className="text-center py-4 mb-2">
        <h1 className="text-2xl font-bold tracking-widest text-[#291409] uppercase">
          {isRegister ? 'Create Account' : 'Sign In'}
        </h1>
        <p className="text-xs text-[#888888] mt-1">
          {isRegister
            ? 'Join WILD CLOTHING for exclusive private drops'
            : 'Access your saved wishlist & order history'}
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

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#eeeeee] p-5 space-y-4">
        {isRegister && (
          <div>
            <label className="block text-xs font-medium text-[#555555] mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Johnson"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-lg focus:outline-none focus:border-[#291409] focus:bg-white"
            />
          </div>
        )}

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
          <label className="block text-xs font-medium text-[#555555] mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-[#fafafa] border border-[#eeeeee] rounded-lg focus:outline-none focus:border-[#291409] focus:bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#291409] text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-md hover:bg-[#3d1f0e] active:scale-98 transition-all"
        >
          {isRegister ? 'Create Account' : 'Sign In'}
        </button>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => login('guest@mywildclothing.com', 'Guest Shopper')}
            className="text-xs text-[#888888] hover:text-[#291409] underline"
          >
            Continue as Guest Shopper
          </button>
        </div>
      </form>
    </div>
  );
};
