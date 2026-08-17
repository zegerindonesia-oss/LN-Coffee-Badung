'use client';

import React from 'react';
import Link from 'next/link';
import { SIGNATURE_ITEMS } from '@/data/menu';
import { MenuCard } from './MenuCard';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const SignatureSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-ivory-100/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/10 text-terracotta-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Pilihan Terfavorit</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 tracking-tight">
              Signature & Best Seller
            </h2>
            <p className="text-sm sm:text-base text-charcoal-700 mt-3 font-light leading-relaxed">
              Hidangan plant-based istimewa yang paling digemari para pengunjung di Kapal, Bali. Dibuat fresh setiap hari dengan bahan alami tanpa MSG.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 font-semibold text-sm sm:text-base text-terracotta-600 hover:text-terracotta-700 group transition-colors self-start md:self-end shrink-0"
          >
            <span>Explore All Menu (150+)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {SIGNATURE_ITEMS.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>Buka Seluruh Katalog Menu Lengkap</span>
            <ArrowRight className="w-4 h-4 text-terracotta-400" />
          </Link>
        </div>
      </div>
    </section>
  );
};
