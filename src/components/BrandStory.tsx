'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Heart, Coffee, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '@/data/business';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle organic background accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-sage-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Editorial Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card border border-sage-200/80 bg-ivory-200">
              <Image
                src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1200&auto=format&fit=crop"
                alt="Pengalaman Makan di LN Fortunate Coffee"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-forest-900 text-white p-5 rounded-2xl shadow-lift border border-forest-800 max-w-[220px]">
              <div className="flex items-center gap-2.5 text-terracotta-400 mb-1.5">
                <Leaf className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Loving Nature</span>
              </div>
              <p className="text-xs text-sage-200 font-light leading-relaxed">
                Menghargai alam, menyajikan nutrisi nabati penuh kebaikan.
              </p>
            </div>
          </motion.div>

          {/* Story Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/10 text-forest-900 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-terracotta-500" />
              <span>Cerita Kami</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 tracking-tight leading-[1.2]">
              {BUSINESS_INFO.story.title}
            </h2>

            <p className="text-base sm:text-lg text-charcoal-800 leading-relaxed font-light">
              {BUSINESS_INFO.story.paragraph1}
            </p>

            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
              {BUSINESS_INFO.story.paragraph2}
            </p>

            {/* Story Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-ivory-100/80 border border-ivory-200">
                <div className="w-9 h-9 rounded-xl bg-forest-900 text-terracotta-400 flex items-center justify-center mb-2.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-sm text-forest-950">Tanpa MSG & Daging</h4>
                <p className="text-xs text-charcoal-600 mt-1">
                  100% bahan nabati berkualitas untuk kesehatan tubuh.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-ivory-100/80 border border-ivory-200">
                <div className="w-9 h-9 rounded-xl bg-forest-900 text-terracotta-400 flex items-center justify-center mb-2.5">
                  <Coffee className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-sm text-forest-950">Kopi & Oatmylk</h4>
                <p className="text-xs text-charcoal-600 mt-1">
                  Kopi lokal dan racikan susu nabati yang creamy nikmat.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
