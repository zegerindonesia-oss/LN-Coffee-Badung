'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MapPin,
  Wind,
  Heart,
  Wifi,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Coffee,
  Cake,
} from 'lucide-react';
import { OpeningStatusBadge } from './OpeningStatusBadge';
import { BUSINESS_INFO } from '@/data/business';

interface HeroSlide {
  id: number;
  image: string;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  featuredDish: string;
  featuredCategory: string;
  dishPrice: string;
  dishLink: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=85&w=1920&auto=format&fit=crop',
    badge: 'Signature Plant-Based Feast',
    titlePrefix: 'Good Food, Good Coffee,',
    titleHighlight: 'Better Moments.',
    subtitle: 'Nikmati kelezatan Fortunate Burger, patty jamur juicy racikan resep rahasia dengan saus istimewa yang memanjakan lidah.',
    featuredDish: 'Fortunate Vegan Burger',
    featuredCategory: 'Signature Food',
    dishPrice: 'Rp 40.000',
    dishLink: '/menu?category=Food&sub=Signature%20Food',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=85&w=1920&auto=format&fit=crop',
    badge: 'Authentic Warm Noodles & Bowls',
    titlePrefix: 'Cita Rasa Otentik,',
    titleHighlight: '100% Nabati.',
    subtitle: 'Mie Pangsit Loving Nature & Mie Goli kuah aromatik segar, dibuat tanpa bahan pengawet dan 100% bebas MSG.',
    featuredDish: 'Mie Pangsit Loving Nature',
    featuredCategory: 'Comfort Food',
    dishPrice: 'Rp 38.000',
    dishLink: '/menu?category=Food',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=85&w=1920&auto=format&fit=crop',
    badge: 'Artisan Coffee & Botanical Drinks',
    titlePrefix: 'Seduhan Kopi Pilihan,',
    titleHighlight: 'Harmoni Alami.',
    subtitle: 'Manual brew V60 biji kopi lokal Kintamani dan racikan Joyful Latte dengan plant-based oatmylk yang lembut dan harum.',
    featuredDish: 'V60 Coffee & Joyful Latte',
    featuredCategory: 'Specialty Coffee',
    dishPrice: 'Rp 38.000',
    dishLink: '/menu?category=Beverage&sub=Coffee',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=85&w=1920&auto=format&fit=crop',
    badge: 'Sweet Indulgence & Gelato',
    titlePrefix: 'Dessert Lembut Sehat,',
    titleHighlight: 'Penuh Kebahagiaan.',
    subtitle: 'Klepon Mousse Cake khas Bali, Choco Ganache mewah, dan Housemade Classe Gelato murni tanpa susu sapi atau telur.',
    featuredDish: 'Klepon Mousse & Classe Gelato',
    featuredCategory: 'Dessert & Gelato',
    dishPrice: 'Rp 18.000 – Rp 25.000',
    dishLink: '/menu?category=Dessert',
  },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto slide every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-forest-950 text-white pt-24 pb-16 lg:py-24"
    >
      {/* Background Animated Cross-fade Slider with Ken-Burns Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative w-full h-full"
          >
            <Image
              src={slide.image}
              alt={slide.featuredDish}
              fill
              priority
              className="object-cover object-center opacity-45 brightness-75 contrast-110"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Vignette & Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/65 to-forest-950/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-forest-950/40 to-forest-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Typography & Slide Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow & Slide Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <motion.div
                key={`badge-${slide.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-500/20 border border-terracotta-500/30 text-terracotta-300 text-xs sm:text-sm font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
                <span>{slide.badge}</span>
              </motion.div>

              <span className="text-xs text-sage-300 hidden sm:inline-block font-medium">
                • Kapal, Mengwi, Bali
              </span>
            </div>

            {/* Main Headline */}
            <motion.h1
              key={`headline-${slide.id}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-3.5xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-5 min-h-[120px] sm:min-h-[140px] flex flex-col justify-center"
            >
              <span>{slide.titlePrefix}</span>
              <span className="italic font-normal text-terracotta-400 font-serif">
                {slide.titleHighlight}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              key={`sub-${slide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-ivory-100/90 leading-relaxed max-w-xl mb-7 font-light"
            >
              {slide.subtitle}
            </motion.p>

            {/* Appetizing Dish Highlight Pill */}
            <motion.div
              key={`dish-${slide.id}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="mb-8 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 inline-flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-terracotta-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Utensils className="w-4 h-4" />
              </div>
              <div className="text-left pr-2">
                <span className="text-[10px] text-sage-300 font-semibold uppercase tracking-wider block">
                  Menu Unggulan ({slide.featuredCategory})
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {slide.featuredDish} • <span className="text-terracotta-300 font-sans">{slide.dishPrice}</span>
                </span>
              </div>
              <Link
                href={slide.dishLink}
                className="px-3 py-1.5 rounded-lg bg-white text-forest-950 font-bold text-xs hover:bg-terracotta-500 hover:text-white transition-colors"
              >
                Pesan
              </Link>
            </motion.div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white font-semibold text-sm sm:text-base transition-all shadow-terracotta hover:shadow-xl hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Pesan Menu Sekarang</span>
              </Link>
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base transition-all backdrop-blur-sm hover:-translate-y-0.5"
              >
                <MapPin className="w-4 h-4 text-terracotta-400" />
                <span>Petunjuk Arah Google Maps</span>
              </a>
            </div>

            {/* Slider Navigation Buttons & Progress Dots */}
            <div className="mt-8 pt-4 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                  aria-label="Slide foto makanan sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                  aria-label="Slide foto makanan selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Indicator Pills */}
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === idx
                        ? 'w-7 bg-terracotta-400'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Pilih slide hidangan ${idx + 1}`}
                  />
                ))}
              </div>

              <span className="text-xs text-sage-300 font-mono">
                0{currentSlide + 1} / 0{HERO_SLIDES.length}
              </span>
            </div>
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
        className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-sage-400 text-xs z-10"
      >
        <span className="tracking-widest uppercase text-[10px]">Scroll ke menu</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-terracotta-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};
