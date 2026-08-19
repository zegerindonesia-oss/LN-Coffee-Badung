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
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [currentDayName, setCurrentDayName] = useState<string>('');

  useEffect(() => {
    const status = getStoreStatus();
    setCurrentDayName(status.currentDayName);
  }, []);

  return (
    <section id="location" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            Lokasi & Jam Operasional
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F291E] tracking-tight">
            Kunjungi Kami di Kapal, Bali
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 font-normal">
            Tempat yang tenang dan asri di Mengwi, Badung. Mudah dijangkau dari Denpasar, Canggu, maupun Ubud.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Info Column (Address, Hours Table, Actions) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="p-6 rounded-[2rem] bg-white border border-slate-200 shadow-md space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-extrabold text-[#0F291E]">
                    {BUSINESS_INFO.name}
                  </h3>
                  <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider mt-0.5">
                    Badung, Bali
                  </p>
                </div>
                <OpeningStatusBadge />
              </div>

              <div className="pt-2 flex items-start gap-3 text-sm text-slate-700">
                <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-normal">{BUSINESS_INFO.address}</p>
              </div>

              <div className="pt-2 space-y-2.5 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-1" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={BUSINESS_INFO.customerCareWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                        title="Chat WhatsApp Customer Care"
                      >
                        {BUSINESS_INFO.customerCarePhone}
                      </a>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        Customer Care
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={BUSINESS_INFO.picRestaurantWaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                        title="Chat WhatsApp PIC Restaurant"
                      >
                        {BUSINESS_INFO.picRestaurantPhone}
                      </a>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        PIC Restaurant
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Navigation className="w-4 h-4 text-white" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={BUSINESS_INFO.customerCareWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-emerald-200 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp Care</span>
                </a>
              </div>
            </div>

            {/* Forest Green Operating Hours Card (Matching User Request) */}
            <div className="p-6 rounded-[2rem] bg-gradient-to-br from-[#0F291E] via-emerald-900 to-[#0B2218] text-white border border-emerald-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80">
                <h4 className="font-bold text-base text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Jadwal Operasional (WITA)</span>
                </h4>
                <span className="text-[11px] text-emerald-300 font-medium">
                  Last order: -30 mnt
                </span>
              </div>

              <div className="divide-y divide-emerald-800/60 text-xs">
                {BUSINESS_INFO.operatingHours.map((sched) => {
                  const isToday = currentDayName === sched.day;
                  return (
                    <div
                      key={sched.day}
                      className={`py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                        isToday
                          ? 'bg-emerald-800 font-extrabold text-white border border-emerald-600'
                          : 'text-emerald-100/90'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isToday && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                        <span>{sched.day}</span>
                        {isToday && (
                          <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                            Hari ini
                          </span>
                        )}
                      </span>
                      <span
                        className={
                          sched.isOpen ? 'font-bold text-white' : 'text-rose-300 font-semibold'
                        }
                      >
                        {sched.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Platforms & Digital Menu */}
            <div className="p-6 rounded-[2rem] bg-emerald-950 text-white space-y-3 shadow-lg border border-emerald-900">
              <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Layanan Antar & Buku Menu Digital
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <a
                  href={BUSINESS_INFO.gofoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>GoFood</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
                <a
                  href={BUSINESS_INFO.grabfoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>GrabFood</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
                <a
                  href={BUSINESS_INFO.menuBookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Buku Menu</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed Column */}
          <div className="lg:col-span-7 h-[420px] lg:h-[640px] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white bg-slate-100 relative">
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
