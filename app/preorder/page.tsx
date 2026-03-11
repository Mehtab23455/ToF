'use client';

import { useCart } from '@/lib/cart-context';
import OrderForm from '@/components/OrderForm';
import FoodCard from '@/components/FoodCard';
import { menuItems } from '@/lib/data';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function PreOrderPage() {
  const { items, totalItems } = useCart();
  const suggestedItems = menuItems.filter(m => !items.find(i => i.id === m.id)).slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Pre-Order Food</h1>
        <p className="text-gray-500">Order ahead and pick up at the counter — no waiting!</p>
      </div>

      {totalItems === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="font-bold text-xl text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Add some items from the menu first</p>
          <Link href="/menu" className="bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition-colors">
            Browse Menu →
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OrderForm />
          </div>
          <div>
            <div className="bg-amber-50 rounded-2xl p-4">
              <h3 className="font-semibold text-sm text-amber-800 mb-3 flex items-center gap-2">
                <span>💡</span> Add more to your order?
              </h3>
              <div className="space-y-3">
                {suggestedItems.slice(0, 3).map(item => (
                  <FoodCard key={item.id} item={item} compact />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Show suggestions regardless */}
      {totalItems === 0 && suggestedItems.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-4">Popular right now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {suggestedItems.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
