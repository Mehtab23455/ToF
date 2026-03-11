'use client';

import { useState } from 'react';
import { User, Hash, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import Image from 'next/image';

export default function OrderForm() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', studentId: '', pickupTime: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const pickupTimes = ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00'];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.studentId.trim()) e.studentId = 'Student ID is required';
    if (!form.pickupTime) e.pickupTime = 'Please select a pickup time';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const id = 'ORD-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    setOrderId(id);
    setSubmitted(true);
    setLoading(false);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 mb-4">
          Your order <strong className="text-amber-700">{orderId}</strong> has been received.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-amber-800 font-medium">
            🍽️ Your order will be ready at the canteen counter by <strong>{form.pickupTime}</strong>
          </p>
        </div>
        <a href="/order-status" className="bg-amber-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-amber-700 transition-colors">
          Track Your Order →
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="font-bold text-xl text-gray-900 mb-6">Complete Your Pre-Order</h2>

      {/* Order summary */}
      <div className="bg-amber-50 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-sm text-gray-700 mb-3">Order Summary</h3>
        {items.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-2">No items in cart. <a href="/menu" className="text-amber-600 underline">Browse menu</a></p>
        ) : (
          <>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="32px" />
                  </div>
                  <span className="text-sm text-gray-700 flex-1 truncate">{item.name}</span>
                  <span className="text-xs text-gray-500">×{item.quantity}</span>
                  <span className="text-sm font-semibold text-amber-700">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-amber-200 mt-3 pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-amber-700">${totalPrice.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User size={14} className="inline mr-1" />Full Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Amara Diallo"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Hash size={14} className="inline mr-1" />Student ID
          </label>
          <input
            type="text"
            value={form.studentId}
            onChange={e => setForm({ ...form, studentId: e.target.value })}
            placeholder="e.g. STU-2024-0034"
            className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none ${errors.studentId ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.studentId && <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Clock size={14} className="inline mr-1" />Pickup Time
          </label>
          <select
            value={form.pickupTime}
            onChange={e => setForm({ ...form, pickupTime: e.target.value })}
            className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none ${errors.pickupTime ? 'border-red-400' : 'border-gray-200'}`}
          >
            <option value="">Choose a time...</option>
            {pickupTimes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.pickupTime && <p className="text-red-500 text-xs mt-1">{errors.pickupTime}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MessageSquare size={14} className="inline mr-1" />Notes (optional)
          </label>
          <textarea
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            placeholder="e.g. Extra spicy, no onions..."
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 outline-none resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={items.length === 0 || loading}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <><span className="animate-spin">⟳</span> Placing Order...</>
          ) : (
            <>Place Pre-Order · ${totalPrice.toFixed(2)}</>
          )}
        </button>
      </div>
    </div>
  );
}
