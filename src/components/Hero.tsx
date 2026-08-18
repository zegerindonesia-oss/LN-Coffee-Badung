'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

export const Hero: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { addToCart, setIsCartOpen, setQuickViewItem } = useCart();
  const [addedItemMap, setAddedItemMap] = useState<Record<number, boolean>>({});

  // Auto Slider runs continuously every 2.5 seconds (2500ms) without stopping
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SIGNATURE_ITEMS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? SIGNATURE_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % SIGNATURE_ITEMS.length);
  };

  const handleAddToCart = (e: React.MouseEvent, item: typeof SIGNATURE_ITEMS[0]) => {
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

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-center overflow-hidden bg-white text-slate-800 pt-20 pb-14 lg:py-20">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-100/70 via-teal-50/50 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-50/90 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        
        {/* 1. Headline Copywriting (Badges removed per user request) */}
        <div className="max-w-2xl mx-auto mb-3">
          <h1 className="text-3.5xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F291E] leading-[1.1] mb-2">
            Taste the Best that <br />
            <span className="text-emerald-700 italic font-serif font-normal">
              Surprises You
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl mx-auto">
            Sajian gourmet plant-based khas LN Fortunate Coffee Bali. Diolah dari bahan nabati alami pilihan tanpa pengawet dan 100% tanpa MSG.
          </p>
        </div>

        {/* 2. Apple-Style 3D Rotating Cover Flow Showcase (Taller Image & Snug Text Layout) */}
        <div className="relative w-full max-w-5xl my-2 py-2 flex items-center justify-center min-h-[500px] sm:min-h-[550px] perspective-1000 overflow-visible">
          {[-1, 0, 1].map((offset) => {
            const item = getItemAtOffset(offset);
            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            return (
              <motion.div
                key={`${item.id}-${offset}`}
                onClick={() => {
                  if (isLeft) handlePrev();
                  if (isRight) handleNext();
                  if (isCenter) setQuickViewItem(item);
                }}
                initial={false}
                animate={{
                  scale: isCenter ? 1 : 0.82,
                  x: isLeft ? '-78%' : isRight ? '78%' : '0%',
                  rotateY: isLeft ? 16 : isRight ? -16 : 0,
                  z: isCenter ? 30 : 10,
                  opacity: isCenter ? 1 : 0.7,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24,
                }}
                style={{ zIndex: isCenter ? 30 : 10 }}
                className={`absolute rounded-[2.5rem] p-4 sm:p-5 bg-gradient-to-br from-[#0F291E] via-emerald-900 to-[#0A2218] text-white border border-emerald-700/80 shadow-[0_30px_70px_-15px_rgba(15,41,30,0.45)] flex flex-col justify-between cursor-pointer select-none transition-all ${
                  isCenter
                    ? 'w-[320px] sm:w-[380px] lg:w-[400px] h-[500px] sm:h-[540px]'
                    : 'w-[270px] sm:w-[320px] h-[430px] sm:h-[470px] hidden sm:flex hover:opacity-90'
                }`}
              >
                {/* Taller Food Image Frame (Fills almost 70% of card, removing empty green space - Ref Image 2) */}
                <div className="relative w-full h-[280px] sm:h-[330px] rounded-[2rem] overflow-hidden shadow-lg mb-2 bg-slate-100 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority={isCenter}
                    sizes="(max-width: 640px) 340px, 440px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Rating Badge Overlay Top Right */}
                  <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 text-slate-800 text-xs font-extrabold flex items-center gap-1 shadow-md backdrop-blur-md">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>4.9</span>
                  </div>
                  {/* Category Tag Overlay Top Left */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#0F291E]/85 border border-white/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                    {item.subCategory}
                  </div>
                </div>

                {/* Card Bottom Body (Text & Description Snug against Price line) */}
                <div className="flex-1 text-left flex flex-col justify-between pt-0.5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white line-clamp-1 mb-0.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-emerald-100/90 font-normal leading-tight line-clamp-1">
                      {item.ingredients || 'Hidangan gourmet nabati spesial khas LN Fortunate Bali.'}
                    </p>
                  </div>

                  {/* Card Bottom Footer: Price + Large White Plus (+) Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-emerald-800/80 mt-1">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
                        HARGA
                      </span>
                      <span className="text-xl sm:text-2xl font-extrabold text-white font-sans leading-none">
                        {formatRupiah(item.price)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-xl shadow-xl transition-all active:scale-95 ${
                        addedItemMap[item.id]
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white text-[#0F291E] hover:bg-slate-100 hover:scale-105'
                      }`}
                      aria-label={`Tambah ${item.name}`}
                    >
                      {addedItemMap[item.id] ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <Plus className="w-6 h-6 text-[#0F291E]" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 3. Sleek Single-Line Horizontal Navigation Buttons (Ref Image 3) */}
        <div className="flex flex-col items-center gap-3.5 mt-2 w-full max-w-lg">
          {/* 2.5s Auto-Slider Indicator Dots */}
          <div className="flex items-center gap-2">
            {SIGNATURE_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIdx(idx)}
                aria-label={`Pilih slide ${idx + 1}`}
                className={`transition-all duration-300 ${
                  idx === currentIdx
                    ? 'w-8 h-2.5 rounded-full bg-emerald-700'
                    : 'w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 w-full">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 transition-all border border-slate-200 shadow-md hover:shadow-lg shrink-0"
              aria-label="Menu sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Single-Line Horizontal Button "Lihat Semua Menu" */}
            <Link
              href="/menu"
              className="px-6 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0 inline-flex items-center justify-center"
            >
              Lihat Semua Menu
            </Link>

            {/* Single-Line Horizontal Button "Keranjang" */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-5 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 shadow-sm shrink-0"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Keranjang</span>
            </button>

            <button
              onClick={handleNext}
              className="p-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 transition-all border border-slate-200 shadow-md hover:shadow-lg shrink-0"
              aria-label="Menu selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4. Bottom Favorite Food Card Grid */}
        <div className="w-full mt-14 pt-8 border-t border-slate-100 text-left">
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
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setCurrentIdx(idx)}
                  className={`relative rounded-[2.5rem] p-5 cursor-pointer flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-2xl ${
                    isGreenCard
                      ? 'bg-gradient-to-br from-[#0F291E] via-emerald-900 to-[#0A2218] text-white border border-emerald-800'
                      : 'bg-white border border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-md border border-black/5 bg-slate-100">
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
