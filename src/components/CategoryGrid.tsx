'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Specialty Coffee',
    categoryParam: 'Beverage',
    subParam: 'Coffee',
    itemCount: '15+ Pilihan Kopi',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    tag: 'Coffee & Espresso',
  },
  {
    title: 'Non-Coffee & Healthy Drink',
    categoryParam: 'Beverage',
    subParam: 'Non Coffee',
    itemCount: '40+ Minuman Segar',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop',
    tag: 'Matcha, Tea, Juice',
  },
  {
    title: 'Signature Food & Burger',
    categoryParam: 'Food',
    subParam: 'Signature Food',
    itemCount: '20+ Menu Andalan',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=800&auto=format&fit=crop',
    tag: 'Burger, Satay, Noodle',
  },
  {
    title: 'Main Course & Comfort Dining',
    categoryParam: 'Food',
    subParam: 'Main Course',
    itemCount: '30+ Hidangan Utama',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop',
    tag: 'Rice Bowl, Pasta, Curry',
  },
  {
    title: 'Snack, Pempek & Appetizer',
    categoryParam: 'Snack',
    subParam: 'Snack & Appetizer',
    itemCount: '23+ Pilihan Camilan',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
    tag: 'Pempek, Samosa, Risoles',
  },
  {
    title: 'Dessert & Bakery',
    categoryParam: 'Dessert',
    subParam: 'Dessert & Bakery',
    itemCount: '14+ Kue & Roti Sehat',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop',
    tag: 'Mousse, Tiramisu, Bun',
  },
  {
    title: 'Housemade Classe Gelato',
    categoryParam: 'Ice Cream',
    subParam: 'Ice Cream & Gelato',
    itemCount: '100% Nabati Creamy',
    image: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?q=80&w=800&auto=format&fit=crop',
    tag: 'Gelato Nabati',
  },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-ivory-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/10 text-forest-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            <span>Kategori Menu</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 tracking-tight">
            Jelajahi Berdasarkan Kategori
          </h2>
          <p className="text-sm sm:text-base text-charcoal-700 mt-3 font-light">
            Temukan makanan, minuman sehat, camilan gurih, hingga dessert lezat sesuai selera Anda.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Link
                href={`/menu?category=${encodeURIComponent(cat.categoryParam)}&sub=${encodeURIComponent(cat.subParam)}`}
                className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden block shadow-soft hover:shadow-lift transition-all border border-sage-200"
              >
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-transparent group-hover:from-forest-950/95 transition-all" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white">
                      {cat.tag}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-terracotta-500 group-hover:rotate-45 transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-terracotta-300 font-medium tracking-wide block mb-1">
                      {cat.itemCount}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug group-hover:text-terracotta-300 transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
