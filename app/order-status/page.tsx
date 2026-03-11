'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { mockOrders } from '@/lib/data';
import OrderStatus from '@/components/OrderStatus';
import Image from 'next/image';

export default function OrderStatusPage() {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  const foundOrder = mockOrders.find(
    o => o.id.toLowerCase() === query.toLowerCase() ||
         o.studentId.toLowerCase() === query.toLowerCase()
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Track Your Order</h1>
        <p className="text-gray-500">Enter your Order ID or Student ID to check status</p>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && setSearched(true)}
            placeholder="e.g. ORD-001 or STU-2024-0034"
            className="w-full pl-9 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-400 outline-none"
          />
        </div>
        <button
          onClick={() => setSearched(true)}
          className="bg-amber-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-amber-700 transition-colors"
        >
          Track
        </button>
      </div>

      {/* Results */}
      {searched && (
        foundOrder ? (
          <div className="space-y-6">
            <OrderStatus status={foundOrder.status} orderId={foundOrder.id} pickupTime={foundOrder.pickupTime} />

            {/* Order items */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Items Ordered</h3>
              <div className="space-y-3">
                {foundOrder.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400">×{item.quantity}</p>
                    </div>
                    <span className="font-semibold text-sm text-amber-700">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                <span>Total Paid</span>
                <span className="text-amber-700">${foundOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {foundOrder.notes && (
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <p className="text-sm text-amber-800"><strong>Special notes:</strong> {foundOrder.notes}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-bold text-gray-700">Order not found</p>
            <p className="text-sm text-gray-400 mt-1">Check your Order ID or Student ID</p>
          </div>
        )
      )}

      {/* Demo hint */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-sm text-blue-700 font-medium mb-2">📋 Demo Order IDs to try:</p>
        <div className="flex flex-wrap gap-2">
          {mockOrders.map(o => (
            <button
              key={o.id}
              onClick={() => { setQuery(o.id); setSearched(true); }}
              className="text-xs bg-white border border-blue-200 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
            >
              {o.id} ({o.status})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
