'use client';

import { useState } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, ChefHat } from 'lucide-react';
import { mockOrders, menuItems } from '@/lib/data';
import { StatusBadge } from '@/components/OrderStatus';
import Image from 'next/image';
import { Order, OrderStatus } from '@/types';

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const activeOrders = orders.filter(o => o.status !== 'completed').length;

  const popularItems = menuItems.filter(i => i.isPopular).slice(0, 5);

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const statusFlow: Record<OrderStatus, OrderStatus | null> = {
    received: 'preparing',
    preparing: 'ready',
    ready: 'completed',
    completed: null,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Today's canteen overview — Demo mode</p>
        </div>
        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"></span>
          Live Demo
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Today's Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: <DollarSign size={20} />, color: 'bg-green-50 text-green-600 border-green-100' },
          { label: 'Total Orders', value: orders.length, icon: <ShoppingBag size={20} />, color: 'bg-blue-50 text-blue-600 border-blue-100' },
          { label: 'Active Orders', value: activeOrders, icon: <ChefHat size={20} />, color: 'bg-orange-50 text-orange-600 border-orange-100' },
          { label: 'Students Served', value: completedOrders * 2, icon: <Users size={20} />, color: 'bg-purple-50 text-purple-600 border-purple-100' },
        ].map(stat => (
          <div key={stat.label} className={`bg-white border rounded-2xl p-4 flex items-center gap-3 ${stat.color}`}>
            <div className={`p-2.5 rounded-xl ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="font-bold text-xl text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Today's Orders</h2>
          <div className="space-y-3">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-sm text-gray-900">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.studentName} · {order.studentId}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                <div className="text-xs text-gray-500 mb-3">
                  {order.items.map(i => `${i.name} ×${i.quantity}`).join(', ')}
                  {order.notes && <span className="text-amber-600"> · "{order.notes}"</span>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>⏰ Pickup: {order.pickupTime}</span>
                    <span className="font-semibold text-amber-700">${order.total.toFixed(2)}</span>
                  </div>
                  {statusFlow[order.status] && (
                    <button
                      onClick={() => updateStatus(order.id, statusFlow[order.status]!)}
                      className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                    >
                      Mark as {statusFlow[order.status]}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular dishes + Revenue */}
        <div className="space-y-6">
          <div>
            <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-amber-600" /> Popular Items
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
              {popularItems.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 w-4">{idx + 1}</span>
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-amber-700">{Math.floor(Math.random() * 20 + 10)} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue breakdown */}
          <div>
            <h2 className="font-bold text-lg text-gray-900 mb-4">Revenue by Category</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
              {[
                { cat: '🍚 Rice', pct: 40, amount: totalRevenue * 0.4 },
                { cat: '🔥 Grilled', pct: 30, amount: totalRevenue * 0.3 },
                { cat: '🥤 Drinks', pct: 20, amount: totalRevenue * 0.2 },
                { cat: '🍿 Snacks', pct: 10, amount: totalRevenue * 0.1 },
              ].map(r => (
                <div key={r.cat}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700 font-medium">{r.cat}</span>
                    <span className="text-amber-700 font-bold">${r.amount.toFixed(2)}</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full transition-all"
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
