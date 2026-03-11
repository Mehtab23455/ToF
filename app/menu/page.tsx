'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { menuItems } from '@/lib/data';
import FoodCard from '@/components/FoodCard';
import CategoryTabs from '@/components/CategoryTabs';

const categories = ['All', 'Rice', 'Grilled', 'Snacks', 'Drinks'];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-1">Digital Menu</h1>
        <p className="text-gray-500">Fresh, authentic African dishes served daily</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search dishes..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-400 outline-none"
        />
      </div>

      {/* Category tabs */}
      <div className="mb-6">
        <CategoryTabs categories={categories} active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">{filtered.length} items</p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🍽️</p>
          <p className="font-medium">No dishes found</p>
          <p className="text-sm">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
