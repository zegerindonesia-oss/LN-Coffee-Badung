'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Utensils, ShoppingBag, UserCheck, Send, Sparkles, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Pilih Menu Favorit',
    desc: 'Jelajahi 150+ pilihan makanan vegan, specialty coffee, camilan, hingga dessert buatan kami.',
    icon: Utensils,
  },
  {
    step: '02',
    title: 'Masukkan ke Keranjang',
    desc: 'Tentukan jumlah porsi, level pedas (jika mie goli), serta catatan khusus sesuai keinginan Anda.',
    icon: ShoppingBag,
  },
  {
    step: '03',
    title: 'Isi Data Pemesan',
    desc: 'Lengkapi nama, nomor WhatsApp aktif, dan pilih metode Dine-in, Pickup, atau Delivery.',
    icon: UserCheck,
  },
  {
    step: '04',
    title: 'Kirim via WhatsApp',
    desc: 'Detail pesanan terkirim otomatis ke WhatsApp kasir. Tim kami akan mengonfirmasi total dan pembayaran.',
    icon: Send,
  },
];

export const HowToOrder: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-forest-950 text-white relative overflow-hidden">
      {/* Decorative Gradient Blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-forest-900/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/20 text-terracotta-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
            <span>Cara Pemesanan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Pesan Praktis dalam 4 Langkah
          </h2>
          <p className="text-sm sm:text-base text-sage-200 mt-3 font-light">
            Tanpa perlu instal aplikasi atau pembayaran rumit. Pesanan Anda langsung terhubung ke kasir restoran kami.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-forest-900/80 border border-forest-800 backdrop-blur-md relative flex flex-col justify-between group hover:border-terracotta-500/50 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-terracotta-400">
                      {s.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-forest-800 text-sage-200 flex items-center justify-center group-hover:bg-terracotta-500 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-sage-300 font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-forest-800 text-[11px] text-sage-400 font-medium">
                  {idx === 3 ? '💬 Konfirmasi & QRIS via WhatsApp' : `Langkah ${idx + 1} dari 4`}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-forest-900 border border-forest-800 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="font-serif text-lg font-bold text-white">
              Siap Menikmati Hidangan Lezat & Sehat?
            </h4>
            <p className="text-xs text-sage-300 mt-1">
              Buka katalog menu sekarang dan kirim pesanan Anda langsung ke WhatsApp kasir.
            </p>
          </div>
          <Link
            href="/menu"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all shadow-terracotta shrink-0"
          >
            <span>Buka Menu Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
