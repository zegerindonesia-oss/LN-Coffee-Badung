import { NextResponse } from 'next/server';

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

    console.log('[API Order Sync] Order payload:', payload.orderRef, payload.customerName);

    // Forward to Google Sheet Web App Endpoint if configured
    if (GOOGLE_SHEETS_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          redirect: 'follow',
        });
        console.log('[API Order Sync] Data successfully posted to Google Sheet WebApp!');
      } catch (err) {
        console.error('[API Order Sync] Error posting to Google Sheet WebApp:', err);
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
