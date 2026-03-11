'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, Utensils } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/preorder', label: 'Pre-Order' },
    { href: '/order-status', label: 'Track Order' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-amber-900 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <div className="bg-amber-400 rounded-full p-1.5">
              <Utensils size={18} className="text-amber-900" />
            </div>
            <span className="hidden sm:block font-serif">Taste of Africa</span>
            <span className="sm:hidden font-serif">ToA</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-amber-100 hover:text-amber-300 text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-white rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-white p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-amber-800 border-t border-amber-700">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-amber-100 hover:bg-amber-700 hover:text-white text-sm font-medium transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
