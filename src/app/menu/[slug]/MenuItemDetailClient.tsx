'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuItem } from '@/types/menu';
import { useCart } from '@/context/CartContext';
import { formatRupiah } from '@/lib/currency';
import { MenuCard } from '@/components/MenuCard';
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  Flame,
  Check,
  Utensils,
  Share2,
  Heart,
} from 'lucide-react';
import { motion } from 'framer-motion';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop';

interface MenuItemDetailClientProps {
  item: MenuItem;
  relatedItems: MenuItem[];
}

export const MenuItemDetailClient: React.FC<MenuItemDetailClientProps> = ({
  item,
  relatedItems,
}) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('Level 1');
  const [imgSrc, setImgSrc] = useState(item.image || FALLBACK_IMAGE);
  const [isAdded, setIsAdded] = useState(false);

  const isMieGoli = item.name.toLowerCase().includes('mie goli');
  const totalPrice = item.price * quantity;

  const handleAddToCart = () => {
    addToCart(
      item,
      quantity,
      notes.trim(),
      isMieGoli ? selectedLevel : undefined
    );
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsCartOpen(true);
    }, 500);
  };

  return (
    <div className="pt-28 pb-24 lg:pt-32 lg:pb-32 bg-ivory-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-forest-900 hover:text-terracotta-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Menu</span>
          </Link>
        </div>

        {/* Main Product Detail Grid */}
        <div className="bg-white rounded-3xl border border-sage-200 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 mb-16">
          {/* Image Column */}
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] lg:aspect-auto lg:min-h-[500px] bg-ivory-200">
            <Image
              src={imgSrc}
              alt={item.name}
              fill
              priority
              className="object-cover"
              onError={() => setImgSrc(FALLBACK_IMAGE)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 via-transparent to-transparent" />
            
            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-forest-900/90 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                {item.mainCategory}
              </span>
              {item.labels.map((lbl) => (
                <span
                  key={lbl}
                  className="px-3 py-1 rounded-full bg-terracotta-500 text-white text-xs font-semibold shadow-sm"
                >
                  {lbl}
                </span>
              ))}
            </div>
          </div>

          {/* Details & Action Column */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-sage-600 uppercase tracking-widest block mb-1">
                  {item.subCategory}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
                  {item.name}
                </h1>
                <p className="text-xs text-charcoal-500 mt-1">
                  Porsi / Ukuran: <span className="font-semibold text-charcoal-800">{item.size}</span>
                </p>
              </div>

              {/* Price */}
              <div className="py-3 border-y border-sage-100 flex items-baseline gap-3">
                <span className="text-xs text-charcoal-500 uppercase">Harga:</span>
                <span className="font-sans font-bold text-3xl text-terracotta-600">
                  {formatRupiah(item.price)}
                </span>
              </div>

              {/* Ingredients */}
              <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-200">
                <h3 className="text-xs font-bold text-forest-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Utensils className="w-4 h-4 text-terracotta-500" />
                  <span>Komposisi & Bahan-Bahan</span>
                </h3>
                <p className="text-sm text-charcoal-700 leading-relaxed">
                  {item.ingredients ||
                    'Racikan hidangan plant-based alami yang diolah secara higienis tanpa produk hewani atau MSG.'}
                </p>
              </div>

              {/* Spicy Level for Mie Goli */}
              {isMieGoli && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-forest-950 flex items-center gap-1.5 uppercase tracking-wide">
                    <Flame className="w-4 h-4 text-terracotta-500" />
                    <span>Pilihan Level Pedas:</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['Level 1 (Pedas Sedang)', 'Level 2 (Pedas Mantap)', 'Level 3 (Pedas Ekstra)'].map((lvl) => {
                      const isSelected = selectedLevel === lvl;
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setSelectedLevel(lvl)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-terracotta-500 border-terracotta-500 text-white shadow-sm'
                              : 'bg-white border-sage-200 text-charcoal-800 hover:border-terracotta-300'
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-forest-950 uppercase tracking-wide block">
                  Catatan Khusus
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Kurangi manis, sambal dipisah..."
                  className="w-full px-4 py-2.5 rounded-xl border border-sage-300 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 bg-white"
                />
              </div>
            </div>

            {/* Stepper and Action */}
            <div className="pt-6 border-t border-sage-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-charcoal-700 uppercase">Jumlah:</span>
                  <div className="inline-flex items-center rounded-xl border border-sage-300 bg-white shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="p-2.5 text-charcoal-700 hover:bg-ivory-100 disabled:opacity-30"
                      aria-label="Kurangi jumlah"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-forest-950">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 text-charcoal-700 hover:bg-ivory-100"
                      aria-label="Tambah jumlah"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-charcoal-500 block">Total</span>
                  <span className="font-sans font-bold text-2xl text-forest-950">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-6 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-white font-semibold text-base flex items-center justify-center gap-2 transition-all shadow-terracotta hover:shadow-xl"
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Ditambahkan ke Keranjang</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Tambahkan ke Keranjang • {formatRupiah(totalPrice)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Related Items Showcase */}
        {relatedItems.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              Menu Rekomendasi Terkait
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((rel) => (
                <MenuCard key={rel.id} item={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
