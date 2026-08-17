'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast: React.FC = () => {
  const { toast, hideToast, setIsCartOpen } = useCart();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 max-w-sm w-full bg-forest-900 text-white rounded-2xl shadow-lift p-4 border border-forest-800 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-terracotta-500/20 text-terracotta-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-terracotta-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-sage-300 font-medium">{toast.message}</p>
              <p className="text-sm font-semibold text-white truncate">{toast.itemName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                hideToast();
                setIsCartOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Lihat</span>
            </button>
            <button
              onClick={hideToast}
              className="p-1 rounded-lg text-sage-300 hover:text-white hover:bg-forest-800 transition-colors"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
