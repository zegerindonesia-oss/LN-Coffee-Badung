'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Utensils, ShoppingBag, UserCheck, Send, ArrowRight } from 'lucide-react';

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
    desc: 'Lengkapi nama, nomor WhatsApp aktif, dan pilih metode Dine In, Take Away, Delivery, atau Pesanan Terjadwal.',
    icon: UserCheck,
  },
  {
    step: '04',
    title: 'Kirim via WhatsApp',
    desc: 'Detail pesanan terkirim otomatis ke WhatsApp kasir & tersimpan ke Google Sheet.',
    icon: Send,
  },
];

export const HowToOrder: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white text-slate-800 relative overflow-hidden">
      {/* Prominent Background Green Wave SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg
          className="absolute -top-16 -left-16 w-[750px] sm:w-[1000px] opacity-35 text-emerald-600 mix-blend-multiply"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,200 C350,100 550,450 400,850 C300,1080 100,1150 0,1200 Z"
            fill="url(#order-green-wave-1)"
          />
          <defs>
            <linearGradient id="order-green-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#065F46" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            Cara Pemesanan
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F291E] tracking-tight">
            Pesan Praktis dalam 4 Langkah
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal">
            Tanpa perlu instal aplikasi atau pembayaran rumit. Pesanan Anda langsung terhubung ke kasir restoran kami.
          </p>
        </div>

        {/* Steps Forest Green Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="p-6 rounded-[2rem] bg-gradient-to-br from-[#0F291E] via-emerald-900 to-[#0B2218] text-white border border-emerald-800 shadow-md relative flex flex-col justify-between group hover:border-emerald-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-emerald-400">
                      {s.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center group-hover:bg-emerald-600 transition-all shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-emerald-100/90 font-normal leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-800/80 text-[11px] text-emerald-300 font-bold">
                  {idx === 3 ? '💬 WhatsApp & Google Sheet Sync' : `Langkah ${idx + 1} dari 4`}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-r from-[#0F291E] via-emerald-900 to-[#0B2218] text-white text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-800">
          <div className="text-left">
            <h4 className="text-lg font-bold text-white">
              Siap Menikmati Hidangan Lezat & Sehat?
            </h4>
            <p className="text-xs text-emerald-200 mt-1 font-normal">
              Buka katalog menu sekarang dan kirim pesanan Anda langsung ke WhatsApp kasir.
            </p>
          </div>
          <Link
            href="/menu"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
          >
            <span>Buka Menu Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
