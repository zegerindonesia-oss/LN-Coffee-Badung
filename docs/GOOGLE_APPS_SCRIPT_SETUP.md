# Panduan Integrasi Data Customer & Pesanan ke Google Sheet

Google Sheet Target:
`https://docs.google.com/spreadsheets/d/146CZpHHroRU75xGhmMYsQrK7TkCuV8Qh-23c1JiWMAI/edit`

---

## Langkah-langkah Memasang Skrip Otomatis (1 Menit Setup)

1. Buka Google Sheet target di browser:
   `https://docs.google.com/spreadsheets/d/146CZpHHroRU75xGhmMYsQrK7TkCuV8Qh-23c1JiWMAI/edit`

2. Klik menu **Extensions** (Ekstensi) > **Apps Script**.

3. Hapus seluruh isi kode bawaan, lalu **Copy-Paste kode di bawah ini**:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Jika baris 1 belum ada header, buatkan otomatis
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Waktu Pemesanan",
        "Ref Order",
        "Nama Customer",
        "Email Customer",
        "No. WhatsApp / HP",
        "Jenis Pesanan",
        "No. Meja / Alamat / Jadwal",
        "Rincian Pesanan",
        "Total Tagihan (Rp)",
        "Catatan"
      ]);
    }
    
    var detailPengiriman = "";
    if (data.orderType === "Dine In") {
      detailPengiriman = "Meja " + (data.tableNumber || "-");
    } else if (data.orderType === "Delivery") {
      detailPengiriman = data.deliveryAddress || "-";
    } else if (data.orderType === "Pesanan Terjadwal") {
      detailPengiriman = "Tgl: " + (data.scheduledDate || "-") + " | Jam: " + (data.scheduledTime || "-");
    } else {
      detailPengiriman = "Take Away";
    }

    sheet.appendRow([
      new Date().toLocaleString("id-ID", { timeZone: "Asia/Makassar" }),
      data.orderRef || "",
      data.customerName || "",
      data.customerEmail || "",
      "'" + (data.customerPhone || ""),
      data.orderType || "",
      detailPengiriman,
      data.itemsText || "",
      data.totalAmount || 0,
      data.generalNotes || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Klik tombol **Save** 💾 (Ikon Disket / Ctrl+S).

5. Klik tombol **Deploy** (Terapkan) > **New deployment** (Penggelaran Baru).
   - Pilih jenis: **Web app** (Aplikasi Web).
   - Description: `API Web Order LN Fortunate`
   - Execute as: **Me** (Saya).
   - Who has access: **Anyone** (Siapa Saja).

6. Klik **Deploy** -> Berikan izin izin akses Google Account jika diminta.

7. Salin **Web App URL** yang muncul (berformat `https://script.google.com/macros/s/.../exec`).

8. Masukkan Web App URL tersebut ke variabel lingkungan Vercel / `.env.local` sebagai:
   `NEXT_PUBLIC_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/.../exec`
