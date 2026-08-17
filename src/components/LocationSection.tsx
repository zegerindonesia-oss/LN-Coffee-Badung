'use client';

import React, { useEffect, useState } from 'react';
import { BUSINESS_INFO } from '@/data/business';
import { OpeningStatusBadge } from './OpeningStatusBadge';
import { getStoreStatus } from '@/lib/opening-hours';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  BookOpen,
  Navigation,
  Sparkles,
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [currentDayName, setCurrentDayName] = useState<string>('');

  useEffect(() => {
    const status = getStoreStatus();
    setCurrentDayName(status.currentDayName);
  }, []);

  return (
    <section id="location" className="py-20 lg:py-28 bg-ivory-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/10 text-forest-900 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
            <span>Lokasi & Jam Operasional</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 tracking-tight">
            Kunjungi Kami di Kapal, Bali
          </h2>
          <p className="text-sm sm:text-base text-charcoal-700 mt-3 font-light">
            Tempat yang tenang dan asri di Mengwi, Badung. Mudah dijangkau dari Denpasar, Canggu, maupun Ubud.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Info Column (Address, Hours Table, Actions) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="p-6 rounded-3xl bg-white border border-sage-200 shadow-soft space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-forest-950">
                    {BUSINESS_INFO.name}
                  </h3>
                  <p className="text-xs text-sage-700 font-semibold uppercase tracking-wider mt-0.5">
                    Badung, Bali
                  </p>
                </div>
                <OpeningStatusBadge />
              </div>

              <div className="pt-2 flex items-start gap-3 text-sm text-charcoal-800">
                <MapPin className="w-5 h-5 text-terracotta-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-light">{BUSINESS_INFO.address}</p>
              </div>

              <div className="flex items-center gap-3 text-sm text-charcoal-800">
                <Phone className="w-5 h-5 text-terracotta-500 shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.publicPhone}`}
                  className="font-medium hover:text-terracotta-600 transition-colors"
                >
                  {BUSINESS_INFO.publicPhoneDisplay}
                </a>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Navigation className="w-4 h-4 text-terracotta-400" />
                  <span>Buka Google Maps</span>
                </a>
                <a
                  href={`tel:${BUSINESS_INFO.publicPhone}`}
                  className="py-3 px-4 rounded-xl bg-ivory-200 hover:bg-ivory-300 text-forest-950 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-forest-800" />
                  <span>Hubungi Telepon</span>
                </a>
              </div>
            </div>

            {/* Hours Table Card */}
            <div className="p-6 rounded-3xl bg-white border border-sage-200 shadow-soft space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-sage-100">
                <h4 className="font-serif font-bold text-base text-forest-950 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-terracotta-500" />
                  <span>Jadwal Operasional (WITA)</span>
                </h4>
                <span className="text-[11px] text-charcoal-500 font-medium">
                  Last order: -30 mnt
                </span>
              </div>

              <div className="divide-y divide-sage-100 text-xs">
                {BUSINESS_INFO.operatingHours.map((sched) => {
                  const isToday = currentDayName === sched.day;
                  return (
                    <div
                      key={sched.day}
                      className={`py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                        isToday
                          ? 'bg-forest-50 font-bold text-forest-900 border border-forest-100'
                          : 'text-charcoal-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isToday && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        <span>{sched.day}</span>
                        {isToday && (
                          <span className="text-[10px] bg-forest-900 text-white px-1.5 py-0.5 rounded font-normal">
                            Hari ini
                          </span>
                        )}
                      </span>
                      <span
                        className={
                          sched.isOpen ? 'font-medium text-forest-950' : 'text-rose-600 font-semibold'
                        }
                      >
                        {sched.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Platforms & Digital Flipbook Menu Links */}
            <div className="p-5 rounded-3xl bg-forest-900 text-white space-y-3 shadow-card">
              <p className="text-xs font-semibold text-sage-300 uppercase tracking-wider">
                Layanan Antar & Buku Menu Digital
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <a
                  href={BUSINESS_INFO.gofoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>GoFood</span>
                  <ExternalLink className="w-3 h-3 text-terracotta-400" />
                </a>
                <a
                  href={BUSINESS_INFO.grabfoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>GrabFood</span>
                  <ExternalLink className="w-3 h-3 text-terracotta-400" />
                </a>
                <a
                  href={BUSINESS_INFO.menuBookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Buku Menu</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed Column */}
          <div className="lg:col-span-7 h-[420px] lg:h-[620px] rounded-3xl overflow-hidden shadow-card border border-sage-200 bg-ivory-200 relative">
            <iframe
              src={BUSINESS_INFO.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi LN Fortunate Coffee Kapal"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
