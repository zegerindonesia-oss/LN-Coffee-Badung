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
  Calendar,
  FileText,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  RotateCcw,
  UtensilsCrossed,
  Package,
  Bike,
} from 'lucide-react';
import { motion } from 'framer-motion';

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

    const itemsText = cart
      .map(
        (i) =>
          `${i.menuItem.name}${i.selectedLevel ? ` (${i.selectedLevel})` : ''} x${i.quantity}`
      )
      .join(', ');

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
      itemsText,
      totalAmount,
    };

    setLastOrder({
      orderRef: ref,
      orderDate: new Date().toISOString(),
      customerInfo: formData,
      items: [...cart],
      totalAmount,
    });

    // 1. Post to Next.js API Route
    try {
      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
    } catch (err) {
      console.error('API order sync error:', err);
    }

    // 2. Direct client backup POST to Google Sheets Script URL if configured in env
    const clientScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SCRIPT_URL;
    if (clientScriptUrl) {
      try {
        await fetch(clientScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });
      } catch (err) {
        console.error('Direct client script post error:', err);
      }
    }

    // 3. Launch WhatsApp
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
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 text-slate-800 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#0F291E] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold leading-tight text-white">
                {isSubmitted ? 'Pesanan Berhasil Dicatat' : 'Checkout & Pesanan Web'}
              </h2>
              <p className="text-xs text-emerald-200 font-medium">
                LN Fortunate Coffee • Kapal, Badung, Bali
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-900 transition-colors"
            aria-label="Tutup checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* Success View */
            <div className="space-y-6 text-center py-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-[#0F291E]">
                  Pesanan & Data Tersimpan!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Data Anda telah otomatis disinkronkan ke Google Sheet dan pesan WhatsApp resmi telah disiapkan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold">No. Referensi:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                    {orderRef}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold">Pemesan:</span>
                  <span className="font-semibold text-slate-900">
                    {formData.customerName} ({formData.orderType})
                  </span>
                </div>
                {formData.customerEmail && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold">Email:</span>
                    <span className="font-mono text-slate-800">{formData.customerEmail}</span>
                  </div>
                )}
                {formData.orderType === 'Pesanan Terjadwal' && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold">Jadwal Penyajian:</span>
                    <span className="font-bold text-emerald-800">
                      {formData.scheduledDate} jam {formData.scheduledTime}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                  <span className="text-slate-600 font-bold">Total Pembayaran:</span>
                  <span className="font-extrabold text-emerald-800 text-base">
                    {formatRupiah(totalAmount)}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 text-left leading-relaxed">
                💡 <span className="font-bold">Informasi:</span> Jika jendela WhatsApp belum terbuka otomatis di perangkat Anda, silakan klik tombol di bawah untuk menyelesaikan konfirmasi stok & pembayaran.
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => openWhatsAppCheckout(formData, cart, totalAmount, orderRef)}
                  className="w-full py-3.5 px-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Buka Kembali WhatsApp ({CHECKOUT_WHATSAPP_NUMBER})</span>
                </button>

                <button
                  onClick={handleClearAndClose}
                  className="w-full py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Kosongkan Keranjang & Pesan Lagi</span>
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <span>{cart.length} Jenis Menu ({cart.reduce((s, i) => s + i.quantity, 0)} Porsi)</span>
                </div>
                <span className="font-extrabold text-emerald-800 text-sm">
                  {formatRupiah(totalAmount)}
                </span>
              </div>

              {errors.cart && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errors.cart}</span>
                </div>
              )}

              {/* Mode Selector */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wide block">
                  Pilih Mode Pesanan <span className="text-rose-600">*</span>
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
                        className={`py-2.5 px-2 rounded-full border text-[11px] sm:text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-md'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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

              {formData.orderType === 'Dine In' && (
                <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Nomor Meja <span className="text-rose-600">*</span></span>
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                  {errors.tableNumber && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors.tableNumber}</p>
                  )}
                </div>
              )}

              {formData.orderType === 'Delivery' && (
                <div className="space-y-1.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                  <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wide">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    <span>Alamat Pengiriman Lengkap <span className="text-rose-600">*</span></span>
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                  {errors.deliveryAddress && (
                    <p className="text-[11px] text-rose-600 font-medium">{errors.deliveryAddress}</p>
                  )}
                  <p className="text-[11px] text-amber-800">
                    * Ongkos kirim akan dihitung oleh tim restoran via WhatsApp sesuai jarak lokasi pengantaran.
                  </p>
                </div>
              )}

              {formData.orderType === 'Pesanan Terjadwal' && (
                <div className="space-y-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase tracking-wide">
                    <Calendar className="w-4 h-4" />
                    <span>Pilih Tanggal & Jam Pesanan Terjadwal</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-700 font-bold">Tanggal Pengambilan / Makan:</label>
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={formData.scheduledDate}
                        onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-700 font-bold">Jam Pengambilan / Makan:</label>
                      <input
                        type="time"
                        required
                        value={formData.scheduledTime}
                        onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-emerald-800">
                    * Jam operasional dapur: 11:00 – 20:30 WITA (Selasa–Minggu).
                  </p>
                </div>
              )}

              {/* Customer Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Nama Lengkap Pelanggan <span className="text-rose-600">*</span></span>
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                {errors.customerName && (
                  <p className="text-[11px] text-rose-600 font-medium">{errors.customerName}</p>
                )}
              </div>

              {/* Customer Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                  <Mail className="w-3.5 h-3.5 text-emerald-700" />
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                {errors.customerEmail && (
                  <p className="text-[11px] text-rose-600 font-medium">{errors.customerEmail}</p>
                )}
              </div>

              {/* Customer Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Nomor WhatsApp Aktif <span className="text-rose-600">*</span></span>
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                {errors.customerPhone && (
                  <p className="text-[11px] text-rose-600 font-medium">{errors.customerPhone}</p>
                )}
              </div>

              {/* General Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
                  <FileText className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Catatan Tambahan untuk Kasir (Opsional)</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.generalNotes}
                  onChange={(e) => setFormData({ ...formData, generalNotes: e.target.value })}
                  placeholder="Contoh: Tanpa saus pedas, bungkus terpisah, siapkan struk..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="space-y-1 pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 leading-normal">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => {
                      setFormData({ ...formData, agreedToTerms: e.target.checked });
                      if (errors.agreedToTerms) setErrors({ ...errors, agreedToTerms: '' });
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-700"
                  />
                  <span>
                    Saya setuju data pesanan ini disimpan ke database Google Sheet restoran dan diteruskan ke WhatsApp resmi LN Fortunate Coffee.
                  </span>
                </label>
                {errors.agreedToTerms && (
                  <p className="text-[11px] text-rose-600 font-medium">{errors.agreedToTerms}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-slate-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
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
