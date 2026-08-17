'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem } from '@/types/menu';
import { useCart } from '@/context/CartContext';
import { formatRupiah } from '@/lib/currency';
import { Plus, Eye, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuCardProps {
  item: MenuItem;
  onQuickView?: (item: MenuItem) => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop';

export const MenuCard: React.FC<MenuCardProps> = ({ item, onQuickView }) => {
  const { addToCart, setQuickViewItem } = useCart();
  const [imgSrc, setImgSrc] = useState(item.image);
  const [isJustAdded, setIsJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 1200);
  };

  const handleOpenDetail = () => {
    if (onQuickView) {
      onQuickView(item);
    } else {
      setQuickViewItem(item);
    }
  };

  const isSignature = item.labels.includes('LN Signature');
  const isBestSeller = item.labels.includes('Best Seller');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative bg-white rounded-2xl sm:rounded-3xl border border-sage-200/80 hover:border-terracotta-300 shadow-soft hover:shadow-lift transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* 4:3 Image Container with Hover Zoom and Badges */}
      <div
        onClick={handleOpenDetail}
        className="relative w-full aspect-[4/3] bg-ivory-200 overflow-hidden cursor-pointer"
      >
        <Image
          src={imgSrc}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges on Top Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isSignature && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-900/90 backdrop-blur-md text-terracotta-300 text-[10px] font-bold tracking-wide uppercase shadow-sm border border-forest-700">
              <Sparkles className="w-2.5 h-2.5" />
              LN Signature
            </span>
          )}
          {isBestSeller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-terracotta-500/90 backdrop-blur-md text-white text-[10px] font-bold tracking-wide uppercase shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Portion / Size Badge on Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-charcoal-800 text-[11px] font-medium shadow-sm border border-sage-100">
            {item.size}
          </span>
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenDetail();
          }}
          className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/90 backdrop-blur-md text-forest-900 hover:bg-forest-900 hover:text-white shadow-md transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          aria-label={`Lihat detail ${item.name}`}
          title="Lihat Detail Menu"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory Label */}
          <p className="text-[11px] font-semibold text-sage-600 uppercase tracking-wider mb-1">
            {item.subCategory}
          </p>

          {/* Product Name */}
          <h3
            onClick={handleOpenDetail}
            className="font-serif text-base sm:text-lg font-bold text-forest-950 group-hover:text-terracotta-600 transition-colors line-clamp-1 cursor-pointer"
            title={item.name}
          >
            {item.name}
          </h3>

          {/* Ingredients / Description (2 lines) */}
          <p className="text-xs text-charcoal-700/80 line-clamp-2 mt-1.5 min-h-[32px] font-light leading-relaxed">
            {item.ingredients || 'Hidangan sehat berbasis nabati dengan bahan berkualitas pilihan khas Bali.'}
          </p>
        </div>

        {/* Price and Action Section */}
        <div className="mt-4 pt-3 border-t border-sage-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-charcoal-500 uppercase block leading-none">Harga</span>
            <span className="font-sans font-bold text-base sm:text-lg text-forest-900">
              {formatRupiah(item.price)}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleAddToCart}
            className={`px-3.5 sm:px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm ${
              isJustAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-forest-900 hover:bg-terracotta-500 text-white hover:shadow-terracotta'
            }`}
            aria-label={`Tambah ${item.name} ke keranjang`}
          >
            {isJustAdded ? (
              <>
                <Check className="w-3.5 h-3.5 animate-bounce" />
                <span>Ditambah</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
