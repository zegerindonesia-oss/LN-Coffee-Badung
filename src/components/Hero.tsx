'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Plus,
  Check,
  Star,
  Utensils,
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
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-center overflow-hidden bg-white text-slate-800 pt-24 pb-16 lg:py-24"
    >
      {/* Organic Green Waves Ambient Radial Blurs */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-emerald-100/70 via-teal-50/50 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-50/80 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Grid: On Mobile, Dish Image is ON TOP (order-1 lg:order-2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Mobile First: Auto-Sliding Dish Photo Showcase */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative flex justify-center items-center">
            {/* Ambient Circular Frame */}
            <div className="absolute w-[280px] h-[280px] sm:w-[460px] sm:h-[460px] lg:w-[540px] lg:h-[540px] rounded-full bg-gradient-to-tr from-emerald-100/80 to-teal-50/60 border border-emerald-200/60 pointer-events-none" />

            {/* Main Featured Dish Circular Frame */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative w-[270px] h-[270px] sm:w-[420px] sm:h-[420px] lg:w-[520px] lg:h-[520px] rounded-full p-2.5 sm:p-3 bg-white border-4 border-white shadow-2xl overflow-hidden group cursor-pointer"
                onClick={() => setQuickViewItem(activeItem)}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 320px, 550px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 backdrop-blur-md text-[11px] sm:text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-xl border border-slate-100">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500" />
                  <span>4.9 / 5.0 Rating</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Column (order-2 lg:order-1): Headline & Copywriting */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col items-start text-left z-10">
            {/* Top Pill Badge & Status */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                LN Fortunate Signature Menu
              </span>
              <OpeningStatusBadge />
            </div>

            {/* Main Headline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F291E] leading-[1.12] mb-3">
                  Taste the Best that <br />
                  <span className="text-emerald-700 italic font-serif font-normal">
                    Surprises You
                  </span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal max-w-xl mb-5">
                  {activeItem.ingredients ||
                    'Sajian gourmet plant-based khas LN Fortunate Coffee Bali. Diolah dari bahan nabati alami pilihan tanpa pengawet dan 100% tanpa MSG.'}
                </p>

                {/* Active Item Details & Price Pill */}
                <div className="mb-6 p-4 rounded-3xl bg-emerald-900 text-white border border-emerald-800 shadow-xl flex items-center justify-between gap-4 max-w-lg">
                  <div>
                    <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-extrabold block">
                      {activeItem.subCategory} • {activeItem.size}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                      {activeItem.name}
                    </h3>
                    <span className="text-lg font-extrabold text-emerald-400 font-sans">
                      {formatRupiah(activeItem.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setQuickViewItem(activeItem)}
                      className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
                    >
                      Detail
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(e, activeItem)}
                      className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                        addedItemMap[activeItem.id]
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {addedItemMap[activeItem.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Ditambah</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Beli Sekarang</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTAs & Navigation Arrows */}
            <div className="flex flex-wrap items-center gap-3.5 w-full">
              <Link
                href="/menu"
                className="px-7 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Lihat Semua Menu
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-6 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-sm sm:text-base transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                <span>Keranjang</span>
              </button>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200"
                  aria-label="Menu sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200"
                  aria-label="Menu selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Favorite Food Card Grid (Green Wave Accents) */}
        <div className="mt-14 pt-8 border-t border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F291E]">
                Favorite Food
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Pilihan menu favorit yang paling sering dipesan di LN Fortunate Bali
              </p>
            </div>

            <Link
              href="/menu"
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors"
            >
              <span>View More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Grid: Alternating Green Wave & White Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SIGNATURE_ITEMS.slice(0, 4).map((item, idx) => {
              const isGreenCard = idx % 2 === 1;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6 }}
                  onClick={() => setCurrentIdx(idx)}
                  className={`relative rounded-[2rem] p-5 cursor-pointer flex flex-col justify-between transition-all shadow-md hover:shadow-xl ${
                    isGreenCard
                      ? 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-forest-900 text-white border border-emerald-700'
                      : 'bg-white border border-slate-200 text-slate-900'
                  }`}
                >
                  {/* Dish Image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm border border-black/5 bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-base line-clamp-1 mb-1">
                      {item.name}
                    </h3>
                    <p
                      className={`text-xs line-clamp-2 min-h-[32px] font-normal leading-relaxed mb-4 ${
                        isGreenCard ? 'text-emerald-100/90' : 'text-slate-500'
                      }`}
                    >
                      {item.ingredients || 'Hidangan gurih lezat resep rahasia khas LN Fortunate.'}
                    </p>
                  </div>

                  {/* Card Footer Price & Rounded Full + Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-black/10">
                    <span className="font-bold text-base font-sans">
                      {formatRupiah(item.price)}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md transition-transform active:scale-95 ${
                        isGreenCard
                          ? 'bg-white text-emerald-900 hover:bg-slate-100'
                          : 'bg-emerald-700 text-white hover:bg-emerald-800'
                      }`}
                      aria-label={`Tambah ${item.name}`}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Organic Green Wave Shape Divider at Section End (Matching Ref Image 5) */}
      <div className="w-full overflow-hidden leading-none mt-10 pointer-events-none">
        <svg
          className="relative block w-full h-12 text-emerald-900/10"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.3,130.83,121.3,200,110.22,241.65,103.56,282.72,81.65,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
