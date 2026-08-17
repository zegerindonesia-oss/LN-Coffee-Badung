'use client';

import React from 'react';
import { CATEGORY_TABS, SUB_CATEGORIES_BY_MAIN } from '@/data/menu';
import {
  Search,
  X,
  SlidersHorizontal,
  Sparkles,
  Coffee,
  Utensils,
  Cookie,
  Cake,
  IceCream,
  RotateCcw,
  ArrowUpDown,
} from 'lucide-react';

interface MenuFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSubCategory: string;
  setSelectedSubCategory: (sub: string) => void;
  selectedBadge: string;
  setSelectedBadge: (badge: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  totalFilteredCount: number;
  totalItemsCount: number;
  onReset: () => void;
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'Beverage':
      return <Coffee className="w-4 h-4" />;
    case 'Food':
      return <Utensils className="w-4 h-4" />;
    case 'Snack':
      return <Cookie className="w-4 h-4" />;
    case 'Dessert':
      return <Cake className="w-4 h-4" />;
    case 'Ice Cream':
      return <IceCream className="w-4 h-4" />;
    default:
      return <Sparkles className="w-4 h-4" />;
  }
};

export const MenuFilters: React.FC<MenuFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  selectedBadge,
  setSelectedBadge,
  sortBy,
  setSortBy,
  totalFilteredCount,
  totalItemsCount,
  onReset,
}) => {
  const availableSubCategories =
    SUB_CATEGORIES_BY_MAIN[selectedCategory] || SUB_CATEGORIES_BY_MAIN['All Menu'];

  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All Menu' ||
    selectedSubCategory !== 'All' ||
    selectedBadge !== 'All' ||
    sortBy !== 'default';

  return (
    <div className="space-y-6">
      {/* Top Search Bar & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari menu, kopi, burger, mie goli, pempek, pasta..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-sage-200 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400 shadow-soft"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-charcoal-400 hover:text-charcoal-700 transition-colors"
              aria-label="Hapus kata kunci pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="relative shrink-0">
          <div className="relative">
            <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal-500 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto appearance-none pl-9 pr-8 py-3.5 rounded-2xl bg-white border border-sage-200 text-xs font-semibold text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-terracotta-400 shadow-soft cursor-pointer"
            >
              <option value="default">Urutan Standar</option>
              <option value="price-asc">Harga: Termurah</option>
              <option value="price-desc">Harga: Termahal</option>
              <option value="name-asc">Nama: A ke Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Categories Navigation Tabs */}
      <div className="overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  setSelectedSubCategory('All');
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                  isSelected
                    ? 'bg-forest-900 text-white shadow-md'
                    : 'bg-white text-charcoal-700 hover:bg-ivory-200/80 border border-sage-200/80'
                }`}
              >
                <span className={isSelected ? 'text-terracotta-400' : 'text-sage-600'}>
                  {getCategoryIcon(tab.id)}
                </span>
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-ivory-200 text-charcoal-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subcategory Pills & Special Badge Quick Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Subcategories list */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {availableSubCategories.map((sub) => {
            const isSelected = selectedSubCategory === sub;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-terracotta-500 text-white font-semibold shadow-sm'
                    : 'bg-white/80 text-charcoal-700 hover:bg-white border border-sage-200'
                }`}
              >
                {sub === 'All' ? 'Semua Subkategori' : sub}
              </button>
            );
          })}
        </div>

        {/* Quick Badge Filters (Signature / Best Seller) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedBadge(selectedBadge === 'LN Signature' ? 'All' : 'LN Signature')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
              selectedBadge === 'LN Signature'
                ? 'bg-forest-900 text-terracotta-300 border border-forest-900'
                : 'bg-white text-charcoal-700 border border-sage-200 hover:border-terracotta-300'
            }`}
          >
            <Sparkles className="w-3 h-3 text-terracotta-400" />
            <span>LN Signature</span>
          </button>

          <button
            onClick={() => setSelectedBadge(selectedBadge === 'Best Seller' ? 'All' : 'Best Seller')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedBadge === 'Best Seller'
                ? 'bg-terracotta-500 text-white border border-terracotta-500'
                : 'bg-white text-charcoal-700 border border-sage-200 hover:border-terracotta-300'
            }`}
          >
            🔥 Best Seller
          </button>
        </div>
      </div>

      {/* Results Bar & Active Filter Reset */}
      <div className="flex items-center justify-between text-xs text-charcoal-600 pt-3 border-t border-sage-200/80">
        <p>
          Menampilkan <span className="font-bold text-forest-950">{totalFilteredCount}</span> dari {totalItemsCount} hidangan
          {searchQuery && (
            <span> untuk pencarian <span className="font-semibold text-terracotta-600">&ldquo;{searchQuery}&rdquo;</span></span>
          )}
        </p>

        {isFiltered && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-terracotta-600 hover:text-terracotta-700 font-semibold underline underline-offset-2 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Semua Filter</span>
          </button>
        )}
      </div>
    </div>
  );
};
