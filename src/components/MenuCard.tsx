'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem } from '@/types/menu';
import { useCart } from '@/context/CartContext';
import { formatRupiah } from '@/lib/currency';
import { Plus, Eye, Check } from 'lucide-react';
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-[2.2rem] border border-slate-200/80 hover:border-emerald-400 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Image Frame */}
      <div
        onClick={handleOpenDetail}
        className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
      >
        <Image
          src={imgSrc}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />

        {/* Clean Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isSignature && (
            <span className="px-3 py-1 rounded-full bg-emerald-800/90 backdrop-blur-md text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
              LN Signature
            </span>
          )}
          {isBestSeller && (
            <span className="px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Size Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-bold shadow-sm border border-slate-200">
            {item.size}
          </span>
        </div>

        {/* Quick View Eye Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOpenDetail();
          }}
          className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/95 backdrop-blur-md text-slate-800 hover:bg-emerald-700 hover:text-white shadow-md transition-all opacity-0 group-hover:opacity-100"
          aria-label={`Lihat detail ${item.name}`}
          title="Lihat Detail Menu"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider mb-1">
            {item.subCategory}
          </p>

          <h3
            onClick={handleOpenDetail}
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer"
            title={item.name}
          >
            {item.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 min-h-[32px] font-normal leading-relaxed">
            {item.ingredients || 'Sajikan sehat alami berbasis tanaman resep kuliner istimewa khas LN Fortunate Coffee.'}
          </p>
        </div>

        {/* Price & Pill Button with "+ Pesan" */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Harga</span>
            <span className="font-sans font-extrabold text-base sm:text-lg text-emerald-800">
              {formatRupiah(item.price)}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleAddToCart}
            className={`px-3.5 sm:px-4 py-2 rounded-full flex items-center gap-1.5 font-bold text-xs sm:text-sm shadow-sm transition-all ${
              isJustAdded
                ? 'bg-emerald-800 text-white border-emerald-800'
                : 'bg-white hover:bg-emerald-700 text-emerald-800 hover:text-white border-2 border-emerald-700 hover:shadow-md'
            }`}
            aria-label={`Tambah ${item.name} ke keranjang`}
          >
            {isJustAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Pesan</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Pesan</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
