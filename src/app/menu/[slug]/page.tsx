import React from 'react';
import { notFound } from 'next/navigation';
import { MENU_ITEMS } from '@/data/menu';
import { MenuItemDetailClient } from './MenuItemDetailClient';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return MENU_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = MENU_ITEMS.find((m) => m.slug === slug);
  if (!item) {
    return {
      title: 'Menu Tidak Ditemukan | LN Fortunate Coffee',
    };
  }

  return {
    title: `${item.name} | LN Fortunate Coffee Kapal Bali`,
    description: `${item.name} - ${item.ingredients || 'Hidangan plant-based pilihan'}. Nikmati di LN Fortunate Coffee Kapal Badung Bali.`,
    openGraph: {
      title: `${item.name} - LN Fortunate Coffee Bali`,
      description: item.ingredients || 'Hidangan vegan dan plant-based terbaik di Bali.',
      images: [{ url: item.image }],
    },
  };
}

export default async function MenuItemPage({ params }: Props) {
  const { slug } = await params;
  const item = MENU_ITEMS.find((m) => m.slug === slug);

  if (!item) {
    notFound();
  }

  const relatedItems = MENU_ITEMS.filter(
    (rel) => rel.id !== item.id && rel.mainCategory === item.mainCategory
  ).slice(0, 4);

  return <MenuItemDetailClient item={item} relatedItems={relatedItems} />;
}
