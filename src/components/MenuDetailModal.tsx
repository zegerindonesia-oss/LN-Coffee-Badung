'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MenuItem } from '@/types/menu';
import { useCart } from '@/context/CartContext';
import { formatRupiah } from '@/lib/currency';
import { MENU_ITEMS } from '@/data/menu';
import { X, Plus, Minus, ShoppingBag, Sparkles, Flame, Check, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop';

export const MenuDetailModal: React.FC = () => {
  const { quickViewItem, setQuickViewItem, addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('Level 1');
  const [imgSrc, setImgSrc] = useState(FALLBACK_IMAGE);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (quickViewItem) {
      setQuantity(1);
      setNotes('');
      setSelectedLevel('Level 1');
      setImgSrc(quickViewItem.image || FALLBACK_IMAGE);
      setIsAdded(false);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [quickViewItem]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setQuickViewItem]);

  if (!quickViewItem) return null;

  const isMieGoli = quickViewItem.name.toLowerCase().includes('mie goli');
  const totalPrice = quickViewItem.price * quantity;

  // Find 3 related items from same main category
  const relatedItems = MENU_ITEMS.filter(
    (item) =>
      item.id !== quickViewItem.id &&
      (item.mainCategory === quickViewItem.mainCategory ||
        item.subCategory === quickViewItem.subCategory)
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(
      quickViewItem,
      quantity,
      notes.trim(),
      isMieGoli ? selectedLevel : undefined
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewItem(null);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewItem(null)}
          className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-sage-200 max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewItem(null)}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-charcoal-900/60 hover:bg-charcoal-900 text-white transition-colors backdrop-blur-md"
            aria-label="Tutup detail menu"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto flex-1 p-0">
            {/* Modal Image Header */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] bg-ivory-200">
              <Image
                src={imgSrc}
                alt={quickViewItem.name}
                fill
                priority
                className="object-cover object-center"
                onError={() => setImgSrc(FALLBACK_IMAGE)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-terracotta-500 text-white text-xs font-semibold uppercase tracking-wider shadow-sm">
                  {quickViewItem.mainCategory}
                </span>
                <span className="px-3 py-1 rounded-full bg-forest-900/90 text-sage-200 text-xs font-medium backdrop-blur-md">
                  {quickViewItem.subCategory}
                </span>
                {quickViewItem.labels.map((lbl) => (
                  <span
                    key={lbl}
                    className="px-3 py-1 rounded-full bg-white/90 text-charcoal-900 text-xs font-semibold shadow-sm backdrop-blur-md"
                  >
                    {lbl}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Title & Price */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
                    {quickViewItem.name}
                  </h2>
                  <p className="text-xs text-sage-700 mt-1 font-medium">
                    Ukuran/Porsi: <span className="text-charcoal-900">{quickViewItem.size}</span>
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-charcoal-500 block">Harga Satuan</span>
                  <span className="font-sans font-bold text-2xl text-terracotta-600">
                    {formatRupiah(quickViewItem.price)}
                  </span>
                </div>
              </div>

              {/* Ingredients Details */}
              <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-300/80">
                <h4 className="text-xs font-semibold text-forest-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Utensils className="w-3.5 h-3.5 text-terracotta-500" />
                  <span>Bahan & Komposisi (Ingredients)</span>
                </h4>
                <p className="text-sm text-charcoal-800 leading-relaxed">
                  {quickViewItem.ingredients ||
                    'Racikan hidangan plant-based murni tanpa bahan hewani, tanpa MSG, dimasak dengan higienis dan cita rasa istimewa.'}
                </p>
              </div>

              {/* Special Spicy Level Options for Mie Goli */}
              {isMieGoli && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-forest-950 flex items-center gap-1.5 uppercase tracking-wide">
                    <Flame className="w-4 h-4 text-terracotta-500" />
                    <span>Pilihan Level Pedas:</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Level 1 (Pedas Sedang)', 'Level 2 (Pedas Mantap)', 'Level 3 (Pedas Ekstra)'].map((lvl) => {
                      const isSelected = selectedLevel === lvl;
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setSelectedLevel(lvl)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-terracotta-500 border-terracotta-500 text-white shadow-sm'
                              : 'bg-white border-sage-200 text-charcoal-800 hover:border-terracotta-300'
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Special Notes Field */}
              <div className="space-y-2">
                <label
                  htmlFor="special-notes"
                  className="text-xs font-bold text-forest-950 uppercase tracking-wide block"
                >
                  Catatan Khusus (Opsional)
                </label>
                <textarea
                  id="special-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Kurangi es, saus dipisah, tanpa sedotan..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-sage-300 bg-white text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-terracotta-400 placeholder:text-charcoal-400"
                />
              </div>

              {/* Quantity Stepper & Total */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-sage-200">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-charcoal-700 uppercase">Jumlah:</span>
                  <div className="inline-flex items-center rounded-xl border border-sage-300 bg-white overflow-hidden shadow-sm">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-2.5 text-charcoal-600 hover:bg-ivory-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Kurangi jumlah"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-sm text-forest-950">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 text-charcoal-600 hover:bg-ivory-100 transition-colors"
                      aria-label="Tambah jumlah"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right flex items-baseline gap-2">
                  <span className="text-xs text-charcoal-500">Subtotal:</span>
                  <span className="font-sans font-bold text-2xl text-forest-950">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Direct Add to Cart Action */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-base text-white flex items-center justify-center gap-2 transition-all shadow-terracotta hover:shadow-xl ${
                  isAdded
                    ? 'bg-emerald-600'
                    : 'bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Berhasil Masuk Keranjang</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Tambahkan ke Keranjang • {formatRupiah(totalPrice)}</span>
                  </>
                )}
              </button>

              {/* Related Menu Suggestions */}
              {relatedItems.length > 0 && (
                <div className="pt-6 border-t border-sage-200">
                  <h4 className="text-xs font-bold text-forest-900 uppercase tracking-wider mb-3">
                    Menu Terkait Lainnya
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {relatedItems.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => setQuickViewItem(rel)}
                        className="p-3 rounded-2xl bg-ivory-50 hover:bg-ivory-100 border border-sage-200/80 cursor-pointer transition-all flex items-center gap-3 group"
                      >
                        <div className="relative w-12 h-12 rounded-xl bg-ivory-200 overflow-hidden shrink-0">
                          <Image
                            src={rel.image || FALLBACK_IMAGE}
                            alt={rel.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-forest-950 truncate group-hover:text-terracotta-600">
                            {rel.name}
                          </p>
                          <p className="text-[11px] font-semibold text-terracotta-600">
                            {formatRupiah(rel.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
