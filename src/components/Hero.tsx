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
      {/* Background Soft Ambient Light */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-emerald-100/60 via-teal-50/40 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-50/80 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Grid: Static Headline Left, Dynamic Unified Sliding Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: STABLE / STATIC Headline Title & Copywriting (Zero Blinking/Flickering) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            {/* Top Pill Badge & Status */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                LN Fortunate Signature Menu
              </span>
              <OpeningStatusBadge />
            </div>

            {/* Static Headline Title & Description */}
            <div className="w-full">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F291E] leading-[1.12] mb-3">
                Taste the Best that <br />
                <span className="text-emerald-700 italic font-serif font-normal">
                  Surprises You
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal max-w-xl mb-6">
                Sajian gourmet plant-based khas LN Fortunate Coffee Bali. Diolah dari bahan nabati alami pilihan tanpa pengawet dan 100% tanpa MSG.
              </p>
            </div>

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

              {/* Slider Arrow Buttons */}
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

          {/* Right Column: Unified Featured Dish Card (ONLY THIS CARD SLIDES WITH MOTION) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] rounded-[3rem] p-5 sm:p-6 bg-gradient-to-br from-[#0F291E] via-emerald-900 to-[#0A2218] text-white border border-emerald-800/80 shadow-2xl flex flex-col items-center cursor-pointer"
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

                {/* Center: Large Circular Dish Photo */}
                <div
                  className="relative w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] lg:w-[290px] lg:h-[290px] rounded-full p-2.5 bg-white border-4 border-white shadow-2xl overflow-hidden my-2 group"
                  onClick={() => setQuickViewItem(activeItem)}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={activeItem.image}
                      alt={activeItem.name}
                      fill
                      priority
                      sizes="340px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Footer inside SAME Card: Item Name, Price & Action Buttons */}
                <div className="w-full mt-3 text-center space-y-2.5">
                  <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                    {activeItem.name}
                  </h3>
                  <div className="text-xl font-extrabold text-emerald-400 font-sans">
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
          </div>
        </div>

        {/* Bottom Section: Favorite Food Card Grid */}
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
                      ? 'bg-gradient-to-br from-[#0F291E] via-emerald-900 to-[#0A2218] text-white border border-emerald-800'
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

      {/* Organic Green Wave Shape Divider at Section End */}
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
