'use client';

import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-amber-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} />
            <h2 className="font-bold text-lg">Your Order</h2>
            {totalItems > 0 && (
              <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-amber-800 rounded-full p-1">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <ShoppingBag size={48} className="mb-3 opacity-30" />
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm mt-1">Add some delicious items!</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-amber-600 text-sm font-medium underline"
              >
                Browse Menu →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800 truncate">{item.name}</p>
                    <p className="text-amber-700 font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center"
                      >
                        <Plus size={10} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 mb-4">
              <span>Total</span>
              <span className="text-amber-700">${totalPrice.toFixed(2)}</span>
            </div>
            <Link
              href="/preorder"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-3 rounded-xl font-bold transition-colors"
            >
              Proceed to Pre-Order →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
