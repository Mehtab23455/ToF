'use client';

import { useState } from 'react';
import Image from 'next/image';
import { menuItems } from '@/lib/data';
import CategoryTabs from '@/components/CategoryTabs';
import FoodCard from '@/components/FoodCard';
import { QrCode } from 'lucide-react';

const categories = ['All', 'Rice', 'Grilled', 'Snacks', 'Drinks'];

export default function QRMenuPage() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? menuItems : menuItems.filter(i => i.category === active);

  return (
    <div className="max-w-md mx-auto px-3 py-6">
      {/* QR header badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-bold px-4 py-2 rounded-full mb-4">
          <QrCode size={14} />
          Quick Scan Menu
        </div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">🌍 Taste of Africa</h1>
        <p className="text-gray-500 text-sm">Canteen · Campus Building C</p>
      </div>

      {/* Category filter */}
      <div className="mb-5">
        <CategoryTabs categories={categories} active={active} onChange={setActive} />
      </div>

      {/* Food grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(item => (
          <FoodCard key={item.id} item={item} compact />
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-8 bg-amber-50 rounded-xl p-4 text-center border border-amber-100">
        <p className="text-amber-800 text-sm font-medium">
          📱 Pre-order via our full website to skip the queue!
        </p>
        <p className="text-amber-600 text-xs mt-1">tasteofafrica.campus</p>
      </div>
    </div>
  );
}
