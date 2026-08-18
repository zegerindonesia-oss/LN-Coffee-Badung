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
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  FileText,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  RotateCcw,
  UtensilsCrossed,
  Package,
  Bike,
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

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    orderType: 'Dine In',
    tableNumber: '',
    deliveryAddress: '',
    scheduledDate: todayStr,
    scheduledTime: '12:00',
    orderTime: 'Secepatnya',
    generalNotes: '',
    agreedToTerms: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (
      formData.customerEmail.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail.trim())
    ) {
      newErrors.customerEmail = 'Masukkan alamat email yang valid.';
    }

    const cleanedPhone = formData.customerPhone.replace(/[^0-9+]/g, '');
    if (!cleanedPhone) {
      newErrors.customerPhone = 'Nomor WhatsApp wajib diisi.';
    } else if (cleanedPhone.length < 9 || cleanedPhone.length > 15) {
      newErrors.customerPhone = 'Masukkan nomor telepon/WhatsApp yang valid (9-15 digit).';
    }

    if (formData.orderType === 'Delivery' && !formData.deliveryAddress?.trim()) {
      newErrors.deliveryAddress = 'Alamat pengiriman wajib diisi untuk Delivery.';
    }

    if (formData.orderType === 'Dine In' && !formData.tableNumber?.trim()) {
      newErrors.tableNumber = 'Nomor meja wajib diisi untuk Dine In (isikan "Kasir" jika belum dapat meja).';
    }

    if (formData.orderType === 'Pesanan Terjadwal') {
      if (!formData.scheduledDate) {
        newErrors.scheduledDate = 'Pilih tanggal pesanan terjadwal.';
      }
      if (!formData.scheduledTime) {
        newErrors.scheduledTime = 'Pilih jam pesanan terjadwal.';
      }
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'Harap centang persetujuan konfirmasi pesanan.';
    }

    if (cart.length === 0) {
      newErrors.cart = 'Keranjang belanja Anda masih kosong.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const ref = generateOrderReference();
    setOrderRef(ref);

    const orderPayload = {
      orderRef: ref,
      orderDate: new Date().toISOString(),
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      orderType: formData.orderType,
      tableNumber: formData.tableNumber,
      deliveryAddress: formData.deliveryAddress,
      scheduledDate: formData.scheduledDate,
      scheduledTime: formData.scheduledTime,
      generalNotes: formData.generalNotes,
      items: cart,
      totalAmount,
    };

    // Save summary locally
    setLastOrder({
      orderRef: ref,
      orderDate: new Date().toISOString(),
      customerInfo: formData,
      items: [...cart],
      totalAmount,
    });

    // Post data to Next.js API route for Google Sheet sync
    try {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
    } catch (err) {
      console.error('API order sync error:', err);
    }

    // Launch WhatsApp
    openWhatsAppCheckout(formData, cart, totalAmount, ref);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClearAndClose = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCheckoutOpen(false)}
        className="fixed inset-0 bg-charcoal-950/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="relative w-full max-w-xl bg-forest-950/95 border border-white/20 rounded-3xl shadow-2xl overflow-hidden z-10 text-white max-h-[92vh] flex flex-col backdrop-blur-xl"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-forest-900/90 border-b border-forest-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold leading-tight text-white">
                {isSubmitted ? 'Pesanan Berhasil Dicatat' : 'Checkout & Pesanan Web'}
              </h2>
              <p className="text-xs text-sage-300">
                LN Fortunate Coffee • Kapal, Badung, Bali
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-sage-300 hover:text-white hover:bg-forest-800 transition-colors"
            aria-label="Tutup checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
          {isSubmitted ? (
            /* Success View */
            <div className="space-y-6 text-center py-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-white">
                  Pesanan & Data Tersimpan!
                </h3>
                <p className="text-xs sm:text-sm text-sage-200 max-w-md mx-auto leading-relaxed">
                  Data Anda telah otomatis disinkronkan ke Google Sheet dan pesan WhatsApp resmi telah disiapkan.
                </p>
              </div>

              {/* Summary Box */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-left space-y-2.5 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sage-300">No. Referensi:</span>
                  <span className="font-mono font-bold text-white text-sm bg-forest-900 px-2.5 py-0.5 rounded-lg border border-forest-700">
                    {orderRef}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-sage-300">Pemesan:</span>
                  <span className="font-semibold text-white">
                    {formData.customerName} ({formData.orderType})
                  </span>
                </div>
                {formData.customerEmail && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sage-300">Email:</span>
                    <span className="font-mono text-sage-200">{formData.customerEmail}</span>
                  </div>
                )}
                {formData.orderType === 'Pesanan Terjadwal' && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-sage-300">Jadwal Penyajian:</span>
                    <span className="font-bold text-emerald-400">
                      {formData.scheduledDate} jam {formData.scheduledTime}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
                  <span className="text-sage-300 font-medium">Total Pembayaran:</span>
                  <span className="font-bold text-emerald-400 text-base">
                    {formatRupiah(totalAmount)}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-200 text-left leading-relaxed">
                💡 <span className="font-bold">Informasi:</span> Jika jendela WhatsApp belum terbuka otomatis di perangkat Anda, silakan klik tombol di bawah untuk menyelesaikan konfirmasi stok & pembayaran.
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => openWhatsAppCheckout(formData, cart, totalAmount, orderRef)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Buka Kembali WhatsApp ({CHECKOUT_WHATSAPP_NUMBER})</span>
                </button>

                <button
                  onClick={handleClearAndClose}
                  className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Kosongkan Keranjang & Pesan Lagi</span>
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Order Cart Summary Banner */}
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-between text-xs backdrop-blur-md">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  <span>{cart.length} Jenis Menu ({cart.reduce((s, i) => s + i.quantity, 0)} Porsi)</span>
                </div>
                <span className="font-bold text-emerald-400 text-sm">
                  {formatRupiah(totalAmount)}
                </span>
              </div>

              {errors.cart && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errors.cart}</span>
                </div>
              )}

              {/* Order Type Selector Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-sage-200 uppercase tracking-wide block">
                  Pilih Mode Pesanan <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Dine In', 'Take Away', 'Delivery', 'Pesanan Terjadwal'] as OrderType[]).map((type) => {
                    const isSelected = formData.orderType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, orderType: type });
                          setErrors({ ...errors, deliveryAddress: '', tableNumber: '', scheduledDate: '' });
                        }}
                        className={`py-2.5 px-2 rounded-xl border text-[11px] sm:text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950/50'
                            : 'bg-white/5 text-sage-300 border-white/10 hover:bg-white/15 hover:text-white'
                        }`}
                      >
                        {type === 'Dine In' && <UtensilsCrossed className="w-3.5 h-3.5" />}
                        {type === 'Take Away' && <Package className="w-3.5 h-3.5" />}
                        {type === 'Delivery' && <Bike className="w-3.5 h-3.5" />}
                        {type === 'Pesanan Terjadwal' && <Calendar className="w-3.5 h-3.5" />}
                        <span className="text-center">{type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Inputs Based on Order Type */}
              {formData.orderType === 'Dine In' && (
                <div className="space-y-1.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <label className="text-xs font-bold text-sage-200 flex items-center gap-1.5 uppercase tracking-wide">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Nomor Meja <span className="text-rose-400">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tableNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, tableNumber: e.target.value });
                      if (errors.tableNumber) setErrors({ ...errors, tableNumber: '' });
                    }}
                    placeholder="Contoh: Meja 05 (atau ketik 'Kasir')"
                    className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-forest-900/90 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  {errors.tableNumber && (
                    <p className="text-[11px] text-rose-400 font-medium">{errors.tableNumber}</p>
                  )}
                </div>
              )}

              {formData.orderType === 'Delivery' && (
                <div className="space-y-1.5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wide">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Alamat Pengiriman Lengkap <span className="text-rose-400">*</span></span>
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
                    className="w-full px-3.5 py-2 rounded-xl border border-white/20 bg-forest-900/90 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  {errors.deliveryAddress && (
                    <p className="text-[11px] text-rose-400 font-medium">{errors.deliveryAddress}</p>
                  )}
                  <p className="text-[11px] text-amber-300/80">
                    * Ongkos kirim akan dihitung oleh tim restoran via WhatsApp sesuai jarak lokasi pengantaran.
                  </p>
                </div>
              )}

              {formData.orderType === 'Pesanan Terjadwal' && (
                <div className="space-y-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
                    <Calendar className="w-4 h-4" />
                    <span>Pilih Tanggal & Jam Pesanan Terjadwal</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-sage-300 font-medium">Tanggal Pengambilan / Makan:</label>
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={formData.scheduledDate}
                        onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-white/20 bg-forest-900/90 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-sage-300 font-medium">Jam Pengambilan / Makan:</label>
                      <input
                        type="time"
                        required
                        value={formData.scheduledTime}
                        onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-white/20 bg-forest-900/90 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-emerald-300/80">
                    * Jam operasional dapur: 11:00 – 20:30 WITA (Selasa–Minggu).
                  </p>
                </div>
              )}

              {/* Customer Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-sage-200 flex items-center gap-1.5 uppercase tracking-wide">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nama Lengkap Pelanggan <span className="text-rose-400">*</span></span>
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
                  className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-sage-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                {errors.customerName && (
                  <p className="text-[11px] text-rose-400 font-medium">{errors.customerName}</p>
                )}
              </div>

              {/* Customer Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-sage-200 flex items-center gap-1.5 uppercase tracking-wide">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Alamat Email (Untuk Bukti & Data Customer)</span>
                </label>
                <input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => {
                    setFormData({ ...formData, customerEmail: e.target.value });
                    if (errors.customerEmail) setErrors({ ...errors, customerEmail: '' });
                  }}
                  placeholder="Contoh: budi@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-sage-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                {errors.customerEmail && (
                  <p className="text-[11px] text-rose-400 font-medium">{errors.customerEmail}</p>
                )}
              </div>

              {/* Customer Phone / WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-sage-200 flex items-center gap-1.5 uppercase tracking-wide">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nomor WhatsApp Aktif <span className="text-rose-400">*</span></span>
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
                  className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-sage-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                {errors.customerPhone && (
                  <p className="text-[11px] text-rose-400 font-medium">{errors.customerPhone}</p>
                )}
              </div>

              {/* General Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-sage-200 flex items-center gap-1.5 uppercase tracking-wide">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Catatan Tambahan untuk Kasir (Opsional)</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.generalNotes}
                  onChange={(e) => setFormData({ ...formData, generalNotes: e.target.value })}
                  placeholder="Contoh: Tanpa saus pedas, bungkus terpisah, siapkan struk..."
                  className="w-full px-4 py-2 rounded-xl border border-white/20 bg-white/10 text-white placeholder-sage-400 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              {/* Confirmation Terms Checkbox */}
              <div className="space-y-1 pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-sage-300 leading-normal">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => {
                      setFormData({ ...formData, agreedToTerms: e.target.checked });
                      if (errors.agreedToTerms) setErrors({ ...errors, agreedToTerms: '' });
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-white/30 text-emerald-500 focus:ring-emerald-400"
                  />
                  <span>
                    Saya setuju data pesanan ini disimpan ke database Google Sheet restoran dan diteruskan ke WhatsApp resmi LN Fortunate Coffee.
                  </span>
                </label>
                {errors.agreedToTerms && (
                  <p className="text-[11px] text-rose-400 font-medium">{errors.agreedToTerms}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-white/10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-emerald-950/50 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? 'Menyimpan & Menghubungkan...'
                      : `Kirim Pesanan ke WhatsApp (${formatRupiah(totalAmount)})`}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
