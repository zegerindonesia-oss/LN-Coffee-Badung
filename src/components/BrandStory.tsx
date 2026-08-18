'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Heart, Coffee, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '@/data/business';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Editorial Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1200&auto=format&fit=crop"
                alt="Pengalaman Makan di LN Fortunate Coffee"
                fill
                className="object-cover"
              />
            </div>

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-emerald-800 text-white p-5 rounded-2xl shadow-xl border border-emerald-700 max-w-[230px]">
              <div className="flex items-center gap-2 text-emerald-200 mb-1.5">
                <Leaf className="w-5 h-5" />
                <span className="text-xs font-extrabold uppercase tracking-wider">Loving Nature</span>
              </div>
              <p className="text-xs text-emerald-100 font-normal leading-relaxed">
                Menghargai alam, menyajikan nutrisi nabati penuh kebaikan.
              </p>
            </div>
          </motion.div>

          {/* Story Narrative Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
              Cerita Kami
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F291E] tracking-tight leading-[1.2]">
              {BUSINESS_INFO.story.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {BUSINESS_INFO.story.paragraph1}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {BUSINESS_INFO.story.paragraph2}
            </p>

            {/* Story Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center mb-2.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#0F291E]">Tanpa MSG & Daging</h4>
                <p className="text-xs text-slate-600 mt-1">
                  100% bahan nabati berkualitas untuk kesehatan tubuh.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center mb-2.5">
                  <Coffee className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#0F291E]">Kopi & Oatmylk</h4>
                <p className="text-xs text-slate-600 mt-1">
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
