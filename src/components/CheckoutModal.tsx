'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { CheckoutFormData, OrderType } from '@/types/menu';
import { formatRupiah } from '@/lib/currency';
import { generateOrderReference } from '@/lib/utils';
import { openWhatsAppCheckout, CHECKOUT_WHATSAPP_NUMBER } from '@/lib/whatsapp';
import {
  X,
  Send,
  User,
  Phone,
  MapPin,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    totalAmount,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    setLastOrder,
  } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    customerPhone: '',
    orderType: 'Dine-in',
    deliveryAddress: '',
    orderTime: 'Secepatnya',
    generalNotes: '',
    agreedToTerms: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  useEffect(() => {
    if (isCheckoutOpen) {
      setIsSubmitted(false);
      setErrors({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Nama pemesan wajib diisi.';
    }

    // Phone validation: Indonesian phone or standard international digits
    const cleanedPhone = formData.customerPhone.replace(/[^0-9+]/g, '');
    if (!cleanedPhone) {
      newErrors.customerPhone = 'Nomor WhatsApp wajib diisi.';
    } else if (cleanedPhone.length < 9 || cleanedPhone.length > 15) {
      newErrors.customerPhone = 'Masukkan nomor telepon/WhatsApp yang valid (9-15 digit).';
    }

    if (formData.orderType === 'Delivery' && !formData.deliveryAddress?.trim()) {
      newErrors.deliveryAddress = 'Alamat pengiriman wajib diisi untuk jenis Delivery.';
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'Harap centang persetujuan konfirmasi WhatsApp.';
    }

    if (cart.length === 0) {
      newErrors.cart = 'Keranjang belanja Anda masih kosong.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const ref = generateOrderReference();
    setOrderRef(ref);

    // Save summary locally
    setLastOrder({
      orderRef: ref,
      orderDate: new Date().toISOString(),
      customerInfo: formData,
      items: [...cart],
      totalAmount,
    });

    // Launch WhatsApp
    openWhatsAppCheckout(formData, cart, totalAmount, ref);
    setIsSubmitted(true);
  };

  const handleClearAndClose = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-charcoal-950/75 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-sage-200 max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-forest-900 text-white flex items-center justify-between border-b border-forest-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-terracotta-500/20 text-terracotta-400 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold leading-tight">
                {isSubmitted ? 'Pesanan Terkirim ke WhatsApp' : 'Formulir Checkout WhatsApp'}
              </h2>
              <p className="text-xs text-sage-300">
                LN Fortunate Coffee Kapal • Badung, Bali
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-sage-300 hover:text-white hover:bg-forest-800 transition-colors"
            aria-label="Tutup form checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* Post-Submission Success View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-forest-950">
                  Detail Pesanan Siap Dikonfirmasi!
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-700 max-w-md mx-auto">
                  Aplikasi WhatsApp telah dibuka dengan pesan pesanan otomatis. Jika WhatsApp belum terbuka, silakan klik tombol di bawah.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-300 text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-charcoal-600 font-medium">Nomor Referensi:</span>
                  <span className="font-mono font-bold text-forest-900 text-sm bg-white px-2 py-0.5 rounded border border-sage-200">
                    {orderRef}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-charcoal-600 font-medium">Pemesan:</span>
                  <span className="font-semibold text-charcoal-900">
                    {formData.customerName} ({formData.orderType})
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-charcoal-600 font-medium">Total Tagihan Menu:</span>
                  <span className="font-bold text-terracotta-600 text-sm">
                    {formatRupiah(totalAmount)}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-forest-50 border border-forest-100 text-xs text-forest-900 text-left">
                💡 <span className="font-semibold">Langkah Selanjutnya:</span> Tim LN Fortunate Coffee akan memeriksa ketersediaan menu dapur, menghitung ongkir (bila delivery), lalu mengirimkan rekening transfer / kode QRIS resmi.
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => openWhatsAppCheckout(formData, cart, totalAmount, orderRef)}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Buka Kembali WhatsApp ({CHECKOUT_WHATSAPP_NUMBER})</span>
                </button>

                <button
                  onClick={handleClearAndClose}
                  className="w-full py-3 px-4 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-terracotta"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Pesanan Sudah Terkirim, Kosongkan Keranjang</span>
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="w-full py-2.5 text-xs text-charcoal-600 hover:text-forest-900 transition-colors"
                >
                  Tutup & Kembali ke Menu
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Order Items Preview Pill */}
              <div className="p-3 rounded-2xl bg-ivory-100 border border-ivory-300 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-forest-900 font-semibold">
                  <ShoppingBag className="w-4 h-4 text-terracotta-500" />
                  <span>{cart.length} Menu ({cart.reduce((s, i) => s + i.quantity, 0)} Porsi)</span>
                </div>
                <span className="font-bold text-forest-950 text-sm">
                  Total: {formatRupiah(totalAmount)}
                </span>
              </div>

              {errors.cart && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.cart}</span>
                </div>
              )}

              {/* Customer Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-forest-950 flex items-center gap-1.5 uppercase tracking-wide">
                  <User className="w-3.5 h-3.5 text-terracotta-500" />
                  <span>Nama Pelanggan <span className="text-rose-500">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => {
                    setFormData({ ...formData, customerName: e.target.value });
                    if (errors.customerName) setErrors({ ...errors, customerName: '' });
                  }}
                  placeholder="Contoh: Budi Santoso / Sarah"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 bg-white ${
                    errors.customerName
                      ? 'border-rose-400 focus:ring-rose-400'
                      : 'border-sage-300 focus:ring-terracotta-400'
                  }`}
                />
                {errors.customerName && (
                  <p className="text-[11px] text-rose-600 font-medium">{errors.customerName}</p>
                )}
              </div>

              {/* Customer Phone / WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-forest-950 flex items-center gap-1.5 uppercase tracking-wide">
                  <Phone className="w-3.5 h-3.5 text-terracotta-500" />
                  <span>Nomor WhatsApp Aktif <span className="text-rose-500">*</span></span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.customerPhone}
                  onChange={(e) => {
                    setFormData({ ...formData, customerPhone: e.target.value });
                    if (errors.customerPhone) setErrors({ ...errors, customerPhone: '' });
                  }}
                  placeholder="Contoh: 08123456789 atau 628123456789"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 bg-white ${
                    errors.customerPhone
                      ? 'border-rose-400 focus:ring-rose-400'
                      : 'border-sage-300 focus:ring-terracotta-400'
                  }`}
                />
                {errors.customerPhone && (
                  <p className="text-[11px] text-rose-600 font-medium">{errors.customerPhone}</p>
                )}
              </div>

              {/* Order Type Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-forest-950 uppercase tracking-wide block">
                  Jenis Pesanan <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['Dine-in', 'Pickup', 'Delivery'] as OrderType[]).map((type) => {
                    const isSelected = formData.orderType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, orderType: type });
                          if (errors.deliveryAddress) setErrors({ ...errors, deliveryAddress: '' });
                        }}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-forest-900 text-white border-forest-900 shadow-sm'
                            : 'bg-white text-charcoal-700 border-sage-200 hover:border-terracotta-300'
                        }`}
                      >
                        {type === 'Dine-in' && '🍽️ Makan di Tempat'}
                        {type === 'Pickup' && '🛍️ Ambil Sendiri'}
                        {type === 'Delivery' && '🛵 Pesan Antar'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conditional Delivery Address */}
              {formData.orderType === 'Delivery' && (
                <div className="space-y-1.5 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <label className="text-xs font-bold text-forest-950 flex items-center gap-1.5 uppercase tracking-wide">
                    <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                    <span>Alamat Lengkap Pengiriman <span className="text-rose-500">*</span></span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.deliveryAddress}
                    onChange={(e) => {
                      setFormData({ ...formData, deliveryAddress: e.target.value });
                      if (errors.deliveryAddress) setErrors({ ...errors, deliveryAddress: '' });
                    }}
                    placeholder="Nama jalan, nomor rumah/villa/hotel, patokan lokasi..."
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 bg-white ${
                      errors.deliveryAddress
                        ? 'border-rose-400 focus:ring-rose-400'
                        : 'border-sage-300 focus:ring-terracotta-400'
                    }`}
                  />
                  {errors.deliveryAddress && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors.deliveryAddress}</p>
                  )}
                  <p className="text-[11px] text-amber-800">
                    * Ongkos kirim akan dihitung oleh tim restoran via WhatsApp sesuai jarak lokasi pengantaran.
                  </p>
                </div>
              )}

              {/* Preferred Order Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-forest-950 flex items-center gap-1.5 uppercase tracking-wide">
                  <Clock className="w-3.5 h-3.5 text-terracotta-500" />
                  <span>Waktu Pengambilan / Penyajian</span>
                </label>
                <input
                  type="text"
                  value={formData.orderTime}
                  onChange={(e) => setFormData({ ...formData, orderTime: e.target.value })}
                  placeholder="Contoh: Secepatnya / Hari ini jam 13:00 WITA"
                  className="w-full px-4 py-2.5 rounded-xl border border-sage-300 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 bg-white"
                />
              </div>

              {/* General Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-forest-950 flex items-center gap-1.5 uppercase tracking-wide">
                  <FileText className="w-3.5 h-3.5 text-terracotta-500" />
                  <span>Catatan Tambahan untuk Kasir (Opsional)</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.generalNotes}
                  onChange={(e) => setFormData({ ...formData, generalNotes: e.target.value })}
                  placeholder="Contoh: Siapkan struk, packing terpisah, dll."
                  className="w-full px-4 py-2 rounded-xl border border-sage-300 text-xs focus:outline-none focus:ring-2 focus:ring-terracotta-400 bg-white"
                />
              </div>

              {/* Confirmation Terms Checkbox */}
              <div className="space-y-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-charcoal-800 leading-normal">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => {
                      setFormData({ ...formData, agreedToTerms: e.target.checked });
                      if (errors.agreedToTerms) setErrors({ ...errors, agreedToTerms: '' });
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-sage-300 text-terracotta-500 focus:ring-terracotta-400"
                  />
                  <span>
                    Saya memahami pesanan akan diteruskan ke WhatsApp PIC LN Fortunate Coffee untuk konfirmasi stok, ongkir, dan pembayaran via QRIS/Transfer.
                  </span>
                </label>
                {errors.agreedToTerms && (
                  <p className="text-[11px] text-rose-600 font-medium">{errors.agreedToTerms}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-sage-200">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-terracotta hover:shadow-xl"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesanan ke WhatsApp ({formatRupiah(totalAmount)})</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
