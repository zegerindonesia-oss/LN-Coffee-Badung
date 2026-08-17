'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu as MenuIcon, X, Coffee, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
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
            ? 'bg-forest-900/95 backdrop-blur-md shadow-md py-3.5 border-b border-forest-800/80 text-white'
            : 'bg-gradient-to-b from-forest-950/80 via-forest-900/40 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400 rounded-xl"
            aria-label="LN Fortunate Coffee Kapal - Beranda"
          >
            <div className="w-10 h-10 rounded-xl bg-terracotta-500/20 border border-terracotta-500/30 flex items-center justify-center text-terracotta-400 group-hover:scale-105 group-hover:bg-terracotta-500 group-hover:text-white transition-all shadow-sm">
              <Coffee className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white leading-tight">
                LN Fortunate Coffee
              </span>
              <span className="text-[10px] sm:text-xs text-sage-300 font-medium tracking-widest uppercase">
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
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-ivory-100/90 hover:text-white hover:bg-forest-800/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-terracotta-400 rounded-full"
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
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400"
              aria-label={`Keranjang belanja, ${totalItems} item`}
            >
              <ShoppingBag className="w-5 h-5 text-terracotta-400" />
              <span className="hidden sm:inline text-xs font-semibold">Keranjang</span>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1.5 -right-1.5 sm:relative sm:top-0 sm:right-0 bg-terracotta-500 text-white text-[11px] font-bold min-w-[20px] h-[20px] px-1.5 rounded-full flex items-center justify-center shadow-terracotta animate-pulse"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* Direct Order Now CTA */}
            <Link
              href="/menu"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-terracotta hover:shadow-lg hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Order Now</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400"
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
              className="fixed inset-0 bg-charcoal-950/70 z-40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-forest-950 text-white z-50 p-6 flex flex-col justify-between shadow-2xl border-l border-forest-800 md:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-forest-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-terracotta-500/20 text-terracotta-400 flex items-center justify-center">
                      <Coffee className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-sm leading-none">LN Fortunate Coffee</p>
                      <span className="text-[10px] text-sage-300">Kapal, Mengwi, Bali</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-forest-900 text-sage-300 hover:text-white"
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
                      className="px-4 py-3 rounded-xl text-base font-medium text-ivory-100 hover:bg-forest-900 hover:text-white transition-colors flex items-center justify-between"
                    >
                      <span>{link.name}</span>
                      <span className="text-xs text-sage-400">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-forest-800 flex flex-col gap-3">
                <Link
                  href="/menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 px-4 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-center text-sm transition-all shadow-terracotta"
                >
                  Pesan Menu Sekarang
                </Link>
                <a
                  href="https://maps.app.goo.gl/HAwzoyNu1NJihaQT7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-sage-200 text-center text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-terracotta-400" />
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
