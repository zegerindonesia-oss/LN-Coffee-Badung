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
    }, 4500);
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

  const getItemAtOffset = (offset: number) => {
    const len = SIGNATURE_ITEMS.length;
    const index = (currentIdx + offset + len) % len;
    return SIGNATURE_ITEMS[index];
  };

  const prevItem = getItemAtOffset(-1);
  const nextItem = getItemAtOffset(1);

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-center overflow-hidden bg-white text-slate-800 pt-24 pb-16 lg:py-24"
    >
      {/* Background Soft Ambient Light */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-100/60 via-teal-50/40 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-50/80 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        
        {/* 1. Small Badge & Status (Top) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider">
            LN Signature Menu
          </span>
          <OpeningStatusBadge />
        </div>

        {/* 2. Copywriting Title & Description */}
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F291E] leading-[1.12] mb-3">
            Taste the Best that <br />
            <span className="text-emerald-700 italic font-serif font-normal">
              Surprises You
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl mx-auto">
            Sajian gourmet plant-based khas LN Fortunate Coffee Bali. Diolah dari bahan nabati alami pilihan tanpa pengawet dan 100% tanpa MSG.
          </p>
        </div>

        {/* 3. Apple-Style 3D Cover Flow Carousel Showcase */}
        <div className="relative w-full max-w-5xl my-4 py-4 flex items-center justify-center overflow-visible">
          
          {/* Left Preview Card (Apple Perspective Depth) */}
          <motion.div
            key={`left-${prevItem.id}`}
            onClick={handlePrev}
            initial={{ opacity: 0, scale: 0.8, x: -60 }}
            animate={{ opacity: 0.65, scale: 0.85, x: 0 }}
            transition={{ duration: 0.45 }}
            className="hidden md:flex absolute left-4 lg:left-12 z-10 cursor-pointer w-[240px] lg:w-[280px] rounded-[2.5rem] p-4 bg-white border border-slate-200 shadow-xl text-slate-800 flex-col items-center select-none hover:opacity-90 transition-opacity"
          >
            <div className="w-full flex items-center justify-between text-[10px] font-bold text-slate-500 mb-2">
              <span>{prevItem.subCategory}</span>
              <span className="flex items-center gap-1 text-amber-500 font-extrabold">★ 4.9</span>
            </div>

            <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden border-2 border-slate-100 shadow-md mb-3">
              <Image src={prevItem.image} alt={prevItem.name} fill className="object-cover" />
            </div>

            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{prevItem.name}</h4>
            <span className="text-xs font-extrabold text-emerald-700 mt-1">{formatRupiah(prevItem.price)}</span>
          </motion.div>

          {/* Center Active Apple Card (Hero Centerpiece with Deep Shadow) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`active-${activeItem.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="relative z-30 w-full max-w-[310px] sm:max-w-[380px] lg:max-w-[420px] rounded-[2.5rem] sm:rounded-[3rem] p-5 sm:p-7 bg-gradient-to-br from-[#0F291E] via-emerald-900 to-[#0A2218] text-white border border-emerald-700/80 shadow-[0_30px_70px_-15px_rgba(15,41,30,0.4)] flex flex-col items-center cursor-pointer"
            >
              {/* Header inside Card: Subcategory Left, Rating Badge TOP RIGHT */}
              <div className="w-full flex items-center justify-between mb-4">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-700/80 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider">
                  {activeItem.subCategory} • {activeItem.size}
                </span>

                {/* Rating Badge at TOP RIGHT */}
                <div className="px-3.5 py-1.5 rounded-full bg-white text-slate-800 text-xs font-extrabold flex items-center gap-1.5 shadow-md">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>4.9 / 5.0 Rating</span>
                </div>
              </div>

              {/* Large Circular Dish Photo inside Card */}
              <div
                className="relative w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[280px] lg:h-[280px] rounded-full p-2.5 bg-white border-4 border-white shadow-2xl overflow-hidden my-2 group"
                onClick={() => setQuickViewItem(activeItem)}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.name}
                    fill
                    priority
                    sizes="320px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Footer inside SAME Card: Item Name, Price & Action Buttons */}
              <div className="w-full mt-3 text-center space-y-2.5">
                <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                  {activeItem.name}
                </h3>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-sans">
                  {formatRupiah(activeItem.price)}
                </div>

                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    onClick={() => setQuickViewItem(activeItem)}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20"
                  >
                    Detail
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(e, activeItem)}
                    className={`px-5 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
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

          {/* Right Preview Card (Apple Perspective Depth) */}
          <motion.div
            key={`right-${nextItem.id}`}
            onClick={handleNext}
            initial={{ opacity: 0, scale: 0.8, x: 60 }}
            animate={{ opacity: 0.65, scale: 0.85, x: 0 }}
            transition={{ duration: 0.45 }}
            className="hidden md:flex absolute right-4 lg:right-12 z-10 cursor-pointer w-[240px] lg:w-[280px] rounded-[2.5rem] p-4 bg-white border border-slate-200 shadow-xl text-slate-800 flex-col items-center select-none hover:opacity-90 transition-opacity"
          >
            <div className="w-full flex items-center justify-between text-[10px] font-bold text-slate-500 mb-2">
              <span>{nextItem.subCategory}</span>
              <span className="flex items-center gap-1 text-amber-500 font-extrabold">★ 4.9</span>
            </div>

            <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden border-2 border-slate-100 shadow-md mb-3">
              <Image src={nextItem.image} alt={nextItem.name} fill className="object-cover" />
            </div>

            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{nextItem.name}</h4>
            <span className="text-xs font-extrabold text-emerald-700 mt-1">{formatRupiah(nextItem.price)}</span>
          </motion.div>
        </div>

        {/* 4. Action Buttons, Navigation & Pagination Dots */}
        <div className="flex flex-col items-center gap-5 mt-6 w-full max-w-md">
          {/* Pagination Indicator Dots */}
          <div className="flex items-center gap-2">
            {SIGNATURE_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIdx(idx)}
                aria-label={`Pilih slide ${idx + 1}`}
                className={`transition-all duration-300 ${
                  idx === currentIdx
                    ? 'w-7 h-2.5 rounded-full bg-emerald-700'
                    : 'w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 w-full">
            {/* Slider Arrow Buttons */}
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200 shadow-sm"
              aria-label="Menu sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <Link
              href="/menu"
              className="px-7 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Lihat Semua Menu
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-sm transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">Keranjang</span>
            </button>

            <button
              onClick={handleNext}
              className="p-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200 shadow-sm"
              aria-label="Menu selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5. Bottom Favorite Food Grid */}
        <div className="w-full mt-16 pt-10 border-t border-slate-100 text-left">
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

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SIGNATURE_ITEMS.slice(0, 4).map((item, idx) => {
              const isGreenCard = idx % 2 === 1;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6 }}
                  onClick={() => setCurrentIdx(idx)}
                  className={`relative rounded-[2.5rem] p-5 cursor-pointer flex flex-col justify-between transition-all shadow-md hover:shadow-xl ${
                    isGreenCard
                      ? 'bg-gradient-to-br from-[#0F291E] via-emerald-900 to-[#0A2218] text-white border border-emerald-800'
                      : 'bg-white border border-slate-200 text-slate-900'
                  }`}
                >
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

                  <div className="flex items-center justify-between pt-3 border-t border-black/10">
                    <span className="font-bold text-base font-sans">
                      {formatRupiah(item.price)}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md transition-transform active:scale-95 ${
                        isGreenCard
                          ? 'bg-white text-[#0F291E] hover:bg-slate-100'
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

      {/* Organic Green Wave Shape Divider */}
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
