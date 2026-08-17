'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Wind, Heart, Wifi, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '@/data/business';

export const DiningExperience: React.FC = () => {
  return (
    <section id="facilities" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text & Features Grid */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/10 text-terracotta-700 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Fasilitas & Suasana</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 tracking-tight leading-[1.15]">
                Suasana Nyaman Bernuansa Tropis Bali
              </h2>
              <p className="text-sm sm:text-base text-charcoal-700 mt-4 leading-relaxed font-light">
                Nikmati waktu santai, kumpul keluarga, temu komunitas, atau sekadar bekerja dengan hidangan sehat di LN Fortunate Coffee Kapal Mengwi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {BUSINESS_INFO.facilities.map((fac, idx) => (
                <motion.div
                  key={fac.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-5 rounded-2xl bg-ivory-100/70 border border-sage-200/80 hover:border-terracotta-300 hover:shadow-soft transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-forest-900 text-terracotta-400 flex items-center justify-center mb-3">
                    {idx === 0 && <Wind className="w-5 h-5" />}
                    {idx === 1 && <Heart className="w-5 h-5" />}
                    {idx === 2 && <Wifi className="w-5 h-5" />}
                    {idx === 3 && <ShoppingBag className="w-5 h-5" />}
                    {idx >= 4 && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <h3 className="font-serif font-bold text-base text-forest-950 mb-1">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed font-light">
                    {fac.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Large Stacked Imagery Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card border border-sage-200 bg-ivory-200">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
                alt="Area Duduk Restoran LN Fortunate Coffee"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-forest-900/90 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md mb-2 inline-block">
                  Kapal, Badung, Bali
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold">
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
