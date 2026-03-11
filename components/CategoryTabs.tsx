'use client';

interface CategoryTabsProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

const categoryEmoji: Record<string, string> = {
  All: '🍽️',
  Rice: '🍚',
  Grilled: '🔥',
  Snacks: '🍿',
  Drinks: '🥤',
};

export default function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            active === cat
              ? 'bg-amber-600 text-white shadow-md scale-105'
              : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-700 border border-gray-200'
          }`}
        >
          <span>{categoryEmoji[cat] || '🍴'}</span>
          {cat}
        </button>
      ))}
    </div>
  );
}
