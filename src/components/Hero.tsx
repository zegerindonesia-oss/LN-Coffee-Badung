'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Plus,
  Check,
  Star,
  Clock,
  MapPin,
  Utensils,
  Coffee,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { SIGNATURE_ITEMS } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import { formatRupiah } from '@/lib/currency';
import { OpeningStatusBadge } from './OpeningStatusBadge';

export const Hero: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { addToCart, setIsCartOpen, setQuickViewItem } = useCart();
  const [addedItemMap, setAddedItemMap] = useState<Record<number, boolean>>({});

  // Auto slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SIGNATURE_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeItem = SIGNATURE_ITEMS[currentIdx] || SIGNATURE_ITEMS[0];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? SIGNATURE_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % SIGNATURE_ITEMS.length);
  };

  const handleAddToCart = (e: React.MouseEvent, item: typeof activeItem) => {
    e.stopPropagation();
    addToCart(item, 1);
    setAddedItemMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#06160e] via-[#0b2417] to-[#081a10] text-white pt-24 pb-12 lg:py-20"
    >
      {/* Dynamic Ambient Glass Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-lime-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Interactive Controls */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            {/* Top Badge & Operating Hours */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-semibold shadow-inner"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>⭐ Signature Menu Headline</span>
              </motion.div>
              <OpeningStatusBadge />
            </div>

            {/* Main Headline with Smooth Slide Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-4">
                  Taste the Best that <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-white bg-clip-text text-transparent italic">
                    Surprises You
                  </span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-sage-100/90 leading-relaxed font-light max-w-xl mb-6">
                  {activeItem.ingredients ||
                    'Sajian gourmet plant-based khas LN Fortunate Coffee Bali. Diolah dari bahan nabati alami pilihan tanpa pengawet dan tanpa MSG.'}
                </p>

                {/* Active Item Highlight Box */}
                <div className="mb-7 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-between gap-4 max-w-lg">
                  <div>
                    <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-bold block">
                      {activeItem.subCategory} • {activeItem.size}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white line-clamp-1">
                      {activeItem.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xl font-extrabold text-emerald-400 font-sans">
                        {formatRupiah(activeItem.price)}
                      </span>
                      <span className="text-xs text-sage-300 line-through">
                        {formatRupiah(activeItem.price * 1.15)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setQuickViewItem(activeItem)}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all backdrop-blur-sm"
                    >
                      Detail
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(e, activeItem)}
                      className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                        addedItemMap[activeItem.id]
                          ? 'bg-emerald-500 text-white'
                          : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/50'
                      }`}
                    >
                      {addedItemMap[activeItem.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Buy Now</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTAs & Navigation Arrows */}
            <div className="flex flex-wrap items-center gap-4 w-full">
              <Link
                href="/menu"
                className="px-7 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-rose-950/50 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>See Full Menu</span>
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base transition-all backdrop-blur-md hover:-translate-y-0.5 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>View Cart</span>
              </button>

              {/* Slider Arrow Buttons */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all backdrop-blur-md active:scale-95"
                  aria-label="Slide sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all backdrop-blur-md active:scale-95"
                  aria-label="Slide selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Large Dish Showcase Photo */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Soft Circular Glass Glow Behind Plate */}
            <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-300/10 border border-white/10 backdrop-blur-2xl animate-pulse pointer-events-none" />

            {/* Active Main Dish Image Frame */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] rounded-full p-3 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-emerald-950/80 group overflow-hidden"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 300px, 450px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
                </div>

                {/* Floating Rating Badge */}
                <div className="absolute bottom-6 left-6 px-3.5 py-1.5 rounded-full bg-forest-950/90 backdrop-blur-md border border-white/20 text-xs text-white font-bold flex items-center gap-1.5 shadow-xl">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>4.9 / 5.0 Rating</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Section: Signature Menu Slider Cards (Interactive Bar) */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              <span>Signature Menu Headlines & Slider</span>
            </h2>
            <span className="text-xs text-sage-300 font-mono">
              0{currentIdx + 1} / 0{SIGNATURE_ITEMS.slice(0, 4).length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {SIGNATURE_ITEMS.slice(0, 4).map((item, idx) => {
              const isSelected = currentIdx === idx;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setCurrentIdx(idx)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 backdrop-blur-md ${
                    isSelected
                      ? 'bg-white/20 border-emerald-400 shadow-lg shadow-emerald-950/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-forest-900">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-emerald-300 font-sans mt-0.5">
                      {formatRupiah(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, item)}
                    className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shrink-0 shadow-sm transition-colors"
                    title="Tambah ke keranjang"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
