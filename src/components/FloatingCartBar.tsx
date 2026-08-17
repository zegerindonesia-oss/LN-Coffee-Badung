'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { formatRupiah } from '@/lib/currency';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingCartBar: React.FC = () => {
  const { totalItems, totalAmount, setIsCartOpen, isCartOpen, isCheckoutOpen } = useCart();

  if (totalItems === 0 || isCartOpen || isCheckoutOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.25 }}
        className="md:hidden fixed bottom-16 left-4 right-4 z-30"
      >
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full py-3.5 px-4 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-terracotta flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-xs">
              {totalItems}
            </div>
            <div>
              <p className="text-[11px] text-ivory-100 uppercase tracking-wide font-medium">
                Total Keranjang
              </p>
              <p className="text-sm font-bold text-white font-sans">
                {formatRupiah(totalAmount)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold bg-white/15 px-3 py-1.5 rounded-xl">
            <span>Lihat Pesanan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
