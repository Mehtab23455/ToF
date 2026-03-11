'use client';

import Image from 'next/image';
import { Plus, Star, Clock } from 'lucide-react';
import { MenuItem } from '@/types';
import { useCart } from '@/lib/cart-context';

interface FoodCardProps {
  item: MenuItem;
  compact?: boolean;
}

export default function FoodCard({ item, compact = false }: FoodCardProps) {
  const { addItem, items } = useCart();
  const inCart = items.find(i => i.id === item.id);

  const discountedPrice = item.discount
    ? item.price * (1 - item.discount / 100)
    : item.price;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: compact ? '140px' : '180px' }}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.isSpecial && (
            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              Chef's Special
            </span>
          )}
          {item.isPopular && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              Popular
            </span>
          )}
          {item.discount && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              -{item.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-bold text-gray-900 text-sm mb-0.5 truncate">{item.name}</h3>
        {!compact && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-2">{item.description}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
          <span className="flex items-center gap-1">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            {item.rating}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {item.prepTime}
          </span>
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-amber-700 text-base">${discountedPrice.toFixed(2)}</span>
            {item.discount && (
              <span className="text-gray-400 text-xs line-through ml-1">${item.price.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addItem(item)}
            className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
              inCart
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-amber-500 text-white hover:bg-amber-600 active:scale-95'
            }`}
          >
            <Plus size={12} />
            {inCart ? `In Cart (${inCart.quantity})` : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
