'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu as MenuIcon, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Story', href: '/#story' },
    { name: 'Menu', href: '/menu' },
    { name: 'Facilities', href: '/#facilities' },
    { name: 'Location', href: '/#location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || !isHome
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3.5 border-b border-slate-100 text-slate-800'
            : 'bg-white/90 backdrop-blur-sm py-4 border-b border-slate-100/60 text-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-xl"
            aria-label="LN Fortunate Coffee Kapal - Beranda"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-emerald-50 p-0.5 border border-emerald-200 group-hover:scale-105 transition-transform shadow-sm shrink-0">
              <Image
                src="/logo-ln-fortunate.svg"
                alt="Logo LN Fortunate Coffee"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0F291E] leading-tight">
                LN Fortunate Coffee
              </span>
              <span className="text-[10px] sm:text-xs text-emerald-700 font-bold tracking-wider uppercase">
                Kapal, Bali • Plant-Based
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all relative ${
                    isActive
                      ? 'text-emerald-800 bg-emerald-50'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-emerald-700 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Cart Button & Order CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              aria-label={`Keranjang belanja, ${totalItems} item`}
            >
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <span className="hidden sm:inline text-xs font-bold">Keranjang</span>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1 sm:relative sm:top-0 sm:right-0 bg-emerald-700 text-white text-[11px] font-bold min-w-[20px] h-[20px] px-1.5 rounded-full flex items-center justify-center shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Direct Order Now CTA */}
            <Link
              href="/menu"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Order Now</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
              aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white text-slate-800 z-50 p-6 flex flex-col justify-between shadow-2xl border-l border-slate-100 md:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-emerald-50 p-0.5 border border-emerald-200 shrink-0">
                      <Image
                        src="/logo-ln-fortunate.svg"
                        alt="Logo LN Fortunate"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-none text-[#0F291E]">LN Fortunate Coffee</p>
                      <span className="text-[10px] text-emerald-700 font-semibold">Kapal, Mengwi, Bali</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
                    aria-label="Tutup navigasi"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-6 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-full text-base font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
                    >
                      <span>{link.name}</span>
                      <span className="text-xs text-emerald-700">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                <Link
                  href="/menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3.5 px-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-center text-sm transition-all shadow-md"
                >
                  Pesan Menu Sekarang
                </Link>
                <a
                  href="https://maps.app.goo.gl/HAwzoyNu1NJihaQT7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-center text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
