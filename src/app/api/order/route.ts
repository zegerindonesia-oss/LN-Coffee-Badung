import { NextResponse } from 'next/server';

// Default Google Apps Script URL or custom env var URL
const GOOGLE_SHEETS_SCRIPT_URL =
  process.env.GOOGLE_SHEETS_SCRIPT_URL ||
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_SCRIPT_URL ||
  '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      orderRef,
      orderDate,
      customerName,
      customerEmail,
      customerPhone,
      orderType,
      tableNumber,
      deliveryAddress,
      scheduledDate,
      scheduledTime,
      generalNotes,
      items,
      totalAmount,
    } = body;

    const payload = {
      orderRef: orderRef || `LN-${Date.now()}`,
      orderDate: orderDate || new Date().toISOString(),
      customerName: customerName || '',
      customerEmail: customerEmail || '',
      customerPhone: customerPhone || '',
      orderType: orderType || 'Dine In',
      tableNumber: tableNumber || '',
      deliveryAddress: deliveryAddress || '',
      scheduledDate: scheduledDate || '',
      scheduledTime: scheduledTime || '',
      generalNotes: generalNotes || '',
      itemsText: Array.isArray(items)
        ? items
            .map(
              (i: any) =>
                `${i.menuItem?.name || i.name}${i.selectedLevel ? ` (${i.selectedLevel})` : ''} x${i.quantity}`
            )
            .join(', ')
        : '',
      totalAmount: totalAmount || 0,
    };

    console.log('[API Order Sync] Received customer order payload:', payload.orderRef, payload.customerName);

    // Forward to Google Sheet Apps Script Web App Endpoint if configured
    if (GOOGLE_SHEETS_SCRIPT_URL) {
      try {
        const sheetResponse = await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await sheetResponse.json().catch(() => null);
        console.log('[API Order Sync] Google Sheet response:', result);
      } catch (err) {
        console.error('[API Order Sync] Error forwarding to Google Sheet WebApp:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Data pesanan berhasil dicatat dan disinkronkan!',
      orderRef: payload.orderRef,
    });
  } catch (error: any) {
    console.error('[API Order Sync] Error processing order:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Gagal memproses pesanan' },
      { status: 500 }
    );
  }
}
