'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatRupiah } from '@/lib/currency';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Info,
  Edit2,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    updateNotes,
    clearCart,
    totalItems,
    totalAmount,
    setIsCheckoutOpen,
  } = useCart();

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleStartEditNote = (cartItemId: string, currentNote: string = '') => {
    setEditingNoteId(cartItemId);
    setNoteInput(currentNote);
  };

  const handleSaveNote = (cartItemId: string) => {
    updateNotes(cartItemId, noteInput.trim());
    setEditingNoteId(null);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm"
          />

          {/* Drawer / Bottom Sheet */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-ivory-50 text-charcoal-900 shadow-2xl flex flex-col justify-between border-l border-sage-200"
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 bg-forest-900 text-white flex items-center justify-between border-b border-forest-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-terracotta-500/20 text-terracotta-400 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg sm:text-xl font-bold leading-tight">
                      Keranjang Pesanan
                    </h2>
                    <p className="text-xs text-sage-300">
                      {totalItems} item hidangan dipilih
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      className="p-2 rounded-lg text-sage-300 hover:text-rose-300 hover:bg-forest-800 transition-colors text-xs font-medium"
                      title="Kosongkan keranjang"
                      aria-label="Kosongkan seluruh keranjang"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-lg text-sage-300 hover:text-white hover:bg-forest-800 transition-colors"
                    aria-label="Tutup keranjang"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Clear Cart Confirmation Prompt */}
              {showClearConfirm && (
                <div className="p-4 bg-rose-50 border-b border-rose-200 text-rose-900 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Kosongkan seluruh isi keranjang?</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        clearCart();
                        setShowClearConfirm(false);
                      }}
                      className="px-2.5 py-1 rounded-md bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors"
                    >
                      Ya, Hapus
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="px-2.5 py-1 rounded-md bg-white border border-sage-300 text-charcoal-700 hover:bg-sage-50 transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
                    <div className="w-20 h-20 rounded-full bg-ivory-200 flex items-center justify-center text-sage-400">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div className="space-y-1 max-w-xs">
                      <p className="font-serif text-lg font-bold text-forest-950">
                        Keranjang Belum Terisi
                      </p>
                      <p className="text-xs text-charcoal-600">
                        Yuk jelajahi menu plant-based favoritmu dan nikmati hidangan penuh kebaikan di LN Fortunate Coffee.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      Pilih Menu Sekarang
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white border border-sage-200/90 shadow-sm space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-xl bg-ivory-200 overflow-hidden shrink-0">
                          <Image
                            src={item.menuItem.image || FALLBACK_IMAGE}
                            alt={item.menuItem.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Item Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-serif font-bold text-sm text-forest-950 truncate">
                              {item.menuItem.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-charcoal-400 hover:text-rose-600 p-1 transition-colors"
                              aria-label={`Hapus ${item.menuItem.name}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          {item.selectedLevel && (
                            <span className="inline-block text-[11px] font-semibold text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded-md mt-0.5">
                              {item.selectedLevel}
                            </span>
                          )}

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-charcoal-600 font-medium">
                              {formatRupiah(item.menuItem.price)}
                            </span>
                            <span className="font-sans font-bold text-sm text-forest-900">
                              {formatRupiah(item.subtotal)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper & Notes Toggle */}
                      <div className="pt-2 border-t border-sage-100 flex items-center justify-between gap-2">
                        {/* Notes button / display */}
                        <div className="flex-1 min-w-0">
                          {editingNoteId === item.id ? (
                            <div className="flex items-center gap-1.5 mt-1">
                              <input
                                type="text"
                                value={noteInput}
                                onChange={(e) => setNoteInput(e.target.value)}
                                placeholder="Catatan item..."
                                className="w-full px-2 py-1 text-xs border border-sage-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveNote(item.id);
                                }}
                              />
                              <button
                                onClick={() => handleSaveNote(item.id)}
                                className="p-1 rounded bg-forest-900 text-white"
                                aria-label="Simpan catatan"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleStartEditNote(item.id, item.notes)}
                              className="text-[11px] text-charcoal-500 hover:text-terracotta-600 flex items-center gap-1 truncate text-left"
                            >
                              <Edit2 className="w-3 h-3 shrink-0" />
                              <span className="truncate">
                                {item.notes ? `"${item.notes}"` : '+ Tambah Catatan'}
                              </span>
                            </button>
                          )}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="inline-flex items-center rounded-xl border border-sage-200 bg-ivory-100 overflow-hidden shrink-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-charcoal-700 hover:bg-white transition-colors"
                            aria-label="Kurangi 1 item"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center font-bold text-xs text-forest-950">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-charcoal-700 hover:bg-white transition-colors"
                            aria-label="Tambah 1 item"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout Action */}
              {cart.length > 0 && (
                <div className="p-5 sm:p-6 bg-white border-t border-sage-200 space-y-4">
                  {/* Delivery Note Info */}
                  <div className="p-3 rounded-xl bg-ivory-100 border border-ivory-300 text-[11px] text-charcoal-700 leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-terracotta-500 shrink-0 mt-0.5" />
                    <p>
                      Harga di atas belum termasuk ongkir apabila pesanan memerlukan pengiriman. Tim LN Fortunate Coffee akan mengonfirmasi ketersediaan, ongkir, dan nomor rekening/QRIS melalui WhatsApp.
                    </p>
                  </div>

                  {/* Subtotal & Total */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-charcoal-600">
                      <span>Total Item ({totalItems})</span>
                      <span>{formatRupiah(totalAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-sage-200">
                      <span className="font-serif font-bold text-base text-forest-950">
                        Total Pesanan
                      </span>
                      <span className="font-sans font-bold text-xl text-terracotta-600">
                        {formatRupiah(totalAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Proceed CTA */}
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 px-5 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-terracotta hover:shadow-lg"
                  >
                    <span>Lanjut ke Formulir WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
