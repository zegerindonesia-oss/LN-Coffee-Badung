'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Wind, Heart, Wifi, ArrowDown } from 'lucide-react';
import { OpeningStatusBadge } from './OpeningStatusBadge';
import { BUSINESS_INFO } from '@/data/business';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-forest-950 text-white pt-24 pb-16 lg:py-24">
      {/* Background Image with Cinematic Overlay and Slow Zoom */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=85&w=1920&auto=format&fit=crop"
            alt="LN Fortunate Coffee Kapal Bali Ambiance"
            fill
            priority
            className="object-cover object-center opacity-40 brightness-75 contrast-110"
          />
        </motion.div>
        {/* Subtle Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-forest-950/50 to-forest-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Typography Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-500/20 border border-terracotta-500/30 text-terracotta-300 text-xs sm:text-sm font-medium mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
              <span>Plant-Based Restaurant & Coffee in Kapal, Bali</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-3.5xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6"
            >
              Good Food, Good Coffee, <br className="hidden sm:inline" />
              <span className="italic font-normal text-terracotta-400 font-serif">Better Moments.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-ivory-100/90 leading-relaxed max-w-xl mb-8 font-light"
            >
              {BUSINESS_INFO.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white font-semibold text-sm sm:text-base transition-all shadow-terracotta hover:shadow-xl hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Order Menu</span>
              </Link>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base transition-all backdrop-blur-sm hover:-translate-y-0.5"
              >
                <MapPin className="w-4 h-4 text-terracotta-400" />
                <span>Get Directions</span>
              </a>
            </motion.div>

            {/* Mini Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-sage-200"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>100% Plant-Based & Non MSG</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-400" />
                <span>Harga Rp25rb – Rp50rb</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-300" />
                <span>150+ Pilihan Menu Lengkap</span>
              </div>
            </motion.div>
          </div>

          {/* Floating Information Glass Card Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl bg-forest-900/85 backdrop-blur-xl border border-forest-700/60 p-6 sm:p-8 shadow-2xl overflow-hidden group">
              {/* Decorative Subtle Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Status Header */}
              <div className="flex items-center justify-between pb-5 border-b border-forest-800 gap-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-sage-300 font-semibold">
                    Status Operasional WITA
                  </p>
                  <p className="font-serif text-lg font-bold text-white mt-0.5">
                    LN Fortunate Bali
                  </p>
                </div>
                <OpeningStatusBadge />
              </div>

              {/* Facility Pillars Grid */}
              <div className="grid grid-cols-2 gap-3.5 my-6">
                <div className="p-3 rounded-2xl bg-forest-950/60 border border-forest-800/80 flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-xl bg-sage-400/20 text-sage-300 flex items-center justify-center">
                    <Wind className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">Open-Air Seating</span>
                  <span className="text-[11px] text-sage-300 leading-tight">Area terbuka asri & sejuk</span>
                </div>

                <div className="p-3 rounded-2xl bg-forest-950/60 border border-forest-800/80 flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-xl bg-terracotta-500/20 text-terracotta-400 flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">Vegan Choices</span>
                  <span className="text-[11px] text-sage-300 leading-tight">100% tanpa telur & susu sapi</span>
                </div>

                <div className="p-3 rounded-2xl bg-forest-950/60 border border-forest-800/80 flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-xl bg-forest-700/40 text-sage-200 flex items-center justify-center">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">Free Wi-Fi</span>
                  <span className="text-[11px] text-sage-300 leading-tight">Cocok untuk santai & WFC</span>
                </div>

                <div className="p-3 rounded-2xl bg-forest-950/60 border border-forest-800/80 flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">WhatsApp Order</span>
                  <span className="text-[11px] text-sage-300 leading-tight">Pesan praktis langsung ke PIC</span>
                </div>
              </div>

              {/* Quick Hours Summary */}
              <div className="p-3.5 rounded-2xl bg-terracotta-900/30 border border-terracotta-800/50 flex items-center justify-between text-xs">
                <span className="text-sage-200 font-medium">Jam Buka: Sel–Min (Senin Libur)</span>
                <span className="font-semibold text-terracotta-300">11:00 – 20:30 WITA</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-sage-400 text-xs"
      >
        <span className="tracking-widest uppercase text-[10px]">Scroll ke bawah</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-terracotta-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};
