import { CartItem, CheckoutFormData } from '@/types/menu';
import { formatRupiah } from './currency';

export const CHECKOUT_WHATSAPP_NUMBER = '6285179723562';

export function createWhatsAppMessage(
  formData: CheckoutFormData,
  cartItems: CartItem[],
  totalAmount: number,
  orderRef: string
): string {
  const itemsText = cartItems
    .map((item, index) => {
      const levelStr = item.selectedLevel ? ` (${item.selectedLevel})` : '';
      const notesStr = item.notes?.trim() ? `\n   Catatan: ${item.notes.trim()}` : '';
      return `${index + 1}. *${item.menuItem.name}*${levelStr}\n   ${item.quantity} x ${formatRupiah(item.menuItem.price)} = *${formatRupiah(item.subtotal)}*${notesStr}`;
    })
    .join('\n\n');

  let orderTypeDetailLine = `• Jenis Pesanan: ${formData.orderType}\n`;
  if (formData.orderType === 'Dine In' && formData.tableNumber) {
    orderTypeDetailLine += `• Nomor Meja: ${formData.tableNumber.trim()}\n`;
  } else if (formData.orderType === 'Delivery' && formData.deliveryAddress) {
    orderTypeDetailLine += `• Alamat Pengiriman: ${formData.deliveryAddress.trim()}\n`;
  } else if (formData.orderType === 'Pesanan Terjadwal') {
    if (formData.scheduledDate) {
      orderTypeDetailLine += `• Tanggal Terjadwal: ${formData.scheduledDate.trim()}\n`;
    }
    if (formData.scheduledTime) {
      orderTypeDetailLine += `• Jam Terjadwal: ${formData.scheduledTime.trim()}\n`;
    }
  }

  const emailLine = formData.customerEmail?.trim()
    ? `• Email: ${formData.customerEmail.trim()}\n`
    : '';

  const notesLine = formData.generalNotes?.trim()
    ? `• Catatan: ${formData.generalNotes.trim()}\n`
    : '• Catatan: -\n';

  const timeLine = formData.orderTime?.trim()
    ? `• Catatan Waktu: ${formData.orderTime.trim()}\n`
    : '';

  const message = `Halo LN Fortunate Coffee Kapal 👋
Saya ingin melakukan pemesanan via website.

📋 *DATA PEMESAN*
• Ref: ${orderRef}
• Nama: ${formData.customerName.trim()}
${emailLine}• No. WhatsApp: ${formData.customerPhone.trim()}
${orderTypeDetailLine}${timeLine}${notesLine}
🍽️ *DETAIL PESANAN*
${itemsText}

━━━━━━━━━━━━━━━━━━━
💰 *TOTAL PESANAN: ${formatRupiah(totalAmount)}*
━━━━━━━━━━━━━━━━━━━

Mohon konfirmasi ketersediaan menu, total akhir, ongkir jika ada, serta informasi pembayaran melalui transfer atau QRIS. Terima kasih.`;

  return message;
}

export function openWhatsAppCheckout(
  formData: CheckoutFormData,
  cartItems: CartItem[],
  totalAmount: number,
  orderRef: string
): void {
  const message = createWhatsAppMessage(formData, cartItems, totalAmount, orderRef);
  const whatsappUrl = `https://wa.me/${CHECKOUT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }
}
