'use client';

import React from 'react';
import Link from 'next/link';
import { SIGNATURE_ITEMS } from '@/data/menu';
import { MenuCard } from './MenuCard';
import { ArrowRight } from 'lucide-react';

export const SignatureSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Organic Green Silk Wave Accents (Ref Images 2-5) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute -bottom-16 -left-16 w-[700px] opacity-20 text-emerald-600 mix-blend-multiply"
          viewBox="0 0 700 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0,700 C 150,550 300,400 400,250 C 500,100 600,0 650,-100 L 0,-100 Z"
            fill="url(#sig-emerald-wave)"
          />
          <defs>
            <linearGradient id="sig-emerald-wave" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0F291E" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#A7F3D0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-3">
              Pilihan Terfavorit
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F291E] tracking-tight">
              Signature & Best Seller
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal leading-relaxed">
              Hidangan plant-based istimewa yang paling digemari para pengunjung di Kapal, Bali. Dibuat fresh setiap hari dengan bahan alami tanpa MSG.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 font-bold text-sm sm:text-base text-emerald-700 hover:text-emerald-800 group transition-colors self-start md:self-end shrink-0"
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
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>Buka Seluruh Katalog Menu Lengkap</span>
            <ArrowRight className="w-4 h-4 text-emerald-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};
