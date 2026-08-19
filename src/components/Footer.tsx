'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS_INFO } from '@/data/business';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#06160e] text-white pt-16 pb-24 md:pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-emerald-900/60">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-emerald-200 shrink-0">
                <Image
                  src="/logo-ln-fortunate.svg"
                  alt="Logo LN Fortunate Coffee"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight text-white leading-none">
                  LN Fortunate Coffee
                </p>
                <span className="text-[11px] text-emerald-300 font-bold tracking-wider uppercase">
                  Kapal, Badung, Bali
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 font-normal leading-relaxed max-w-sm">
              Restoran dan coffee shop ramah lingkungan berbasis nabati (Loving Nature) yang menyajikan makanan sehat, kopi pilihan, camilan, dan dessert istimewa di Bali.
            </p>

            <div className="space-y-2 pt-2 text-xs text-emerald-200 font-medium">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </p>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a
                    href={BUSINESS_INFO.customerCareWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {BUSINESS_INFO.customerCarePhone} <span className="text-[10px] text-emerald-400 font-normal">(Customer Care)</span>
                  </a>
                  <a
                    href={BUSINESS_INFO.picRestaurantWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {BUSINESS_INFO.picRestaurantPhone} <span className="text-[10px] text-emerald-400 font-normal">(PIC Restaurant)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-sm text-white tracking-wide">
              Navigasi
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">
                  Katalog Menu (150+)
                </Link>
              </li>
              <li>
                <Link href="/#story" className="hover:text-white transition-colors">
                  Cerita Loving Nature
                </Link>
              </li>
              <li>
                <Link href="/#facilities" className="hover:text-white transition-colors">
                  Fasilitas & Suasana
                </Link>
              </li>
              <li>
                <Link href="/#location" className="hover:text-white transition-colors">
                  Lokasi & Jam Buka
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-sm text-white tracking-wide">
              Kategori Menu
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200 font-medium">
              <li>
                <Link href="/menu?category=Beverage" className="hover:text-white transition-colors">
                  Kopi & Minuman
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Food" className="hover:text-white transition-colors">
                  Makanan Utama & Burger
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Snack" className="hover:text-white transition-colors">
                  Camilan & Pempek
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Dessert" className="hover:text-white transition-colors">
                  Kue & Bakery
                </Link>
              </li>
              <li>
                <Link href="/menu?category=Ice%20Cream" className="hover:text-white transition-colors">
                  Classe Gelato Nabati
                </Link>
              </li>
            </ul>
          </div>

          {/* Operational Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-sm text-white tracking-wide">
              Pemesanan & Mitra
            </h4>
            <div className="space-y-2 text-xs text-emerald-200 font-medium">
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sel–Jum: 11:00–20:30 WITA</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sab–Min: 11:00–21:00 WITA</span>
              </p>
              <p className="text-[11px] text-amber-300 font-bold">
                * Senin Libur Operasional
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href={BUSINESS_INFO.gofoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white transition-colors"
              >
                <span>Pesan di GoFood</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={BUSINESS_INFO.grabfoodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white transition-colors"
              >
                <span>Pesan di GrabFood</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={BUSINESS_INFO.menuBookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white transition-colors"
              >
                <span>Buku Menu Digital Heyzine</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80 text-center sm:text-left">
          <p>© {new Date().getFullYear()} LN Fortunate Coffee Kapal. Seluruh Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1.5">
            <span>Website developed by</span>
            <span className="font-bold text-emerald-400">Flowsstack Technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
