import Link from 'next/link';
import Image from 'next/image';
import { Star, ChevronRight, Smartphone, Clock, CheckCircle } from 'lucide-react';
import { menuItems, testimonials, dailySpecials } from '@/lib/data';
import FoodCard from '@/components/FoodCard';

export default function HomePage() {
  const popularItems = menuItems.filter(i => i.isPopular).slice(0, 4);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-pattern bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900orange-900 text-white relative overflow-hidden">
        {/* Decorative kente stripes */}
        <div className="absolute top-0 left-0 right-0 h-2 flex">
          {['bg-red-600', 'bg-amber-400', 'bg-green-600', 'bg-gray-900', 'bg-red-600', 'bg-amber-400', 'bg-green-600', 'bg-gray-900'].map((c, i) => (
            <div key={i} className={`flex-1 ${c}`} />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>

              <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-4 text-amber-900">
                African<br />
                <span className="text-amber-300">Canteen</span>
              </h1>
              <p className="text-amber-100 text-lg mb-8 leading-relaxed">
                Authentic African flavors on campus. Pre-order your meal, skip the queue,
                and enjoy home-cooked goodness between lectures.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/menu"
                  className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-8 py-3 rounded-xl transition-all hover:scale-105 shadow-lg"
                >
                  View Menu
                </Link>
                <Link
                  href="/preorder"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-amber-900 font-bold px-8 py-3 rounded-xl transition-all backdrop-blur-sm"
                >
                  Pre-Order Food
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10">
                {[
                  { value: '500+', label: 'Students Daily' },
                  { value: '15+', label: 'Menu Items' },
                  { value: '4.8★', label: 'Rating' },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-amber-300">{stat.value}</p>
                    <p className="text-amber-200 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image collage */}
            <div className="hidden md:grid grid-cols-2 gap-3">
              {popularItems.slice(0, 4).map((item, i) => (
                <div key={item.id} className={`relative rounded-2xl overflow-hidden shadow-xl ${i === 0 ? 'col-span-2 h-48' : 'h-36'}`}>
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="300px" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-xs font-semibold">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom kente */}
        <div className="absolute bottom-0 left-0 right-0 h-2 flex">
          {['bg-green-600', 'bg-amber-400', 'bg-red-600', 'bg-gray-900', 'bg-green-600', 'bg-amber-400', 'bg-red-600', 'bg-gray-900'].map((c, i) => (
            <div key={i} className={`flex-1 ${c}`} />
          ))}
        </div>
      </section>

      {/* ── Daily Specials ── */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          ✨ Today's Specials
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Chef special */}
          <div className="relative rounded-2xl overflow-hidden h-48 group">
            <Image src={dailySpecials.chefSpecial.image} alt={dailySpecials.chefSpecial.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="600px" />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-amber-900/30 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block">👨‍🍳 Chef's Special</span>
              <h3 className="text-white font-bold text-xl">{dailySpecials.chefSpecial.name}</h3>
              <p className="text-amber-200 text-sm">${dailySpecials.chefSpecial.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Discount item */}
          <div className="relative rounded-2xl overflow-hidden h-48 group">
            <Image src={dailySpecials.discountItem.image} alt={dailySpecials.discountItem.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="600px" />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="bg-green-400 text-green-900 text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block">🏷️ -{dailySpecials.discountItem.discount}% Today!</span>
              <h3 className="text-white font-bold text-xl">{dailySpecials.discountItem.name}</h3>
              <div className="flex items-center gap-2">
                <p className="text-green-200 text-sm font-bold">${(dailySpecials.discountItem.price * 0.8).toFixed(2)}</p>
                <p className="text-green-400 text-xs line-through">${dailySpecials.discountItem.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Popular dishes ── */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-gray-900">🔥 Most Popular</h2>
          <Link href="/menu" className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1">
            See all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularItems.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center text-gray-900 mb-2">How it works</h2>
          <p className="text-center text-gray-500 mb-10">Order in 3 easy steps and skip the queue</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: '📱',
                title: 'Browse the Menu',
                desc: 'Explore our full digital menu with categories, prices, and ratings from your phone.',
                color: 'bg-amber-50 border-amber-200',
              },
              {
                step: '02',
                icon: '🛒',
                title: 'Pre-Order & Pay',
                desc: 'Add items to your cart, choose your pickup time, and submit your pre-order.',
                color: 'bg-orange-50 border-orange-200',
              },
              {
                step: '03',
                icon: '🍽️',
                title: 'Pick Up & Enjoy',
                desc: 'Track your order status live. When it\'s ready, pick it up fresh at the counter!',
                color: 'bg-green-50 border-green-200',
              },
            ].map(item => (
              <div key={item.step} className={`${item.color} border-2 rounded-2xl p-6 text-center`}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-5xl font-bold text-gray-100 font-display mb-2">{item.step}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Smartphone size={24} />, title: 'Mobile First', desc: 'Optimized for phones — no app download needed.' },
            { icon: <Clock size={24} />, title: 'Save Time', desc: 'Pre-order up to 30 min ahead. No more waiting in queues.' },
            { icon: <CheckCircle size={24} />, title: 'Live Tracking', desc: 'Track your order from cooking to pickup in real time.' },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 flex gap-4">
              <div className="text-amber-600 flex-shrink-0">{f.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-amber-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-2">What students say</h2>
          <p className="text-amber-300 text-center mb-10">Loved by 500+ students every day</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="bg-amber-800/50 rounded-2xl p-6 border border-amber-700">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-amber-100 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">{t.name}</p>
                    <p className="text-amber-400 text-xs">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="bg-gradient-to-r from-amber-600 to-orange-500 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="font-display text-3xl font-bold mb-3">Ready to order?</h2>
          <p className="text-amber-100 mb-6">Skip the queue. Pre-order your next meal in under a minute.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/menu" className="bg-white text-amber-700 font-bold px-8 py-3 rounded-xl hover:bg-amber-50 transition-colors">
              Browse Menu
            </Link>
            <Link href="/preorder" className="border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
              Pre-Order Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
