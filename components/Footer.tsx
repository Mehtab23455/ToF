import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Utensils } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-amber-400 rounded-full p-1.5">
                <Utensils size={18} className="text-amber-900" />
              </div>
              <span className="font-serif text-xl font-bold text-white">Taste of Africa</span>
            </div>
            <p className="text-amber-300 text-sm leading-relaxed">
              Authentic African flavors served fresh daily on campus. 
              Bringing the warmth of home cooking to student life.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2 text-amber-300">
                <MapPin size={14} />
                <span>Student Union Building, Block C, University Campus</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <Phone size={14} />
                <span>+234 800 CANTEEN</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <Mail size={14} />
                <span>hello@tasteofafrica.campus</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <Clock size={14} />
                <span>Mon–Fri: 7am – 8pm | Sat: 8am – 5pm</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              {[
                { href: '/menu', label: 'Digital Menu' },
                { href: '/preorder', label: 'Pre-Order Food' },
                { href: '/order-status', label: 'Track My Order' },
                { href: '/qr-menu', label: 'QR Menu' },
                { href: '/admin', label: 'Admin Dashboard' },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="block text-amber-300 hover:text-amber-100 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-10 pt-6 text-center text-amber-500 text-xs">
          © 2024 Taste of Africa Canteen · Built to digitize campus dining experiences
        </div>
      </div>
    </footer>
  );
}
