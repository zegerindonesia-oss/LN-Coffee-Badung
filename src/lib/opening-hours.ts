// Real-time Opening Hours Calculator for LN Fortunate Coffee Kapal (Asia/Makassar / WITA UTC+8)

export type StoreStatus = {
  isOpen: boolean;
  statusText: 'Buka sekarang' | 'Tutup sekarang' | 'Last order segera';
  badgeColor: 'emerald' | 'rose' | 'amber';
  detailMessage: string;
  nextOpenMessage: string;
  currentDayName: string;
  currentWitaTime: string;
};

export function getStoreStatus(currentDate: Date = new Date()): StoreStatus {
  // Convert current date to Asia/Makassar (WITA)
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Makassar',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(currentDate);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '';

  const weekday = getPart('weekday'); // 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
  const hour = parseInt(getPart('hour'), 10);
  const minute = parseInt(getPart('minute'), 10);
  const currentMinutes = hour * 60 + minute;

  const currentWitaTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} WITA`;

  const daysMap: Record<string, { id: number; name: string; openMin: number; closeMin: number; lastOrderMin: number; isOpenDay: boolean }> = {
    Mon: { id: 1, name: 'Senin', openMin: 0, closeMin: 0, lastOrderMin: 0, isOpenDay: false },
    Tue: { id: 2, name: 'Selasa', openMin: 11 * 60, closeMin: 20 * 60 + 30, lastOrderMin: 20 * 60, isOpenDay: true },
    Wed: { id: 3, name: 'Rabu', openMin: 11 * 60, closeMin: 20 * 60 + 30, lastOrderMin: 20 * 60, isOpenDay: true },
    Thu: { id: 4, name: 'Kamis', openMin: 11 * 60, closeMin: 20 * 60 + 30, lastOrderMin: 20 * 60, isOpenDay: true },
    Fri: { id: 5, name: 'Jumat', openMin: 11 * 60, closeMin: 20 * 60 + 30, lastOrderMin: 20 * 60, isOpenDay: true },
    Sat: { id: 6, name: 'Sabtu', openMin: 11 * 60, closeMin: 21 * 60, lastOrderMin: 20 * 60 + 30, isOpenDay: true },
    Sun: { id: 0, name: 'Minggu', openMin: 11 * 60, closeMin: 21 * 60, lastOrderMin: 20 * 60 + 30, isOpenDay: true },
  };

  const todayInfo = daysMap[weekday] || daysMap['Tue'];
  const currentDayName = todayInfo.name;

  let isOpen = false;
  let statusText: StoreStatus['statusText'] = 'Tutup sekarang';
  let badgeColor: StoreStatus['badgeColor'] = 'rose';
  let detailMessage = '';
  let nextOpenMessage = '';

  if (!todayInfo.isOpenDay) {
    // Monday is closed
    isOpen = false;
    statusText = 'Tutup sekarang';
    badgeColor = 'rose';
    detailMessage = 'Hari Senin restoran libur operasional';
    nextOpenMessage = 'Buka kembali Selasa pukul 11:00 WITA';
  } else {
    const { openMin, closeMin, lastOrderMin } = todayInfo;

    if (currentMinutes >= openMin && currentMinutes < lastOrderMin) {
      isOpen = true;
      statusText = 'Buka sekarang';
      badgeColor = 'emerald';
      const closeHourStr = Math.floor(closeMin / 60) + ':' + (closeMin % 60 === 0 ? '00' : closeMin % 60);
      detailMessage = `Buka hingga ${closeHourStr} WITA (Last order 30 mnt sebelum tutup)`;
      nextOpenMessage = `Hari ini buka sampai ${closeHourStr} WITA`;
    } else if (currentMinutes >= lastOrderMin && currentMinutes < closeMin) {
      isOpen = true;
      statusText = 'Last order segera';
      badgeColor = 'amber';
      const closeHourStr = Math.floor(closeMin / 60) + ':' + (closeMin % 60 === 0 ? '00' : closeMin % 60);
      detailMessage = `Restoran akan tutup pukul ${closeHourStr} WITA. Segera selesaikan pesanan Anda.`;
      nextOpenMessage = `Tutup pukul ${closeHourStr} WITA`;
    } else if (currentMinutes < openMin) {
      isOpen = false;
      statusText = 'Tutup sekarang';
      badgeColor = 'rose';
      detailMessage = 'Belum jam buka operasional';
      nextOpenMessage = `Buka hari ini pukul 11:00 WITA`;
    } else {
      // currentMinutes >= closeMin
      isOpen = false;
      statusText = 'Tutup sekarang';
      badgeColor = 'rose';
      detailMessage = 'Sudah melewati jam operasional hari ini';
      if (weekday === 'Sun') {
        nextOpenMessage = 'Buka kembali Selasa pukul 11:00 WITA (Senin libur)';
      } else {
        nextOpenMessage = 'Buka kembali besok pukul 11:00 WITA';
      }
    }
  }

  return {
    isOpen,
    statusText,
    badgeColor,
    detailMessage,
    nextOpenMessage,
    currentDayName,
    currentWitaTime,
  };
}
