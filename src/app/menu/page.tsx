'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MENU_ITEMS } from '@/data/menu';
import { MenuItem } from '@/types/menu';
import { MenuCard } from '@/components/MenuCard';
import { MenuFilters } from '@/components/MenuFilters';
import { Sparkles, Utensils, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function MenuCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Menu';
  const initialSub = searchParams.get('sub') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState(initialSub);
  const [selectedBadge, setSelectedBadge] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Sync if URL search params change
  useEffect(() => {
    const cat = searchParams.get('category');
    const sub = searchParams.get('sub');
    if (cat) setSelectedCategory(cat);
    if (sub) setSelectedSubCategory(sub);
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item: MenuItem) => {
      // 1. Search Query filter (name & ingredients)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesIng = item.ingredients.toLowerCase().includes(q);
        const matchesSub = item.subCategory.toLowerCase().includes(q);
        if (!matchesName && !matchesIng && !matchesSub) {
          return false;
        }
      }

      // 2. Main Category Filter
      if (selectedCategory !== 'All Menu') {
        if (item.mainCategory !== selectedCategory) {
          return false;
        }
      }

      // 3. Sub Category Filter
      if (selectedSubCategory !== 'All') {
        if (item.subCategory !== selectedSubCategory) {
          return false;
        }
      }

      // 4. Badge Filter
      if (selectedBadge !== 'All') {
        if (!item.labels.includes(selectedBadge)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return a.id - b.id; // default original order
    });
  }, [searchQuery, selectedCategory, selectedSubCategory, selectedBadge, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Menu');
    setSelectedSubCategory('All');
    setSelectedBadge('All');
    setSortBy('default');
  };

  return (
    <div className="pt-28 pb-24 lg:pt-32 lg:pb-32 bg-ivory-100/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/10 text-terracotta-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            <span>150+ Pilihan Menu Plant-Based</span>
          </div>
          <h1 className="font-serif text-3.5xl sm:text-4xl lg:text-5xl font-bold text-forest-950 tracking-tight">
            Katalog Menu Lengkap
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700 mt-3 font-light leading-relaxed">
            Pilih makanan, minuman, camilan, dessert, atau gelato favorit Anda. Masukkan ke keranjang dan kirim pesanan langsung ke WhatsApp kasir.
          </p>
        </div>

        {/* Filter Controls Panel */}
        <div className="mb-10">
          <MenuFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            selectedBadge={selectedBadge}
            setSelectedBadge={setSelectedBadge}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalFilteredCount={filteredItems.length}
            totalItemsCount={MENU_ITEMS.length}
            onReset={handleResetFilters}
          />
        </div>

        {/* Menu Grid / Empty State */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto p-8 rounded-3xl bg-white border border-sage-200 shadow-soft space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-ivory-200 text-sage-400 mx-auto flex items-center justify-center">
              <Utensils className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-forest-950">
                Menu Tidak Ditemukan
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600">
                Tidak ada hidangan yang cocok dengan kriteria filter atau kata kunci pencarian Anda.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Semua Filter</span>
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 text-center flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-terracotta-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm text-forest-900 font-medium">Memuat katalog menu...</p>
        </div>
      }
    >
      <MenuCatalogContent />
    </Suspense>
  );
}
