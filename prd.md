# PRODUCT REQUIREMENTS DOCUMENT (PRD)

OfficeSupply Online Shop B2B

**Versi 3.1** Final & Komprehensif (Update State Machine SO & RFQ-Qn-Ct)

Tanggal: 1 Juli 2026

---

## Daftar Isi

- [1. Ringkasan Sistem](#bab1)
- [2. Tujuan Sistem](#bab2)
- [3. Scope Sistem](#bab3)
- [4. Role Pengguna dan Hak Akses](#bab4)
- [5. Dashboard dan Menu per Role](#bab5)
- [6. Alur Utama Sistem](#bab6)
- [7. Rancangan Database Utama](#bab7)
- [8. Level Buyer dan Aturan Harga](#bab8)
- [9. Aturan Bisnis Penting](#bab9)
- [10. Spesifikasi Non-Fungsional & Monitoring](#bab10)
- [11. Keamanan Sistem & Penetration Testing](#bab11)
- [12. Testing & Quality Assurance (QA)](#bab12)
- [13. Deployment & Environment Strategy](#bab13)
- [14. Legal & Compliance](#bab14)
- [15. Disaster Recovery Plan (DRP)](#bab15)
- [16. Scalability Roadmap](#bab16)
- [17. Integrasi Pihak Ketiga](#bab17)
- [18. UX & Accessibility](#bab18)
- [19. Operational SOP (SLA & Dispute/Refund)](#bab19)
- [20. Acceptance Criteria & Skenario Uji](#bab20)
- [21. Prioritas Implementasi](#bab21)
- [22. Lampiran](#bab22)

---

# 1. Ringkasan Sistem

OfficeSupply adalah platform B2B terintegrasi yang menghubungkan Buyer, Principal (pemilik produk), Supplier, dan internal OfficeSupply dalam satu ekosistem.

Sistem mendukung siklus lengkap:

- **Pra-Transaksi:** RFQ, Quotation (Qn), dan Contract (Ct) yang fleksibel (opsional dan tidak harus berurutan).
- **Transaksi:** Sales Order (SO) yang diterbitkan oleh AdminPurchasing dan diotorisasi oleh HeadPurchasing.
- **Fulfillment Internal:** Sistem otomatis menerbitkan Draft Purchase Order (DPO) ke Principal, yang kemudian dikirim ke gudang OfficeSupply dengan label ber-QR Code.
- **Konsolidasi & Pengiriman:** Barang dari berbagai Principal dikonsolidasi di gudang sebelum dikirim ke buyer via Jaladara.
- **Invoice & Payment:** Invoice ke Buyer terbit setelah SO delivered, pembayaran dari Buyer diverifikasi, lalu OfficeSupply membayar Principal (sistem "pecel" (Pecah Celengan)) dalam ≤ 48 jam.

---

# 2. Tujuan Sistem

1. Menyediakan platform B2B yang fleksibel dengan dukungan RFQ, Quotation, dan Contract.
2. Memisahkan peran Pembuatan Pesanan (AdminPurchasing) dan Verifikator Teknis (HeadPurchasing) di sisi buyer.
3. Mengotomatisasi pembuatan Draft Purchase Order ke Principal berdasarkan Sales Order.
4. Memastikan transparansi fulfillment dari Principal ke gudang melalui label ber-QR Code dan proses scan.
5. Menyediakan konsolidasi otomatis sehingga buyer menerima satu pengiriman utuh.
6. Mematuhi regulasi UU PDP, pajak elektronik, dan standar keamanan OWASP.
7. Menyediakan skalabilitas untuk mendukung pertumbuhan transaksi hingga 10x lipat.

---

# 3. Scope Sistem

| Area | Termasuk dalam Scope |
|---|---|
| **Master Data** | Produk, Brand, Principal, Supplier, Buyer, Level Buyer, Kategori, Dimensi/Berat Produk (wajib). |
| **RFQ / Qn / Ct** | RFQ multi-produk, Quotation (Qn) langsung atau dari RFQ, Contract (Ct) langsung atau dari Qn/RFQ. |
| **Sales Order (SO)** | Diterbitkan AdminPurchasing, diotorisasi HeadPurchasing. Mendukung harga Contract atau Fallback. |
| **Draft PO ke Principal** | Otomatis dibuat oleh sistem per Principal; diotorisasi oleh Purchasing User internal. |
| **Inbound Fulfillment** | Principal kirim ke gudang dengan label ber-QR Code; Purchasing User scan & terima di gudang. |
| **Konsolidasi SO** | SO otomatis siap diambil (ready_to_be_picked_up) jika semua PO Principal sudah fully_received. |
| **Pengiriman** | Integrasi dengan Jaladara untuk pickup dari gudang ke buyer. |
| **Pembayaran** | CBD/TOP via VA (Xendit) atau Transfer Bank. |
| **Invoice & AR/AP** | Invoice ke Buyer terbit setelah SO delivered. Pembayaran ke Principal (pecel) ≤ 48 jam setelah Buyer bayar. |
| **CMS & Legal** | Artikel, Newsletter, Review, Kepatuhan UU PDP, Audit Trail. |

---

# 4. Role Pengguna dan Hak Akses

### A. Kelompok Internal OfficeSupply

| Role | Fungsi Utama | Hak Akses Spesifik |
|---|---|---|
| **Super Admin** | Pemilik akses penuh tertinggi. | Semua akses. Tidak ada batasan. |
| **Super User** | Wakil super admin untuk operasional sehari-hari. | Semua menu kecuali Setting Payment Gateway, DRP Simulator, Compliance. |
| **SalesAdmin User** | Hubungan dengan Buyer. Mengelola RFQ, Qn, Ct, dan CMS. | Tidak bisa mengakses Draft PO (DPO) atau inbound gudang. |
| **Purchasing User** | Hubungan dengan Principal & Supplier. Mengelola DPO, otorisasi, inbound, scan QR. | Tidak bisa mengakses RFQ/Quotation/Contract atau modul keuangan (AR/AP). |
| **Finance User** | Verifikasi pembayaran, invoice, TOP, refund, pembayaran Principal. | Tidak bisa mengakses operasional purchasing atau sales. |

### B. Kelompok Perusahaan Buyer

**Ketentuan Struktur Role Buyer:** Perusahaan Buyer dapat memilih struktur user berdasarkan kebutuhan internal:

- **Skema 2 Role:** Jika Buyer tidak ingin menggunakan AdminPurchasing, maka Buyer hanya memiliki **HeadPurchasing User** dan **FinanceBuyer User**. Dalam skema ini, HeadPurchasing bertanggung jawab membuat sekaligus menyetujui SO, RFQ, Quotation, dan Contract.
- **Skema 3 Role:** Jika Buyer ingin memisahkan pembuat pesanan dan pihak approval, maka Buyer memiliki **HeadPurchasing User**, **AdminPurchasing User**, dan **FinanceBuyer User**. Dalam skema ini, AdminPurchasing membuat SO/RFQ, sedangkan HeadPurchasing melakukan approval.

| Role | Fungsi Utama | Hak Akses Spesifik |
|---|---|---|
| **HeadPurchasing User** | **Manager dan Verifikator SO, RFQ, Quotation, Contract** dari website, serta kelola user buyer. | Menyetujui/menolak SO, Quotation & Contract, mengelola user buyer, serta dapat membuat SO/RFQ apabila perusahaan Buyer menggunakan **Skema 2 Role** tanpa AdminPurchasing. |
| **AdminPurchasing User** | **Membuat Sales Order (SO)** dari website, membuat RFQ, dan melacak pengiriman. | Membuat SO, membuat RFQ, tracking pengiriman. Role ini bersifat **opsional** dan hanya digunakan jika Buyer memilih **Skema 3 Role**. |
| **FinanceBuyer User** | Pembayaran & invoice. | Upload bukti transfer, batalkan pembayaran. |

### C. Kelompok Perusahaan Principal

| Role | Fungsi Utama | Hak Akses Spesifik |
|---|---|---|
| **SalesPrincipal User** | Menerima PO Final, menginput paket, cetak label QR. | Konfirmasi PO, input inbound, cetak label, view invoice buyer. |
| **ProductManager User** | Mengelola data produk (berat, dimensi, harga, stok). | CRUD produk untuk principalnya sendiri. |

---

# 5. Dashboard dan Menu per Role

| Role | Menu Utama |
|---|---|
| **Super Admin / Super User** | Semua menu (User, Buyer, Principal, Produk, SO, RFQ, Qn, Ct, DPO, Keuangan, Inbound, CMS, Laporan, Audit, Setting). |
| **SalesAdmin User** | Dashboard Penjualan, Buyer, RFQ, Quotation, Contract, CMS (Artikel/Review). |
| **Purchasing User** | Dashboard Operasional, Principal, Supplier, **Draft PO (Otorisasi)**, **Inbound Receiving (Scan QR)**, Konsolidasi Monitor. |
| **Finance User** | Dashboard Keuangan, Payment Pending, VA Monitoring, TOP Aging, Dispute/Refund, **Hutang Principal (Pecel)**. |
| **HeadPurchasing User** | Dashboard Company, **Manage dan Verifikator SO, RFQ, Quotation, & Contract (Inbox)**, Histori Transaksi, Kelola User Buyer. Jika Buyer menggunakan **Skema 2 Role**, menu HeadPurchasing juga mencakup **Buat SO**, RFQ, dan Tracking Pengiriman. |
| **AdminPurchasing User** | **Buat SO**, RFQ, Tracking Pengiriman, Review. Menu ini hanya muncul jika Buyer menggunakan **Skema 3 Role**. |
| **FinanceBuyer User** | Pembayaran, Upload Bukti Transfer, Invoice (status "Current"). |
| **SalesPrincipal User** | Dashboard Principal, **PO Masuk**, **Buat Inbound & Cetak Label QR**, Konfirmasi Pengiriman, **View Invoice Buyer**. |
| **ProductManager User** | Kelola Produk (Berat, Dimensi, Harga, Stok). |

---

# 6. Alur Utama Sistem

### 6.1 Alur RFQ (Opsional) → Quotation (Opsional) → Contract (Opsional)

Alur ini bersifat fleksibel. SalesAdmin dapat membuat Quotation langsung tanpa RFQ, atau membuat Contract langsung tanpa RFQ/Qn. Buyer dapat memulai dengan mengajukan RFQ terlebih dahulu.

**State Machine RFQ:**

| Status | Keterangan | Trigger |
|---|---|---|
| `RFQ_Draft` | RFQ baru dibuat oleh Buyer, belum dikirim. | Buyer membuat RFQ. |
| `RFQ_Submitted` | Buyer mengirim RFQ ke sistem. | Buyer klik "Kirim RFQ". |
| `RFQ_In_Review` | SalesAdmin menerima dan memproses RFQ. | SalesAdmin terima & proses. |
| `RFQ_Rejected` | SalesAdmin menolak RFQ (dengan alasan). | SalesAdmin klik "Tolak". |
| `RFQ_Expired` | RFQ tidak diproses dalam 7 hari kalender sejak `RFQ_Submitted`. Sistem otomatis mengubah status. | Sistem (otomatis setelah 7 hari). |

**State Machine Quotation:**

| Status | Keterangan | Trigger |
|---|---|---|
| `Quotation_Draft` | Qn dibuat oleh SalesAdmin (dari RFQ atau langsung), belum dikirim ke Buyer. | SalesAdmin buat Qn dari RFQ atau langsung. |
| `Quotation_Sent` | Qn dikirim ke Buyer untuk direview. | SalesAdmin kirim Qn ke Buyer. |
| `Quotation_Under_Revision` | Buyer meminta revisi atas Qn yang dikirim. | Buyer klik "Minta Revisi". |
| `Quotation_Rejected` | Buyer menolak Qn. | Buyer klik "Tolak Qn". |

**State Machine Contract:**

| Status | Keterangan | Trigger |
|---|---|---|
| `Contract_Draft` | Contract dibuat oleh SalesAdmin (dari Qn, dari RFQ, atau langsung), belum difinalisasi. | SalesAdmin buat Contract. |
| `Contract_Finalized` | SalesAdmin memfinalisasi Contract, siap untuk ditandatangani. | SalesAdmin finalisasi Ct. |
| `Contract_Signed_Buyer` | AdminPurchasing Buyer menandatangani Contract secara digital. | AdminPurchasing tanda tangan digital. |
| `Contract_Signed_Principal` | SalesPrincipal menandatangani Contract secara digital. | SalesPrincipal tanda tangan digital. |
| `Contract_Active` | Contract otomatis aktif setelah kedua pihak tanda tangan. | Sistem (otomatis). |
| `Converted_to_SO` | AdminPurchasing membuat SO dari Contract yang aktif. | AdminPurchasing buat SO dari Contract. |
| `Contract_Expired` | Contract melewati masa berlaku tanpa dikonversi ke SO. | Sistem (otomatis, berdasarkan masa berlaku). |

**Catatan alur skip yang diizinkan:**
- SalesAdmin dapat membuat `Quotation_Draft` langsung tanpa RFQ.
- SalesAdmin dapat membuat `Contract_Draft` langsung tanpa RFQ maupun Qn.
- SalesAdmin dapat membuat `Contract_Draft` dari RFQ secara langsung, melewati (skip) tahap Quotation.
- Jika Buyer menyetujui Quotation → sistem **otomatis** menyarankan pembuatan Contract baru (`Contract_Draft`).

**Contract wajib ditandatangani digital** oleh AdminPurchasing (sisi Buyer) dan SalesPrincipal (sisi Principal) sebelum berstatus `Contract_Active`.

Contract berisi: Buyer, Principal, Item Produk, `quantity_min`, `unit_price`, masa berlaku.

### 6.1.1 Alur Khusus Produk Cetak

**Catatan Khusus:** Produk Aldo atau produk cetak memiliki alur transaksi yang berbeda dari produk katalog biasa. Produk cetak tidak langsung menampilkan harga final karena harga bergantung pada detail spesifikasi yang diminta oleh customer.

1. Buyer memilih produk Aldo / produk cetak dari katalog.
2. Sistem mendeteksi bahwa produk tersebut memiliki tipe `print_product` atau `custom_printing`.
3. Sistem tidak menampilkan harga final secara langsung, melainkan mengarahkan Buyer ke form RFQ khusus produk cetak.
4. Buyer wajib mengisi spesifikasi cetak secara detail, seperti:
   - Jenis produk cetak.
   - Ukuran.
   - Bahan/material.
   - Jumlah pesanan.
   - Warna.
   - Finishing.
   - Jumlah sisi cetak.
   - Catatan desain atau kebutuhan khusus lainnya.
5. Buyer dapat mengunggah dokumen pendukung, seperti:
   - File desain dalam format PDF.
   - File gambar dalam format JPG, PNG, atau sejenisnya.
   - File dokumen dalam format DOC/DOCX.
   - File spreadsheet dalam format XLS/XLSX.
   - File pendukung lainnya sesuai kebutuhan produksi.
6. Setelah form lengkap, sistem membuat RFQ khusus produk cetak dengan status `RFQ_Submitted`.
7. RFQ tersebut masuk ke dashboard SalesAdmin untuk diperiksa (status berubah ke `RFQ_In_Review`).
8. SalesAdmin meninjau spesifikasi, file pendukung, dan jumlah permintaan.
9. Jika data belum lengkap, SalesAdmin dapat mengembalikan RFQ ke Buyer dengan catatan perbaikan (status kembali ke `RFQ_Draft`).
10. Jika data sudah lengkap, SalesAdmin berkoordinasi dengan pihak Aldo / Principal terkait untuk mendapatkan harga produksi.
11. SalesAdmin menginput harga penawaran ke sistem dan membuat Quotation (`Quotation_Draft`) berdasarkan RFQ produk cetak tersebut, lalu mengirimkan ke Buyer (`Quotation_Sent`).
12. Buyer menerima Quotation dan dapat melakukan:
    - **Approve** jika harga dan spesifikasi disetujui → sistem lanjut ke `Contract_Draft`.
    - **Reject** jika tidak setuju → status `Quotation_Rejected`.
    - **Request Revision** jika ingin mengubah spesifikasi atau meminta penyesuaian harga → status `Quotation_Under_Revision`.
13. Jika Quotation disetujui dan Contract aktif, sistem dapat melanjutkan proses menjadi Sales Order sesuai alur SO normal.
14. Setelah menjadi SO, proses approval, payment, fulfillment, invoice, dan pengiriman mengikuti alur transaksi utama sistem.

**Aturan Penting:** Produk Aldo / produk cetak tidak dapat langsung masuk keranjang dengan harga final seperti produk reguler. Semua transaksi produk cetak wajib melalui RFQ karena harga bergantung pada spesifikasi dan file yang dikirim oleh Buyer.

### 6.2 Alur Sales Order (SO) oleh Buyer

**State Machine SO:**

| Status | Keterangan | Trigger |
|---|---|---|
| `Draft` | SO baru dibuat oleh AdminPurchasing/HeadPurchasing, belum dikirim. | AdminPurchasing buat SO baru. |
| `Submitted` | AdminPurchasing mengirim SO ke HeadPurchasing untuk disetujui. | AdminPurchasing klik "Kirim SO". |
| `Rejected` | HeadPurchasing menolak SO. SO dapat direvisi kembali ke `Draft` oleh AdminPurchasing. | HeadPurchasing klik "Reject". |
| `Approved` | HeadPurchasing menyetujui SO. | HeadPurchasing klik "Approve". |
| `Confirmed` | Sistem otomatis memvalidasi stok & harga setelah SO disetujui. | Sistem (otomatis setelah Approved). |
| `Sent_to_Principal` | Sistem otomatis membuat DPO dan mengirimkan ke Principal. | Sistem (otomatis setelah Confirmed). |
| `Consolidating` | Menunggu semua Principal melakukan fulfillment ke gudang. | Sistem (otomatis setelah Sent_to_Principal). |
| `Ready_to_be_Picked_Up` | Semua DPO dari semua Principal sudah `fully_received` di gudang. SO siap dikirim ke Buyer. | Sistem (otomatis setelah semua DPO fully_received). |
| `Expired` | SO tidak di-approve oleh HeadPurchasing dalam **3x24 jam** sejak `Submitted`. SO dibatalkan otomatis oleh sistem. Notifikasi dikirim ke **AdminPurchasing** dan HeadPurchasing. | Sistem (otomatis setelah 3x24 jam tanpa approval). |

**Catatan alur SO per skema role:**
- Pada **Skema 2 Role**: SO dibuat sekaligus dikonfirmasi oleh HeadPurchasing. Sistem tetap mencatat approval HeadPurchasing untuk audit trail.
- Pada **Skema 3 Role**: SO dibuat oleh AdminPurchasing (status `Draft` → `Submitted`), lalu dikirim ke HeadPurchasing untuk otorisasi.

**Langkah-langkah pembuatan SO:**

1. **Pembuat SO** login dan pilih produk dari katalog atau Contract aktif. Pada **Skema 2 Role**, SO dibuat oleh HeadPurchasing. Pada **Skema 3 Role**, SO dibuat oleh AdminPurchasing.
2. Sistem **validasi wajib**: cek berat & dimensi produk. Jika ada yang kosong, SO diblokir.
3. Sistem **kelompokkan produk berdasarkan origin_id** (multi-origin: Klaten, Jakarta, dll.).
4. Sistem hitung **Chargeable Weight per origin** (max berat aktual vs dimensi).
5. Sistem cari tarif Jaladara per origin → tujuan buyer, lalu hitung ongkir per origin dan **total ongkir SO** = penjumlahan semua origin.
6. AdminPurchasing pilih delivery term (Franco/Non-Franco), metode pembayaran (CBD/TOP), dan **payment term (jangka waktu pembayaran)**.
7. AdminPurchasing klik "Kirim SO" → status `Submitted`, SO masuk inbox HeadPurchasing.
8. HeadPurchasing mereview SO:
   - Klik **"Approve"** → status `Approved` → sistem otomatis validasi stok & harga → status `Confirmed` → sistem buat DPO → status `Sent_to_Principal`.
   - Klik **"Reject"** → status `Rejected`, AdminPurchasing dapat merevisi SO kembali ke `Draft`.
   - Jika tidak ada aksi dalam **3x24 jam** → sistem otomatis ubah status ke `Expired`, SO dibatalkan, notifikasi dikirim ke AdminPurchasing dan HeadPurchasing.
9. Jika Buyer menggunakan **Skema 2 Role**, HeadPurchasing membuat dan mengonfirmasi SO langsung tanpa perlu mengirim ke AdminPurchasing terlebih dahulu. Sistem tetap mencatat approval oleh HeadPurchasing untuk audit trail.

### 6.3 Alur Otomatisasi Draft PO ke Principal

1. SO berstatus `Confirmed` oleh sistem internal.
2. Sistem **kelompokkan item SO berdasarkan Principal** (`principal_company_id` di produk).
3. Untuk setiap Principal, sistem **otomatis membuat Draft Purchase Order (DPO)** → SO berstatus `Sent_to_Principal`.
4. DPO dikirim ke **Purchasing User** internal untuk otorisasi.
5. Purchasing User **Approve** DPO → status `authorized` → otomatis terbit PO Final ke **SalesPrincipal** via email & dashboard.

### 6.4 Alur Fulfillment Principal → Gudang (Dengan Label QR)

1. **SalesPrincipal** terima PO Final, siapkan produk.
2. SalesPrincipal buat **Inbound Shipment** di sistem: input jumlah kardus, berat, dimensi, estimasi tiba.
3. **Sistem generate QR Code unik** untuk setiap kardus.
4. Sistem generate **PDF Label** berisi: PO, SO, No Paket, Buyer, Alamat, Deskripsi, **QR Code**.
5. SalesPrincipal **cetak label** dan tempel di setiap kardus.
6. SalesPrincipal kirim fisik ke **Gudang OfficeSupply** (Klaten/Jakarta).
7. **Purchasing User** di gudang **scan QR Code** menggunakan scanner.
8. Sistem tampilkan detail paket. Purchasing User cek kondisi fisik:
   - **Baik** → klik Terima (status `received`).
   - **Rusak** → status `damaged`, sistem buat dispute ticket.
9. Jika semua kardus dalam 1 PO Principal diterima, status DPO → `fully_received`.

### 6.5 Alur Konsolidasi SO & Pengiriman ke Buyer

1. Sistem cek **semua DPO** yang terkait dengan satu SO.
2. Jika **semua DPO** sudah `fully_received` → SO otomatis berstatus **`Ready_to_be_Picked_Up`**.
3. Notifikasi ke Purchasing User & SalesAdmin.
4. Purchasing User buat **Pickup Request** ke Jaladara.
5. Jaladara ambil barang dari gudang, kirim ke alamat buyer di SO.
6. Buyer terima barang (SO `delivered`).

### 6.6 Alur Invoice ke Buyer (Setelah SO Delivered)

1. SO berstatus `delivered`.
2. Sistem otomatis membuat **Draft Invoice** (split PPN/Non-PPN) berdasarkan SO.
3. Sistem mengambil **payment term (TOP)** dari SO (bukan dari Contract) dengan **ketentuan berbasis kelipatan per 30 hari** (sehingga sistem dapat mengakomodasi pilihan seperti 1 bulan/30 hari, 2 bulan/60 hari, dll).
4. Notifikasi ke **Finance User internal** bahwa ada Draft Invoice menunggu persetujuan.
5. Finance User internal periksa dan **Approve** Draft Invoice → status `issued`.
6. Sistem kirim invoice final ke **FinanceBuyer** (di dashboard terlihat status **"Current"**).
7. **SalesPrincipal User** dapat melihat invoice tersebut (view only) untuk memantau pembayaran.

### 6.7 Alur Pembayaran Buyer → OfficeSupply

1. FinanceBuyer pilih metode: **VA (Xendit)** atau **Transfer Bank**.
2. FinanceBuyer melakukan pembayaran.
3. Finance User internal verifikasi (VA: callback otomatis; Transfer: manual approve).
4. Status invoice buyer menjadi **`paid`**.

### 6.8 Alur Pembayaran OfficeSupply ke Principal (Sistem "Pecel")

1. Sistem mendeteksi invoice buyer `paid` → otomatis hitung **deadline 48 jam**.
2. Sistem buat **Principal Invoice** status `ready_to_pay`.
3. Notifikasi ke **Finance User internal** (dilengkapi countdown timer).
4. Finance User lakukan transfer ke Principal dan **upload bukti transfer**.
5. Status Principal Invoice menjadi `paid`.
6. Jika melewati 48 jam → status `overdue`, eskalasi ke Super User.

### 6.9 Alur Repeat Order

- **Aturan Sistem:** Fitur Repeat Order **hanya** dapat dilakukan pada dokumen Sales Order (SO). Semua pesanan yang berasal dari alur RFQ (seperti Quotation dan Contract) tidak dapat di-repeat order.

1. User menekan tombol khusus **Repeat Order** pada SO yang sudah ada.
2. Sistem otomatis memasukkan rincian pesanan tersebut ke dalam **Keranjang (Cart)** untuk diproses.
3. Setelah itu alur pesanan SO sama seperti biasa (mulai dari `Draft`).

---

# 7. Rancangan Database Utama

*Berikut adalah tabel-tabel utama yang digunakan dalam sistem. Untuk detail lengkap, lihat file ERD terpisah.*

### 7.1 Tabel Master User & Company

- `roles` — daftar 10 role sistem.
- `companies` — semua entitas (internal, buyer, principal, supplier, referal).
- `users` — akun login, terhubung ke `companies` dan `roles`.
- `buyer_levels` — level diskon buyer.
- `referals` — data sales yang membawa instansi.

### 7.2 Tabel Produk & Katalog

- `products` — wajib memiliki `weight_gram`, `length_cm`, `width_cm`, `height_cm` (validasi SO).
- `product_prices` — harga khusus per level buyer.
- `brands`, `product_categories`.

### 7.3 Tabel Pra-Transaksi (RFQ → Qn → Ct)

- `rfqs` & `rfq_items` — kolom `status` mengakomodasi nilai: `draft`, `submitted`, `in_review`, `rejected`, `expired`. Kolom `expired_at` untuk menghitung batas 7 hari.
- `quotations` & `quotation_items` — kolom `status` mengakomodasi nilai: `draft`, `sent`, `under_revision`, `rejected`, `converted_to_contract`.
  - `attachments` — JSON berisi daftar file pendukung quotation, seperti path S3, nama file asli, mime type, ukuran file, dan kategori file.
- `contracts` & `contract_items` — kolom `status` mengakomodasi nilai: `draft`, `finalized`, `signed_buyer`, `signed_principal`, `active`, `converted_to_so`, `expired`. Berisi `quantity_min` dan `unit_price`.

### 7.3.1 Penyesuaian Data untuk Produk Cetak / Aldo

- Produk Aldo / produk cetak tetap menggunakan tabel RFQ dan Quotation yang sudah ada, tanpa perlu membuat tabel khusus baru.
- Pada tabel `quotations`, ditambahkan kolom untuk menyimpan file pendukung produk cetak yang diunggah ke storage S3.
- File pendukung dapat berupa PDF, DOC/DOCX, XLS/XLSX, JPG, PNG, atau format desain lain yang dibutuhkan untuk proses penawaran.

### 7.4 Tabel Transaksi Utama (SO & Multi-Origin)

- `sales_orders` — kolom `status` mengakomodasi nilai: `draft`, `submitted`, `rejected`, `approved`, `confirmed`, `sent_to_principal`, `consolidating`, `ready_to_be_picked_up`, `delivered`, `expired`. Menyimpan `payment_term_id`, `payment_term_days_snapshot`, `consolidation_status`, `submitted_at` (untuk menghitung batas 3x24 jam expired).
- `so_items` — detail produk dalam SO.
- `so_shipping_breakdown` — **breakdown ongkir per origin** (multi-origin).

### 7.5 Tabel Draft PO & Inbound

- `draft_purchase_orders` (DPO) — `fulfillment_status`: `issued` → `shipped_to_warehouse` → `fully_received`.
- `dpo_items`
- `inbound_shipments`
- `inbound_packages` — menyimpan `qr_code_uuid`, `qr_code_url`, `label_printed_at`.

### 7.6 Tabel Invoice & Payment

- `invoices` — `invoice_type` (taxable/non_taxable), `buyer_paid_at`.
- `invoice_items`
- `principal_invoices` — tagihan dari Principal ke OfficeSupply.
- `principal_payments` — bukti pembayaran OfficeSupply ke Principal.
- `payments`, `payment_va_details`, `payment_transfer_proofs`.

### 7.7 Tabel Pengiriman (Jaladara)

- `shipments` — pengiriman dari gudang ke buyer.
- `jaladara_route_tariffs` — tarif per kg per rute.
- `shipping_origins` — Klaten, Jakarta, dll.

### 7.8 Tabel CMS & Audit

- `articles`, `newsletter_campaigns`, `customer_reviews`.
- `audit_logs` — merekam semua perubahan penting.
- `sla_violations` — mencatat pelanggaran SLA.

---

# 8. Level Buyer dan Aturan Harga

- **Fallback Price:** Jika SO tanpa Contract, harga = `base_price × (1 - diskon terkecil di kategori)`.
- **Harga Contract:** Mengikat selama masa berlaku Contract.
- Level buyer diatur oleh SalesAdmin/Super Admin (Level: Logistik Grup, B2B Raksasa, Besar, Sedang, Kecil).

---

# 9. Aturan Bisnis Penting

| Area | Rule |
|---|---|
| **Struktur Role Buyer** | Buyer dapat menggunakan **Skema 2 Role** (HeadPurchasing + FinanceBuyer) atau **Skema 3 Role** (HeadPurchasing + AdminPurchasing + FinanceBuyer). Jika tanpa AdminPurchasing, HeadPurchasing mengambil fungsi pembuatan SO/RFQ sekaligus approval. Jika dengan AdminPurchasing, fungsi pembuatan SO/RFQ dipisah dari approval HeadPurchasing. |
| **Multi-Origin SO** | Ongkir dihitung per origin, lalu dijumlahkan. Setiap origin memiliki chargeable weight sendiri. |
| **Produk Aldo / Produk Cetak** | Produk cetak tidak menampilkan harga final di katalog dan wajib masuk alur RFQ. Buyer harus mengisi spesifikasi detail dan mengunggah file pendukung seperti PDF, gambar, dokumen, atau Excel sebelum SalesAdmin memberikan Quotation. |
| **Validasi Berat/Dimensi** | Wajib ada di setiap produk aktif. Jika tidak, SO tidak bisa dibuat. |
| **QR Code Label** | Wajib ada di setiap kardus; dicetak dari sistem oleh SalesPrincipal. |
| **Konsolidasi SO** | SO siap diambil (Ready_to_be_Picked_Up) hanya jika semua DPO Principal sudah `fully_received`. |
| **Payment Term SO** | Jangka waktu pembayaran (TOP) diambil dari SO, **bukan** dari Contract. |
| **Invoice Buyer** | Draft Invoice terbit **setelah** SO `delivered`. Harus di-approve Finance User internal sebelum dikirim. |
| **Pembayaran Principal (Pecel)** | OfficeSupply membayar Principal **setelah** buyer lunas, dalam ≤ 2 x 24 jam (48 jam). |
| **SLA Principal** | Wajib kirim ke gudang ≤ 5 hari kerja setelah PO diterima. |
| **SO Expired** | SO yang berstatus `Submitted` dan tidak di-approve oleh HeadPurchasing dalam **3x24 jam** akan otomatis berubah status menjadi `Expired` dan dibatalkan oleh sistem. Notifikasi dikirim ke AdminPurchasing dan HeadPurchasing. |
| **RFQ Expired** | RFQ yang berstatus `RFQ_Submitted` dan tidak diproses oleh SalesAdmin dalam **7 hari kalender** akan otomatis berubah status menjadi `RFQ_Expired` oleh sistem. Notifikasi dikirim ke SalesAdmin dan Buyer. |
| **Revisi Quotation** | Buyer dapat meminta revisi atas Quotation yang dikirim. Quotation akan berstatus `Quotation_Under_Revision` dan SalesAdmin harus memperbaiki sebelum mengirim ulang ke Buyer. |

---

# 10. Spesifikasi Non-Fungsional & Performance Monitoring

- **Performance:** Response time < 3 detik (desktop), error rate < 0.5%.
- **Monitoring Tools:** Grafana (infrastructure), New Relic (APM), Sentry (error tracking), Laravel Telescope (debug).
- **Alerting:** Real-time alert via Telegram/Email ke tim on-call jika error rate > 1% atau response time > 5 detik selama 5 menit.
- **Database:** Query < 100 ms rata-rata; slow query log dioptimalkan.

---

# 11. Keamanan Sistem & Penetration Testing

| Aspek | Implementasi |
|---|---|
| **Autentikasi** | Laravel Breeze + MFA opsional. |
| **Otorisasi** | Laravel Gates/Policies untuk setiap role. |
| **SQL Injection** | Eloquent ORM + parameter binding. |
| **XSS** | Blade auto-escaping + CSP header. |
| **CSRF** | Laravel CSRF token untuk semua form. |
| **Brute Force** | Rate limiting 10 percobaan/5 menit + captcha setelah 3 gagal. |
| **Enkripsi Data** | Data sensitif (NPWP, NIB, rekening) dienkripsi di database. |
| **Penetration Testing** | OWASP ZAP, 1 kali/tahun (fokus: SQLi, XSS, CSRF, brute force). |

---

# 12. Testing & Quality Assurance (QA)

| Jenis Testing | Deskripsi | Frekuensi |
|---|---|---|
| **Unit Testing** | PHPUnit, coverage target ≥ 80%. | Setiap commit / CI |
| **Integration Testing** | Testing antar modul (SO → DPO → Inbound). | Setiap fitur baru |
| **Regression Testing** | Memastikan fitur lama tetap berfungsi. | Setiap release (2 minggu) |
| **Performance/Load Testing** | K6 / JMeter, 1000 user aktif. | Sebelum major release |
| **Penetration Testing** | OWASP ZAP. | 1 tahun sekali |
| **UAT** | Buyer & Principal nyata di staging. | 2 minggu sebelum go-live |

---

# 13. Deployment & Environment Strategy

- **CI/CD:** GitHub Actions / GitLab CI.
- **Environment:** Dev (developer), Staging (UAT), Production (live).
- **Rollback:** Otomatis jika error rate > 5% dalam 10 menit; manual 1 klik.
- **Monitoring:** Grafana, New Relic, Sentry.
- **Maintenance Mode:** Maintenance page dengan notifikasi 1 jam sebelumnya.

---

# 14. Legal & Compliance

| Aspek | Implementasi |
|---|---|
| **UU PDP** | Consent pengguna (`user_consents`), hak akses & hapus data, enkripsi data pribadi. |
| **Pajak Elektronik** | Invoice split PPN/Non-PPN, integrasi e-faktur, laporan pajak bulanan. |
| **Audit Eksternal** | 1 tahun sekali oleh lembaga independen; log disimpan 5 tahun. |

---

# 15. Disaster Recovery Plan (DRP)

- **RPO:** ≤ 24 jam (backup database harian pukul 02.00 WIB).
- **RTO:** ≤ 4 jam (tim on-call siap restore ke server cadangan).
- **Backup:** Database ke AWS S3 (region berbeda), file dengan S3 versioning.
- **Simulasi:** Server down, data corruption, ransomware — minimal 2 kali/tahun.

---

# 16. Scalability Roadmap

- **Horizontal Scaling:** Auto Scaling Group + ALB (AWS) jika traffic meningkat.
- **Caching:** Redis (query), CloudFront (CDN).
- **Database:** Read Replica MySQL, sharding jika transaksi > 5000/hari.
- **Queue:** Laravel Horizon + Redis untuk antrian (termasuk cron job pengecekan SO Expired 3x24 jam dan RFQ Expired 7 hari).

---

# 17. Integrasi Pihak Ketiga

| Nama API | Tujuan | Detail |
|---|---|---|
| **Xendit** | Payment Gateway VA | Generate VA, webhook callback. |
| **Jaladara** | Logistik | Pickup request, tracking. |
| **Supplier ERP** | Sinkronisasi stok & harga | API REST, SLA respons ≤ 4 jam. |
| **SMTP** | Email notifikasi | Mailgun/SendGrid. |
| **AWS S3** | Penyimpanan file | Gambar, dokumen, bukti transfer. |

---

# 18. UX & Accessibility

- **WCAG 2.1 Level AA:** Kontras warna, navigasi keyboard, ARIA labels.
- **Multi-language:** Indonesia & Inggris (Laravel Localization).
- **Mobile-First:** Tailwind CSS dengan pendekatan mobile-first, touch-friendly.

---

# 19. Operational SOP (SLA & Dispute/Refund)

### 19.1 Tujuan SOP

1. Memberikan kepastian dan kejelasan prosedur bagi setiap role dalam menjalankan tugasnya.
2. Menjamin kepatuhan terhadap SLA yang telah ditetapkan.
3. Meminimalkan risiko kesalahan, keterlambatan, dan sengketa.
4. Menyediakan mekanisme eskalasi yang jelas.

### 19.2 Daftar SLA Operasional

| No | Proses | Pihak Penanggung Jawab | SLA | Konsekuensi Jika Dilanggar |
|---|---|---|---|---|
| 1 | Verifikasi & Approve Pembayaran Buyer (Transfer Manual) | Finance User (Internal) | ≤ 24 jam | Notifikasi eskalasi ke Super User |
| 2 | Pembuatan Shipment (Setelah Payment Paid) | Purchasing User (Internal) | ≤ 12 jam | Eskalasi ke Super User |
| 3 | Fulfillment Principal ke Gudang | SalesPrincipal User | ≤ 5 Hari Kerja | Eskalasi ke Super User & Purchasing User |
| 4 | Pembayaran OfficeSupply ke Principal (Sistem Pecel) | Finance User (Internal) | ≤ 2 x 24 jam (48 jam) | Status Principal Invoice overdue, eskalasi ke Super User |
| 5 | Respon Dispute / Sengketa | Finance User / SalesAdmin | ≤ 1 x 24 jam | Eskalasi ke Super User |
| 6 | Proses Refund ke Buyer | Finance User (Internal) | ≤ 3 x 24 jam | Eskalasi ke Super User |
| 7 | Konfirmasi Stok oleh Supplier | Supplier (usermaster) | ≤ 4 jam | Supplier alternatif ditunjuk |
| 8 | Approval SO oleh HeadPurchasing | HeadPurchasing User (Buyer) | ≤ 3 x 24 jam | SO otomatis `Expired` dan dibatalkan oleh sistem |
| 9 | Proses RFQ oleh SalesAdmin | SalesAdmin User (Internal) | ≤ 7 hari kalender | RFQ otomatis `RFQ_Expired` oleh sistem |

### 19.3 Prosedur Detail

#### 19.3.1 SOP Verifikasi Pembayaran Buyer

**Trigger:** FinanceBuyer upload bukti transfer.
**Pihak:** Finance User internal.

1. Buka menu "Verifikasi Pembayaran".
2. Cocokkan nominal, nama pengirim, tanggal transfer.
3. Jika sesuai → Approve (status `paid`).
4. Jika tidak → Reject (isi alasan).

**SLA:** ≤ 24 jam.

#### 19.3.2 SOP Pembayaran ke Principal (Sistem Pecel)

**Trigger:** Invoice buyer `paid`.
**Pihak:** Finance User internal.

1. Sistem hitung deadline 48 jam dari `buyer_paid_at`.
2. Sistem buat Principal Invoice status `ready_to_pay`.
3. Finance User lihat di menu "Hutang Principal - Pecel" (dengan countdown timer).
4. Finance User transfer ke Principal dan upload bukti.
5. Status Principal Invoice → `paid`.

**SLA:** ≤ 48 jam. Jika lewat → `overdue`, eskalasi ke Super User.

#### 19.3.3 SOP Penanganan Dispute & Refund

**Trigger:** Buyer ajukan dispute.
**Pihak:** Finance User / SalesAdmin.

1. Sistem catat di `dispute_tickets` status `open`.
2. Internal periksa bukti dan data transaksi.
3. Jika diterima → proses refund ≤ 3 x 24 jam.
4. Jika ditolak → beri alasan ke Buyer.

**SLA Respon:** ≤ 1 x 24 jam.

### 19.4 Matriks Eskalasi

| Level | Pihak yang Dihubungi | Kriteria |
|---|---|---|
| **Level 1** | PIC langsung | SLA mendekati batas (H-1/H-2) |
| **Level 2** | Super User / Manajer Operasional | SLA terlewati (H+0 hingga H+3) |
| **Level 3** | Super Admin / Direksi | Pelanggaran SLA berat > 3 hari |

---

# 20. Acceptance Criteria & Skenario Uji

| Fitur | Kriteria Selesai |
|---|---|
| **SO Multi-Origin** | Ongkir dihitung per origin dan dijumlahkan. Breakdown tersimpan di `so_shipping_breakdown`. |
| **QR Code Label** | SalesPrincipal cetak label dengan QR; Purchasing User scan untuk terima paket. |
| **Konsolidasi SO** | SO otomatis `Ready_to_be_Picked_Up` jika semua DPO `fully_received`. |
| **Fallback Price** | SO tanpa Contract menggunakan diskon terkecil di kategori. |
| **Role Buyer** | AdminPurchasing buat SO, HeadPurchasing approve SO. |
| **Invoice Buyer** | Invoice terbit setelah SO `delivered`. Status "Current" di dashboard buyer. |
| **Payment Term** | Due date invoice = `issued_at` + `SO.payment_term_days`. |
| **Pembayaran Principal (Pecel)** | Principal Invoice terbit ≤ 5 menit setelah buyer paid; SLA 48 jam. |
| **Visibilitas Principal** | SalesPrincipal dapat melihat invoice buyer (view only). |
| **SO State Machine** | SO melewati state: `Draft` → `Submitted` → `Approved` → `Confirmed` → `Sent_to_Principal` → `Consolidating` → `Ready_to_be_Picked_Up`. SO yang di-reject kembali ke `Draft`. |
| **SO Expired** | SO yang tidak di-approve dalam 3x24 jam otomatis berstatus `Expired` dan dibatalkan. Notifikasi terkirim ke AdminPurchasing dan HeadPurchasing. |
| **RFQ State Machine** | RFQ melewati state: `RFQ_Draft` → `RFQ_Submitted` → `RFQ_In_Review` → (lanjut ke Quotation atau `RFQ_Rejected`). |
| **RFQ Expired** | RFQ yang tidak diproses SalesAdmin dalam 7 hari kalender otomatis berstatus `RFQ_Expired`. Notifikasi terkirim ke SalesAdmin dan Buyer. |
| **Quotation Revisi** | Buyer dapat meminta revisi Qn → status `Quotation_Under_Revision`. SalesAdmin memperbaiki dan mengirim ulang. |
| **Contract State Machine** | Contract melewati state: `Contract_Draft` → `Contract_Finalized` → `Contract_Signed_Buyer` → `Contract_Signed_Principal` → `Contract_Active` → `Converted_to_SO`. Contract yang melewati masa berlaku otomatis `Contract_Expired`. |

---

# 21. Prioritas Implementasi

| Phase | Fokus | Output | Estimasi |
|---|---|---|---|
| **Phase 1** | Master Data & Auth | Roles, Users, Companies, Produk, Kategori | 2 minggu |
| **Phase 2** | Produk (Berat/Dimensi/Origin) | Field weight, dimensi, origin_id | 1 minggu |
| **Phase 3** | RFQ, Qn, Contract (dengan state machine lengkap) | CRUD RFQ (state: draft→submitted→in_review→rejected/expired), Quotation (draft→sent→under_revision→rejected), Contract (draft→finalized→signed_buyer→signed_principal→active→expired), tanda tangan digital, cron job RFQ expired | 2 minggu |
| **Phase 4** | Sales Order (SO) & Multi-Origin Ongkir (dengan state machine lengkap) | SO (draft→submitted→rejected→approved→confirmed→sent_to_principal→consolidating→ready_to_be_picked_up→expired), approval HeadPurchasing, kalkulasi ongkir per origin, cron job SO expired 3x24 jam | 3 minggu |
| **Phase 5** | Draft PO & Otorisasi Purchasing | DPO otomatis, approval Purchasing User, kirim PO ke Principal | 2 minggu |
| **Phase 6** | Inbound Fulfillment & QR Label | Inbound shipment, QR Code, scan penerimaan | 2 minggu |
| **Phase 7** | Konsolidasi & Pickup Jaladara | Konsolidasi SO, pickup request ke Jaladara | 2 minggu |
| **Phase 8** | Invoice & Payment AR | Invoice buyer, approval Finance User, VA/Transfer | 2 minggu |
| **Phase 9** | Payment AP (Principal) | Principal Invoice, pembayaran pecel, SLA 48 jam | 2 minggu |
| **Phase 10** | CMS, Security, DRP, Monitoring | Artikel, newsletter, UU PDP, DRP, Grafana | 3 minggu |
| **Phase 11** | UAT, Legal, Accessibility | UAT, WCAG, multi-language | 2 minggu |
| **Phase 12** | Go-Live & Training | Deployment production, training admin, SOP final | 1 minggu |

**Total Estimasi:** ± 24 minggu (6 bulan).

---

# 22. Lampiran

Dokumen pendukung disediakan terpisah:

- **ERD Database** — Diagram relasi tabel.
- **Contoh Format Label + QR Code** — Template PDF.
- **User Flow Diagram** — Mermaid / PDF.
- **DRP Runbook** — Panduan recovery bencana.
- **Supplier/Principal API Documentation** — Spesifikasi endpoint.
- **Workflow Diagram** — Alur RFQ, SO, DPO, Inbound, Invoice, Payment.
- **State Diagram** — Status transisi SO (draft→submitted→rejected→approved→confirmed→sent_to_principal→consolidating→ready_to_be_picked_up→expired/delivered), DPO, Inbound Package, Invoice, RFQ (draft→submitted→in_review→rejected/expired), Quotation (draft→sent→under_revision→rejected), Contract (draft→finalized→signed_buyer→signed_principal→active→converted_to_so/expired).

---

**Disusun oleh:** Tim Produk OfficeSupply

**Disetujui oleh:** [Nama & Jabatan]

**Tanggal:** 1 Juli 2026

*Dokumen ini adalah bagian dari proses pengembangan sistem OfficeSupply B2B. Versi 3.1 mencakup pembaruan state machine lengkap untuk SO, RFQ, Quotation, dan Contract berdasarkan diagram proses bisnis terbaru.*