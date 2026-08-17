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

  const deliveryAddressLine =
    formData.orderType === 'Delivery' && formData.deliveryAddress
      ? `• Alamat: ${formData.deliveryAddress.trim()}\n`
      : '';

  const notesLine = formData.generalNotes?.trim()
    ? `• Catatan: ${formData.generalNotes.trim()}\n`
    : '• Catatan: -\n';

  const timeLine = formData.orderTime?.trim()
    ? `• Waktu Pesanan: ${formData.orderTime.trim()}\n`
    : '• Waktu Pesanan: Secepatnya\n';

  const message = `Halo LN Fortunate Coffee Kapal 👋
Saya ingin melakukan pemesanan via website.

📋 *DATA PEMESAN*
• Ref: ${orderRef}
• Nama: ${formData.customerName.trim()}
• No. WhatsApp: ${formData.customerPhone.trim()}
• Jenis Pesanan: ${formData.orderType}
${deliveryAddressLine}${timeLine}${notesLine}
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
