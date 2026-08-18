'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Prominent Background Green Silk Wave SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg
          className="absolute -top-20 -left-20 w-[700px] sm:w-[950px] opacity-35 text-emerald-600 mix-blend-multiply"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C300,150 500,400 800,250 C950,180 1000,300 1000,500 L0,500 Z"
            fill="url(#cat-green-wave-1)"
          />
          <defs>
            <linearGradient id="cat-green-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F291E" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-emerald-100/60 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            Kategori Menu
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F291E] tracking-tight">
            Jelajahi Berdasarkan Kategori
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal">
            Temukan makanan, minuman sehat, camilan gurih, hingga dessert lezat sesuai selera Anda.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
            >
              <Link
                href={`/menu?category=${encodeURIComponent(cat.categoryParam)}&sub=${encodeURIComponent(cat.subParam)}`}
                className="group relative h-64 sm:h-72 rounded-[2rem] overflow-hidden block shadow-md hover:shadow-xl transition-all border border-slate-200"
              >
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Green Wave Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent group-hover:from-emerald-950/95 transition-all" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                      {cat.tag}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-emerald-600 group-hover:rotate-45 transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-emerald-300 font-extrabold tracking-wide block mb-1">
                      {cat.itemCount}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold leading-snug group-hover:text-emerald-200 transition-colors">
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
