import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { MenuDetailModal } from '@/components/MenuDetailModal';
import { Toast } from '@/components/Toast';
import { BottomNav } from '@/components/BottomNav';
import { FloatingCartBar } from '@/components/FloatingCartBar';
import { BUSINESS_INFO } from '@/data/business';

export const metadata: Metadata = {
  title: 'LN Fortunate Coffee Kapal | Vegan Restaurant & Coffee in Badung, Bali',
  description:
    'Nikmati pilihan makanan plant-based, kopi, dessert, dan suasana outdoor di LN Fortunate Coffee Kapal, Mengwi, Kabupaten Badung, Bali. Pesan mudah via WhatsApp.',
  keywords: [
    'LN Fortunate Coffee',
    'Vegan Restaurant Bali',
    'Plant-Based Cafe Mengwi',
    'Coffee Shop Kapal Badung',
    'Restoran Vegan Bali',
    'Mie Pangsit Loving Nature',
    'Vegan Burger Bali',
    'Specialty Coffee Bali',
  ],
  authors: [{ name: 'LN Fortunate Coffee Kapal' }, { name: 'Flowsstack Technology' }],
  metadataBase: new URL('https://lnfortunatecoffee.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LN Fortunate Coffee Kapal | Vegan Restaurant & Coffee in Badung, Bali',
    description:
      'Nikmati hidangan vegan/plant-based, kopi pilihan, dan suasana tropis asri di LN Fortunate Coffee Kapal, Mengwi, Badung, Bali.',
    url: 'https://lnfortunatecoffee.com',
    siteName: 'LN Fortunate Coffee Kapal',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=85&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'LN Fortunate Coffee Kapal Bali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LN Fortunate Coffee Kapal | Vegan Restaurant & Coffee in Bali',
    description:
      'Nikmati hidangan vegan/plant-based, kopi pilihan, dan suasana asri di LN Fortunate Coffee Kapal, Bali.',
    images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=85&w=1200&auto=format&fit=crop'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: BUSINESS_INFO.name,
  image: [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=85&w=1200&auto=format&fit=crop',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Raya Kapal No.16',
    addressLocality: 'Mengwi, Kapal',
    addressRegion: 'Kabupaten Badung, Bali',
    postalCode: '80351',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -8.587841,
    longitude: 115.1764619,
  },
  url: 'https://lnfortunatecoffee.com',
  telephone: BUSINESS_INFO.publicPhone,
  servesCuisine: ['Vegan', 'Vegetarian', 'Plant-Based', 'Coffee', 'Indonesian', 'Dessert'],
  priceRange: BUSINESS_INFO.priceRange,
  paymentAccepted: 'Cash, QRIS, Bank Transfer',
  currenciesAccepted: 'IDR',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '11:00',
      closes: '20:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '11:00',
      closes: '21:00',
    },
  ],
  hasMenu: 'https://lnfortunatecoffee.com/menu',
  acceptsReservations: 'True',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-terracotta-500 selection:text-white">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Global Overlays & Modals */}
          <CartDrawer />
          <CheckoutModal />
          <MenuDetailModal />
          <Toast />
          <FloatingCartBar />
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
