import React from 'react';
import { Hero } from '@/components/Hero';
import { SignatureSection } from '@/components/SignatureSection';
import { BrandStory } from '@/components/BrandStory';
import { CategoryGrid } from '@/components/CategoryGrid';
import { DiningExperience } from '@/components/DiningExperience';
import { HowToOrder } from '@/components/HowToOrder';
import { LocationSection } from '@/components/LocationSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <SignatureSection />
      <BrandStory />
      <CategoryGrid />
      <DiningExperience />
      <HowToOrder />
      <LocationSection />
    </div>
  );
}
