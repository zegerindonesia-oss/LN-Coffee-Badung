'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Wind, Heart, Wifi, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '@/data/business';

export const DiningExperience: React.FC = () => {
  return (
    <section id="facilities" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Prominent Background Green Wave SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg
          className="absolute -bottom-20 -right-20 w-[750px] sm:w-[1000px] opacity-35 text-emerald-600 mix-blend-multiply"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 200,1000 C 400,750 600,900 1000,600 L 1000,1000 Z"
            fill="url(#dining-green-wave-1)"
          />
          <defs>
            <linearGradient id="dining-green-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F291E" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-emerald-100/60 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text & Green Facility Cards Grid */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-3">
                Fasilitas & Suasana
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F291E] tracking-tight leading-[1.15]">
                Suasana Nyaman Bernuansa Tropis Bali
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed font-normal">
                Nikmati waktu santai, kumpul keluarga, temu komunitas, atau sekadar bekerja dengan hidangan sehat di LN Fortunate Coffee Kapal Mengwi.
              </p>
            </div>

            {/* Forest Green Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {BUSINESS_INFO.facilities.map((fac, idx) => (
                <motion.div
                  key={fac.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className="p-6 rounded-[2rem] bg-gradient-to-br from-[#0F291E] via-emerald-900 to-[#0B2218] text-white border border-emerald-800/80 shadow-md hover:shadow-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center mb-3 shadow-inner">
                    {idx === 0 && <Wind className="w-5 h-5" />}
                    {idx === 1 && <Heart className="w-5 h-5" />}
                    {idx === 2 && <Wifi className="w-5 h-5" />}
                    {idx === 3 && <ShoppingBag className="w-5 h-5" />}
                    {idx >= 4 && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <h3 className="font-bold text-base text-white mb-1">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
                    {fac.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Large Stacked Imagery Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
                alt="Area Duduk Restoran LN Fortunate Coffee"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F291E]/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-700 text-[11px] font-extrabold tracking-wider uppercase backdrop-blur-md mb-2 inline-block shadow-md">
                  Kapal, Badung, Bali
                </span>
                <p className="text-xl sm:text-2xl font-extrabold">
                  Kenyamanan Bersantap yang Menenangkan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
