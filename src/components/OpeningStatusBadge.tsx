'use client';

import React, { useEffect, useState } from 'react';
import { getStoreStatus, StoreStatus } from '@/lib/opening-hours';
import { Clock } from 'lucide-react';

interface OpeningStatusBadgeProps {
  showDetails?: boolean;
  className?: string;
}

export const OpeningStatusBadge: React.FC<OpeningStatusBadgeProps> = ({
  showDetails = false,
  className = '',
}) => {
  const [status, setStatus] = useState<StoreStatus | null>(null);

  useEffect(() => {
    // Initial calculate
    setStatus(getStoreStatus());

    // Update every minute
    const interval = setInterval(() => {
      setStatus(getStoreStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!status) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-900/10 text-forest-900 text-xs font-medium ${className}`}>
        <span className="w-2 h-2 rounded-full bg-forest-600 animate-pulse" />
        <span>Memuat status...</span>
      </div>
    );
  }

  const dotColor =
    status.badgeColor === 'emerald'
      ? 'bg-emerald-500'
      : status.badgeColor === 'amber'
      ? 'bg-amber-500'
      : 'bg-rose-500';

  const badgeBg =
    status.badgeColor === 'emerald'
      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
      : status.badgeColor === 'amber'
      ? 'bg-amber-50 border-amber-200 text-amber-900'
      : 'bg-rose-50 border-rose-200 text-rose-900';

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide transition-all shadow-sm ${badgeBg}`}
        title={`${status.detailMessage} (WITA)`}
      >
        <span className="relative flex h-2 w-2">
          {status.isOpen && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColor}`}
            />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColor}`} />
        </span>
        <span className="font-medium">{status.statusText}</span>
        <span className="text-[11px] opacity-75 font-normal">({status.currentWitaTime})</span>
      </div>

      {showDetails && (
        <p className="text-xs text-charcoal-700/80 mt-1 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-terracotta-500 inline shrink-0" />
          <span>{status.detailMessage}</span>
        </p>
      )}
    </div>
  );
};
