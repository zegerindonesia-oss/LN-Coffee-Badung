'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Home, UtensilsCrossed, ShoppingBag, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  const isHome = pathname === '/';
  const isMenu = pathname.startsWith('/menu');

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-forest-950/95 backdrop-blur-lg border-t border-forest-800/80 px-4 py-2 text-white safe-bottom">
      <div className="flex items-center justify-around">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            isHome ? 'text-terracotta-400 font-semibold' : 'text-sage-300 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        {/* Menu */}
        <Link
          href="/menu"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
            isMenu ? 'text-terracotta-400 font-semibold' : 'text-sage-300 hover:text-white'
          }`}
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Menu</span>
        </Link>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl relative text-sage-300 hover:text-white transition-colors"
          aria-label={`Buka keranjang, ${totalItems} item`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-2 bg-terracotta-500 text-white text-[10px] font-bold min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center shadow-terracotta"
              >
                {totalItems}
              </motion.span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Keranjang</span>
        </button>

        {/* Location */}
        <Link
          href="/#location"
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-sage-300 hover:text-white transition-colors"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Lokasi</span>
        </Link>
      </div>
    </div>
  );
};
