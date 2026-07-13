# PRODUCT REQUIREMENTS DOCUMENT (PRD)

OfficeSupply Online Shop B2B

**Versi 3.0** Final & Komprehensif

Tanggal: 22 Juni 2026

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

- **Pra-Transaksi:** RFQ dan Quotation (Qn) yang fleksibel (opsional dan tidak harus berurutan).
- **Transaksi:** Sales Order (SO) yang diterbitkan oleh AdminPurchasing dan diotorisasi oleh HeadPurchasing.
- **Fulfillment Internal:** Sistem otomatis menerbitkan Draft Purchase Order (DPO) ke Principal, yang kemudian dikirim ke gudang OfficeSupply dengan label ber-QR Code.
- **Konsolidasi & Pengiriman:** Barang dari berbagai Principal dikonsolidasi di gudang sebelum dikirim ke buyer via Jaladara.
- **Invoice & Payment:** Invoice ke Buyer terbit setelah SO delivered, pembayaran dari Buyer diverifikasi, lalu OfficeSupply membayar Principal (sistem "pecel" (Pecah Celengan)) dalam ≤ 48 jam.

---

# 2. Tujuan Sistem

1. Menyediakan platform B2B yang fleksibel dengan dukungan RFQ dan Quotation.
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
| **RFQ / Qn** | RFQ multi-produk dan Quotation (Qn) langsung atau dari RFQ. |
| **Sales Order (SO)** | Diterbitkan AdminPurchasing, diotorisasi HeadPurchasing. Mendukung harga Quotation yang disetujui atau harga fallback. |
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
| **SalesAdmin User** | Hubungan dengan Buyer. Mengelola RFQ, Qn, dan CMS. | Tidak bisa mengakses Draft PO (DPO) atau inbound gudang. |
| **Purchasing User** | Hubungan dengan Principal & Supplier. Mengelola DPO, otorisasi, inbound, scan QR. | Tidak bisa mengakses RFQ/Quotation atau modul keuangan (AR/AP). |
| **Finance User** | Verifikasi pembayaran, invoice, TOP, refund, pembayaran Principal. | Tidak bisa mengakses operasional purchasing atau sales. |

### B. Kelompok Perusahaan Buyer

**Ketentuan Struktur Role Buyer:** Perusahaan Buyer dapat memilih struktur user berdasarkan kebutuhan internal:

- **Skema 2 Role:** Jika Buyer tidak ingin menggunakan AdminPurchasing, maka Buyer hanya memiliki **HeadPurchasing User** dan **FinanceBuyer User**. Dalam skema ini, HeadPurchasing bertanggung jawab membuat sekaligus menyetujui SO, RFQ, dan Quotation.
- **Skema 3 Role:** Jika Buyer ingin memisahkan pembuat pesanan dan pihak approval, maka Buyer memiliki **HeadPurchasing User**, **AdminPurchasing User**, dan **FinanceBuyer User**. Dalam skema ini, AdminPurchasing membuat SO/RFQ, sedangkan HeadPurchasing melakukan approval.

| Role | Fungsi Utama | Hak Akses Spesifik |
|---|---|---|
| **HeadPurchasing User** | Manager dan Verifikator SO, RFQ, Quotation dari website, serta kelola user buyer. | Menyetujui/menolak SO dan Quotation, mengelola user buyer. **Pembuatan SO hanya melalui website utama (pintu depan), bukan dari dashboard buyer**. |
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
| **Super Admin / Super User** | Semua menu (User, Buyer, Principal, Produk, SO, RFQ, Qn, DPO, Keuangan, Inbound, CMS, Laporan, Audit, Setting). |
| **SalesAdmin User** | Dashboard Penjualan, Buyer, RFQ, Quotation, CMS (Artikel/Review). |
| **Purchasing User** | Dashboard Operasional, Principal, Supplier, **Draft PO (Otorisasi)**, **Inbound Receiving (Scan QR)**, Konsolidasi Monitor. |
| **Finance User** | Dashboard Keuangan, Payment Pending, VA Monitoring, TOP Aging, Dispute/Refund, **Hutang Principal (Pecel)**. |
| **HeadPurchasing User** | Dashboard Company, **Manage dan Verifikator SO, RFQ, Quotation (Inbox)**, Histori Transaksi, Kelola User Buyer. |
| **AdminPurchasing User** | **Buat SO**, RFQ, Tracking Pengiriman, Review. **Catatan:** Pembuatan SO/RFQ hanya melalui website utama (pintu depan).** Menu ini hanya muncul jika Buyer menggunakan **Skema 3 Role**. |
| **FinanceBuyer User** | Pembayaran, Upload Bukti Transfer, Invoice (status "Current"). |
| **SalesPrincipal User** | Dashboard Principal, **PO Masuk**, **Buat Inbound & Cetak Label QR**, Konfirmasi Pengiriman, **View Invoice Buyer**. |
| **ProductManager User** | Kelola Produk (Berat, Dimensi, Harga, Stok). |

---

# 6. Alur Utama Sistem

### 6.1 Alur RFQ (Opsional) → Quotation (Opsional)

- Buyer dapat membuat RFQ melalui AdminPurchasing atau HeadPurchasing, tergantung struktur role Buyer dan user yang membuat RFQ.
- HeadPurchasing dapat membuat RFQ baik pada Skema 2 Role maupun Skema 3 Role. Jika RFQ dibuat langsung oleh HeadPurchasing, maka RFQ tidak memerlukan approval HeadPurchasing lagi dan status RFQ langsung menjadi **In Review** untuk ditinjau oleh SalesAdmin internal OfficeSupply.
- Pada **Skema 2 Role**, Buyer hanya memiliki HeadPurchasing dan FinanceBuyer. Dalam skema ini, RFQ dibuat oleh HeadPurchasing, sehingga RFQ langsung masuk ke status **In Review**.
- Pada **Skema 3 Role**, Buyer memiliki AdminPurchasing, HeadPurchasing, dan FinanceBuyer. Dalam skema ini, RFQ dapat dibuat oleh AdminPurchasing atau HeadPurchasing.
- Jika RFQ pada Skema 3 Role dibuat oleh AdminPurchasing, maka status awal RFQ adalah **Submitted** dan wajib mendapatkan otorisasi atau persetujuan dari HeadPurchasing.
- HeadPurchasing dapat memberikan keputusan terhadap RFQ yang dibuat oleh AdminPurchasing, yaitu **In Review** atau **Rejected**.
- Jika RFQ **Rejected**, maka proses RFQ dihentikan atau dikembalikan kepada AdminPurchasing untuk perbaikan sesuai catatan dari HeadPurchasing.
- Jika RFQ disetujui oleh HeadPurchasing, maka status RFQ berubah menjadi **In Review**, karena RFQ perlu ditinjau terlebih dahulu oleh SalesAdmin internal OfficeSupply.
- SalesAdmin melakukan review terhadap RFQ yang masuk dengan status **In Review**. Review mencakup kelengkapan data Buyer, item produk, quantity, spesifikasi kebutuhan, file pendukung jika ada, dan kelayakan RFQ untuk diproses menjadi Quotation.
- Jika RFQ disetujui oleh SalesAdmin, maka status RFQ berubah menjadi **Ready For Quotation**.
- Setelah status menjadi **Ready For Quotation**, HeadPurchasing dapat melihat Quotation (Qn) berdasarkan RFQ tersebut.

### 6.1.1 Alur Khusus Produk Cetak

**Catatan Khusus:** Produk Aldo atau produk cetak memiliki alur transaksi yang berbeda dari produk katalog biasa. Produk cetak tidak langsung menampilkan harga final karena harga bergantung pada detail spesifikasi yang diminta oleh customer.

1. Buyer memilih produk Aldo / produk cetak dari katalog.
2. Sistem tidak menampilkan harga final secara langsung, melainkan mengarahkan Buyer ke form RFQ khusus produk cetak.
3. Buyer wajib mengisi spesifikasi cetak secara detail, seperti:
   - Jenis produk cetak.
   - Ukuran.
   - Bahan/material.
   - Jumlah pesanan.
   - Warna.
   - Finishing.
   - Jumlah sisi cetak.
   - Catatan desain atau kebutuhan khusus lainnya.
4. Buyer dapat mengunggah dokumen, seperti:
   - File desain dalam format PDF.
   - File gambar dalam format JPG, PNG, atau sejenisnya.
   - File dokumen dalam format DOC/DOCX.
   - File spreadsheet dalam format XLS/XLSX.
   - File pendukung lainnya sesuai kebutuhan produksi.
5. Setelah form lengkap, sistem membuat RFQ khusus produk cetak dengan status sesuai pembuat RFQ:
   - Jika RFQ dibuat oleh HeadPurchasing, baik pada Skema 2 Role maupun Skema 3 Role, maka status RFQ langsung menjadi **In Review**.
   - Jika RFQ dibuat oleh AdminPurchasing pada Skema 3 Role, maka status RFQ menjadi **Submitted** dan menunggu approval dari HeadPurchasing.
6. Untuk RFQ yang dibuat oleh AdminPurchasing, HeadPurchasing dapat memberikan keputusan **In Review** atau **Rejected**.
7. Jika RFQ **Rejected**, maka RFQ dikembalikan kepada AdminPurchasing untuk perbaikan atau dihentikan sesuai keputusan HeadPurchasing.
8. Jika RFQ disetujui oleh HeadPurchasing, maka status RFQ berubah menjadi **In Review** dan masuk ke dashboard SalesAdmin untuk diperiksa.
9. SalesAdmin meninjau spesifikasi, file pendukung, dan jumlah permintaan.
10. Jika data belum lengkap, SalesAdmin dapat mengembalikan RFQ ke Buyer dengan status **Revision Required** dan memberikan catatan perbaikan.
11. Jika data sudah lengkap, SalesAdmin berkoordinasi dengan pihak Aldo / Principal terkait untuk mendapatkan harga produksi.
12. Setelah harga produksi tersedia dan RFQ dinilai layak diproses, SalesAdmin mengubah status RFQ menjadi **Ready For Quotation**.
13. SalesAdmin menginput harga penawaran ke sistem dan membuat Quotation berdasarkan RFQ produk cetak tersebut.
14. Buyer menerima Quotation dan dapat melakukan:
    - **Approve** jika harga dan spesifikasi disetujui.
    - **Reject** jika tidak setuju.
15. Jika Quotation disetujui, sistem dapat melanjutkan proses menjadi Sales Order (SO).
16. Setelah menjadi SO, proses approval, payment, fulfillment, invoice, dan pengiriman mengikuti alur transaksi utama sistem.

**Aturan Penting:** Produk Aldo / produk cetak tidak dapat langsung masuk keranjang dengan harga final seperti produk reguler. Semua transaksi produk cetak wajib melalui RFQ karena harga bergantung pada spesifikasi dan file yang dikirim oleh Buyer.

**Status RFQ:**

| Status | Deskripsi | Kondisi Penggunaan |
|---|---|---|
| `Draft` | RFQ masih dalam proses penyusunan dan belum diajukan. | Digunakan saat RFQ baru dibuat oleh AdminPurchasing atau HeadPurchasing, tetapi belum dikirimkan untuk proses otorisasi atau review. |
| `Submitted` | RFQ telah dibuat dan menunggu approval dari HeadPurchasing. | Digunakan jika RFQ dibuat oleh AdminPurchasing pada Skema 3 Role dan sudah diajukan ke HeadPurchasing. |
| `Rejected` | RFQ ditolak oleh HeadPurchasing. | Digunakan jika RFQ yang dibuat oleh AdminPurchasing tidak disetujui oleh HeadPurchasing. RFQ dapat dihentikan atau dikembalikan untuk perbaikan sesuai catatan HeadPurchasing. |
| `In Review` | RFQ sedang ditinjau oleh SalesAdmin internal OfficeSupply. | Digunakan jika RFQ dibuat langsung oleh HeadPurchasing, baik pada Skema 2 Role maupun Skema 3 Role, atau setelah RFQ yang dibuat oleh AdminPurchasing disetujui dan diteruskan oleh HeadPurchasing. |
| `Ready For Quotation` | RFQ sudah siap diproses menjadi Quotation. | Digunakan setelah SalesAdmin menyatakan RFQ valid, lengkap, dan layak diproses menjadi Quotation. |

**Status Quotation:**

| Status | Deskripsi | Kondisi Penggunaan |
|---|---|---|
| `Draft` | Quotation masih dalam proses pembuatan oleh SalesAdmin. | Digunakan ketika SalesAdmin mulai menyusun harga, item, quantity, dan ketentuan penawaran berdasarkan RFQ atau kebutuhan transaksi. |
| `Issued` | Quotation telah diterbitkan dan dapat dilihat oleh Buyer. | Digunakan setelah SalesAdmin menyelesaikan Quotation dan mengirimkannya ke HeadPurchasing atau pihak Buyer yang berwenang. |
| `Approved` | Quotation disetujui oleh Buyer. | Digunakan jika Buyer menyetujui harga, item, quantity, dan ketentuan penawaran pada Quotation. Setelah approved, Quotation dapat dilanjutkan menjadi Sales Order (SO). |
| `Rejected` | Quotation ditolak oleh Buyer. | Digunakan jika Buyer tidak menyetujui harga, spesifikasi, atau ketentuan yang ditawarkan pada Quotation. |
| `Expired` | Quotation melewati masa berlaku penawaran. | Digunakan jika Quotation tidak disetujui sampai melewati tanggal berlaku yang ditentukan. |

### 6.2 Alur Sales Order (SO) oleh Buyer

- **Pembuatan SO hanya dilakukan dari website utama (pintu depan)**.
- Setelah SO dibuat di website utama, SO masuk ke proses approval/verifikasi di dashboard buyer sesuai struktur role:
  - Pada **Skema 2 Role** (HeadPurchasing + FinanceBuyer), SO yang dibuat oleh website utama langsung menunggu verifikasi HeadPurchasing.
  - Pada **Skema 3 Role** (HeadPurchasing + AdminPurchasing + FinanceBuyer), AdminPurchasing dapat membuat SO (di website utama) dan HeadPurchasing melakukan approval/verifikasi.
- HeadPurchasing memberikan keputusan terhadap SO: **Approved** atau **Rejected**.
- Jika SO **Rejected**, maka SO dihentikan atau dikembalikan untuk perbaikan sesuai catatan dari HeadPurchasing.
- Jika SO **Approved**, maka status SO berubah menjadi **In Review** untuk ditinjau oleh SalesAdmin internal OfficeSupply.
- Sistem tetap mencatat approval HeadPurchasing untuk kebutuhan audit trail.
- Sistem melakukan validasi wajib: cek berat dan dimensi produk. Jika ada produk yang belum memiliki berat atau dimensi, maka SO diblokir dan tidak dapat dilanjutkan.
- Sistem mengelompokkan produk berdasarkan `origin_id` untuk mendukung pengiriman multi-origin, seperti Klaten, Jakarta, dan origin lainnya.
- Sistem menghitung **Chargeable Weight per origin**, yaitu nilai terbesar antara berat aktual dan berat dimensi.
- Sistem mencari tarif Jaladara dari setiap origin ke alamat tujuan Buyer, lalu menghitung ongkir per origin. Total ongkir SO adalah penjumlahan seluruh ongkir dari masing-masing origin.
- Pembuat SO memilih delivery term (Franco atau Non-Franco), metode pembayaran (CBD atau TOP), serta payment term (jangka waktu pembayaran).
- SalesAdmin melakukan review terhadap SO dengan status **In Review**. Review mencakup kelengkapan data Buyer, item produk, harga, stok, origin pengiriman, berat dan dimensi produk, delivery term, metode pembayaran, serta payment term.
- Jika SO belum dapat diproses karena data tidak valid, stok tidak tersedia, produk bermasalah, harga tidak sesuai, dokumen pendukung tidak mencukupi, atau terdapat kendala operasional lain, maka SalesAdmin dapat mengubah status SO menjadi **Cannot Process** disertai catatan alasan.
- Jika SO dengan status **In Review** dinyatakan valid dan dapat diproses oleh SalesAdmin, maka status SO berubah menjadi **Confirmed**.
- Setelah SO berstatus **Confirmed**, sistem melanjutkan SO ke status **In Process** untuk diproses oleh sistem internal OfficeSupply.
- Setelah SO masuk status **In Process**, sistem internal OfficeSupply mulai memproses pesanan, termasuk pembuatan Draft Purchase Order (DPO) ke Principal sesuai item dan Principal yang terkait.
- Setelah barang diproses dan dikirim, status SO berubah menjadi **Delivery**.
- Jika proses SO melewati batas waktu tertentu atau masa berlaku transaksi habis sebelum diproses, maka status SO dapat berubah menjadi **Expired**.
- Jika pesanan telah diterima Buyer dan seluruh proses transaksi selesai, maka status SO berubah menjadi **Done**.

**Status Sales Order (SO):**

| Status | Deskripsi | Kondisi Penggunaan |
|---|---|---|
| `Draft` | SO masih dalam proses penyusunan dan belum diajukan untuk approval. | Digunakan saat SO baru dibuat tetapi belum dikirimkan oleh AdminPurchasing atau HeadPurchasing untuk diproses lebih lanjut. |
| `Submitted` | SO telah diajukan dan menunggu proses otorisasi atau tindak lanjut. | Digunakan jika SO dibuat oleh AdminPurchasing pada Skema 3 Role dan sudah dikirimkan ke HeadPurchasing untuk diproses. |
| `Rejected` | SO ditolak oleh HeadPurchasing. | Digunakan jika SO yang dibuat oleh AdminPurchasing pada Skema 3 Role tidak disetujui oleh HeadPurchasing. SO dapat dihentikan atau dikembalikan kepada AdminPurchasing untuk perbaikan sesuai catatan HeadPurchasing. |
| `In Review` | SO sedang ditinjau oleh SalesAdmin internal OfficeSupply. | Digunakan setelah SO dibuat langsung oleh HeadPurchasing, atau setelah SO dari AdminPurchasing disetujui oleh HeadPurchasing. |
| `Cannot Process` | SO tidak dapat diproses oleh internal OfficeSupply. | Digunakan jika SalesAdmin menemukan data tidak valid, stok tidak tersedia, produk bermasalah, harga tidak sesuai, dokumen pendukung tidak mencukupi, atau terdapat kendala operasional lain yang membuat SO belum atau tidak dapat dilanjutkan. |
| `Confirmed` | SO telah terkonfirmasi dan siap masuk proses internal. | Digunakan setelah SO dengan status In Review dinyatakan valid oleh SalesAdmin. |
| `In Process` | SO sedang diproses oleh internal OfficeSupply. | Digunakan setelah SO berstatus Confirmed. Pada tahap ini, sistem mulai memproses pesanan, termasuk pembuatan Draft Purchase Order (DPO) ke Principal. |
| `Delivery` | Pesanan sedang dalam proses pengiriman ke Buyer. | Digunakan setelah barang siap dikirim atau sedang dikirim melalui Jaladara. |
| `Expired` | SO melewati batas waktu proses atau masa berlaku transaksi. | Digunakan jika SO tidak diproses sampai batas waktu yang ditentukan. |
| `Done` | SO selesai. | Digunakan setelah Buyer menerima barang dan seluruh proses transaksi SO selesai. |

### 6.3 Alur Otomatisasi Draft PO ke Principal

1. Proses otomatisasi Draft Purchase Order (DPO) ke Principal berjalan setelah SO berstatus **Confirmed**.
2. Setelah SO berstatus **Confirmed**, sistem internal OfficeSupply mulai memproses pesanan dan mengubah status proses internal menjadi **Sent To Principal**.
3. Sistem mengelompokkan item SO berdasarkan Principal menggunakan `principal_company_id` pada data produk.
4. Untuk setiap Principal yang terlibat dalam SO, sistem otomatis membuat Draft Purchase Order (DPO) berdasarkan item produk yang sesuai dengan Principal tersebut.
5. DPO dikirim ke Purchasing User internal untuk diperiksa dan diotorisasi sebelum diteruskan sebagai PO Final ke Principal.
6. Purchasing User melakukan approval terhadap DPO. Jika DPO disetujui, status DPO berubah menjadi **Authorized** dan sistem otomatis menerbitkan PO Final ke SalesPrincipal melalui email dan dashboard Principal.
7. Setelah PO Final diterima oleh SalesPrincipal, Principal mulai melakukan pemenuhan barang. Pada tahap ini, status proses Principal berada pada **Consolidating**.
8. Status **Consolidating** menunjukkan bahwa Principal sedang menyiapkan, mengemas, dan memenuhi barang sesuai PO yang diterima dari OfficeSupply.
9. Jika seluruh barang dari Principal sudah siap untuk diambil oleh internal OfficeSupply atau pihak logistik yang ditunjuk, maka status Principal berubah menjadi **Ready To Delivery**.
10. Setelah barang diambil oleh internal OfficeSupply atau pihak logistik, status pada sisi Principal berubah dari **Ready To Delivery** menjadi **Done**.
11. Pada sisi Buyer, status SO tetap berada pada **Confirmed** selama proses pemenuhan oleh Principal dan proses internal OfficeSupply masih berjalan.
12. Setelah barang berhasil diambil dan dikirimkan kepada Buyer, status SO pada sisi Buyer berubah dari **Confirmed** menjadi **Delivered**.

**Status Proses Internal ke Principal:**

| Status | Deskripsi | Kondisi Penggunaan |
|---|---|---|
| `Sent To Principal` | Pesanan telah diproses internal dan diteruskan ke Principal. | Digunakan setelah SO berstatus Confirmed dan sistem mulai membuat DPO/PO untuk Principal terkait. |
| `Consolidating` | Principal sedang melakukan pemenuhan dan persiapan barang. | Digunakan setelah PO Final diterima oleh Principal dan Principal mulai menyiapkan barang sesuai PO. |
| `Ready To Delivery` | Barang dari Principal sudah siap untuk diambil. | Digunakan ketika Principal telah menyelesaikan persiapan barang dan barang siap diambil oleh internal OfficeSupply atau pihak logistik. |
| `Done` | Proses pemenuhan dari Principal telah selesai. | Digunakan setelah barang diambil oleh internal OfficeSupply atau pihak logistik dari Principal. |

### 6.4 Alur Fulfillment Principal → Internal OfficeSupply / Pickup Barang

1. SalesPrincipal menerima PO Final melalui dashboard Principal dan/atau email setelah DPO diotorisasi oleh Purchasing User internal OfficeSupply.
2. Setelah PO Final diterima, SalesPrincipal mulai menyiapkan produk sesuai item, quantity, dan detail pesanan pada PO. Pada tahap ini, status pemenuhan Principal berada pada **Consolidating**.
3. SalesPrincipal membuat data paket atau Inbound Shipment di sistem dengan menginput jumlah kardus, berat, dimensi, dan estimasi waktu barang siap diambil.
4. Sistem generate **QR Code unik** untuk setiap kardus atau paket yang dibuat oleh SalesPrincipal.
5. Sistem generate **PDF Label** berisi informasi PO, SO, nomor paket, Buyer, alamat tujuan, deskripsi barang, jumlah kardus, dan QR Code.
6. SalesPrincipal mencetak label dan menempelkan label QR Code pada setiap kardus atau paket.
7. Jika seluruh barang sudah selesai disiapkan dan diberi label, maka SalesPrincipal mengubah status pemenuhan menjadi **Ready To Delivery**.
8. Status **Ready To Delivery** menandakan bahwa barang sudah siap diambil oleh internal OfficeSupply atau pihak logistik yang ditunjuk.
9. Purchasing User internal OfficeSupply atau petugas pickup melakukan pengambilan barang dari lokasi Principal sesuai jadwal pickup.
10. Saat proses pickup, Purchasing User atau petugas pickup melakukan **scan QR Code** pada setiap kardus atau paket.
11. Sistem menampilkan detail paket berdasarkan QR Code, termasuk informasi PO, SO, Principal, Buyer, jumlah paket, dan deskripsi barang.
12. Purchasing User atau petugas pickup memeriksa kondisi fisik paket:
    - Jika kondisi paket baik, maka paket diterima dan status paket menjadi **Received**.
    - Jika kondisi paket rusak, tidak sesuai, atau terdapat selisih jumlah, maka status paket menjadi **Damaged** atau **Issue Found**, dan sistem membuat catatan kendala atau dispute ticket.
13. Jika seluruh kardus atau paket dalam satu PO Principal sudah berhasil discan dan diterima saat pickup, maka status proses Principal berubah dari **Ready To Delivery** menjadi **Done**.
14. Status **Done** pada sisi Principal menandakan bahwa kewajiban Principal untuk menyiapkan dan menyerahkan barang kepada internal OfficeSupply atau pihak logistik telah selesai.
15. Setelah barang berhasil diambil dari Principal, internal OfficeSupply dapat melanjutkan proses pengiriman atau konsolidasi sesuai kebutuhan SO.
16. Pada sisi Buyer, status SO tetap mengikuti status transaksi Buyer. Status SO berubah menjadi **Delivered** setelah barang berhasil dikirim dan diterima oleh Buyer.

**Status Fulfillment Principal:**

| Status | Deskripsi | Kondisi Penggunaan |
|---|---|---|
| `Consolidating` | Principal sedang menyiapkan dan mengemas barang. | Digunakan setelah PO Final diterima oleh SalesPrincipal dan Principal mulai melakukan pemenuhan barang. |
| `Ready To Delivery` | Barang sudah siap untuk diambil. | Digunakan setelah seluruh barang selesai disiapkan, dikemas, diberi label QR Code, dan siap diambil oleh internal OfficeSupply atau pihak logistik. |
| `Done` | Barang sudah diambil dari Principal. | Digunakan setelah seluruh paket berhasil discan dan diterima oleh internal OfficeSupply atau pihak logistik saat proses pickup. |

**Status Paket Principal:**

| Status | Deskripsi | Kondisi Penggunaan |
|---|---|---|
| `Received` | Paket diterima dalam kondisi baik saat pickup. | Digunakan setelah QR Code paket discan dan kondisi fisik paket dinyatakan baik. |
| `Damaged` | Paket ditemukan rusak saat proses pickup. | Digunakan jika paket rusak secara fisik dan perlu dicatat sebagai kendala atau dispute. |
| `Issue Found` | Terdapat kendala pada paket. | Digunakan jika terdapat selisih jumlah, barang tidak sesuai, label tidak valid, atau kendala lain yang membutuhkan pemeriksaan lanjutan. |

### 6.5 Alur Konsolidasi SO & Pengiriman ke Buyer

1. Sistem mengecek seluruh proses pemenuhan Principal yang terkait dengan satu SO.
2. Jika seluruh Principal yang terkait dengan SO sudah menyelesaikan pemenuhan barang dan statusnya menjadi **Ready To Delivery**, maka internal OfficeSupply dapat memulai proses pickup atau pengambilan barang.
3. Sistem mengirimkan notifikasi kepada Purchasing User dan SalesAdmin bahwa barang dari Principal sudah siap untuk diambil.
4. Purchasing User membuat atau mengatur **Pickup Request** kepada pihak logistik yang ditunjuk (Jaladara) atau kepada tim internal OfficeSupply jika pengambilan dilakukan sendiri.
5. Pihak logistik atau tim internal OfficeSupply mengambil barang dari lokasi Principal sesuai jadwal pickup.
6. Saat proses pickup, setiap paket atau kardus discan menggunakan QR Code untuk memastikan kesesuaian PO, SO, Principal, Buyer, dan jumlah paket.
7. Jika seluruh paket dari Principal berhasil discan dan diterima saat pickup, maka status pemenuhan pada sisi Principal berubah dari **Ready To Delivery** menjadi **Done**.
8. Jika dalam satu SO terdapat lebih dari satu Principal, maka sistem melakukan pengecekan apakah seluruh Principal yang terkait sudah berstatus **Done**.
9. Jika seluruh Principal dalam satu SO sudah berstatus **Done**, maka internal OfficeSupply dapat melanjutkan proses konsolidasi barang untuk dikirimkan ke Buyer.
10. Proses konsolidasi dilakukan untuk memastikan seluruh item dari berbagai Principal dalam satu SO sudah lengkap sebelum dikirim ke alamat Buyer.
11. Setelah barang selesai dikonsolidasi dan siap dikirim, pihak logistik (Jaladara) melakukan pengiriman ke alamat Buyer sesuai data pada SO.
12. Pada sisi Buyer, status SO tetap berada pada **Confirmed** selama proses pemenuhan Principal, pickup, konsolidasi, dan pengiriman masih berjalan.
13. Setelah barang berhasil dikirim dan diterima oleh Buyer, status SO pada sisi Buyer berubah dari **Confirmed** menjadi **Delivered**.
14. Setelah status SO menjadi **Delivered**, sistem dapat melanjutkan proses berikutnya, yaitu penerbitan invoice ke Buyer sesuai alur invoice.

**Status Konsolidasi & Pengiriman:**

| Status | Deskripsi | Kondisi Penggunaan |
|---|---|---|
| `Ready To Delivery` | Barang dari Principal sudah siap diambil. | Digunakan pada sisi Principal setelah barang selesai disiapkan, dikemas, dan diberi label QR Code. |
| `Done` | Pemenuhan dari Principal telah selesai. | Digunakan pada sisi Principal setelah barang berhasil diambil oleh internal OfficeSupply atau pihak logistik. |
| `Confirmed` | SO Buyer masih aktif dan sedang dalam proses pemenuhan. | Digunakan pada sisi Buyer selama proses pickup, konsolidasi, dan pengiriman belum selesai. |
| `Delivered` | Barang telah diterima oleh Buyer. | Digunakan pada sisi Buyer setelah pengiriman selesai dan barang diterima oleh Buyer. |

### 6.6 Alur Invoice ke Buyer (Setelah SO Delivered)

1. Proses invoice ke Buyer dimulai setelah status SO pada sisi Buyer berubah menjadi **Delivered**.
2. Status **Delivered** menandakan bahwa barang telah dikirim dan diterima oleh Buyer, sehingga transaksi sudah memenuhi syarat untuk dibuatkan invoice.
3. Sistem otomatis membuat **Draft Invoice** berdasarkan data SO, item produk, quantity, harga, ongkir, pajak, dan informasi Buyer.
4. Sistem melakukan pengecekan terhadap seluruh item pada SO untuk menentukan apakah item termasuk kategori PPN atau Non-PPN.
5. Jika seluruh item dalam SO termasuk kategori PPN, maka sistem membuat satu Draft Invoice dengan tipe **PPN**.
6. Jika seluruh item dalam SO termasuk kategori Non-PPN, maka sistem membuat satu Draft Invoice dengan tipe **Non-PPN**.
7. Jika dalam satu SO terdapat item campuran (sebagian item PPN dan sebagian item Non-PPN), maka sistem memisahkan invoice menjadi dua Draft Invoice:
   - Draft Invoice **PPN** untuk item yang dikenakan pajak.
   - Draft Invoice **Non-PPN** untuk item yang tidak dikenakan pajak.
8. Setiap Draft Invoice tetap terhubung ke SO yang sama, tetapi memiliki nomor invoice, tipe invoice, subtotal, pajak, dan total tagihan masing-masing sesuai kategori itemnya.
9. Ongkir dapat dialokasikan ke invoice sesuai aturan pajak perusahaan. Jika ongkir dikenakan PPN, maka ongkir dimasukkan ke Draft Invoice PPN. Jika tidak dikenakan PPN, maka ongkir dimasukkan ke Draft Invoice Non-PPN. Jika diperlukan, ongkir dapat dipisahkan secara proporsional berdasarkan nilai item PPN dan Non-PPN.
10. Sistem mengambil **payment term (TOP)** dari data SO, langsung dari data SO. Payment term menggunakan ketentuan berbasis kelipatan per 30 hari, sehingga sistem dapat mengakomodasi pilihan seperti 30 hari, 60 hari, 90 hari, dan seterusnya.
11. Sistem menghitung tanggal jatuh tempo invoice berdasarkan tanggal invoice diterbitkan ditambah jumlah hari pada payment term yang tersimpan di SO.
12. Setelah Draft Invoice dibuat, sistem mengirimkan notifikasi kepada Finance User internal bahwa terdapat Draft Invoice yang menunggu pemeriksaan dan persetujuan.
13. Finance User internal memeriksa Draft Invoice, termasuk kesesuaian data Buyer, nomor SO, item, quantity, harga, ongkir, tipe pajak, payment term, subtotal, PPN jika ada, dan total tagihan.
14. Jika Draft Invoice belum sesuai, Finance User dapat mengembalikan invoice untuk diperbaiki atau menahan proses penerbitan sampai data dinyatakan valid.
15. Jika Draft Invoice sudah sesuai, Finance User melakukan approval sehingga status invoice berubah menjadi **Issued**.
16. Setelah invoice berstatus **Issued**, sistem mengirimkan invoice final ke FinanceBuyer melalui dashboard dan/atau email notifikasi.
17. Pada dashboard FinanceBuyer, invoice yang sudah diterbitkan akan tampil dengan status **Current** selama belum melewati tanggal jatuh tempo dan belum dibayar.
18. Jika satu SO menghasilkan dua invoice (invoice PPN dan invoice Non-PPN), maka FinanceBuyer akan melihat keduanya sebagai invoice terpisah tetapi tetap merujuk ke nomor SO yang sama.
19. SalesPrincipal User dapat melihat invoice Buyer secara view only untuk memantau status pembayaran yang berhubungan dengan transaksi Principal tersebut.
20. Setelah invoice diterbitkan, proses berlanjut ke alur pembayaran Buyer ke OfficeSupply.

**Status Invoice Buyer:**

| Status | Deskripsi | Kondisi Penggunaan |
|---|---|---|
| `Draft` | Invoice masih berupa draft dan belum dikirim ke Buyer. | Digunakan setelah SO berstatus Delivered dan sistem otomatis membuat Draft Invoice. |
| `Issued` | Invoice telah disetujui Finance User dan resmi diterbitkan. | Digunakan setelah Finance User internal melakukan approval terhadap Draft Invoice. |
| `Current` | Invoice aktif, belum jatuh tempo, dan belum dibayar. | Ditampilkan pada dashboard FinanceBuyer setelah invoice berstatus Issued dan masih berada dalam periode pembayaran. |
| `Overdue` | Invoice sudah melewati tanggal jatuh tempo dan belum dibayar. | Digunakan jika pembayaran belum diterima sampai melewati due date berdasarkan payment term SO. |
| `Paid` | Invoice telah dibayar oleh Buyer. | Digunakan setelah pembayaran Buyer berhasil diverifikasi oleh sistem atau oleh Finance User internal. |

**Tipe Invoice Buyer:**

| Tipe Invoice | Deskripsi | Kondisi Penggunaan |
|---|---|---|
| `PPN` | Invoice untuk item yang dikenakan pajak. | Digunakan jika item pada SO termasuk kategori barang kena pajak atau memiliki pengaturan pajak PPN. |
| `Non-PPN` | Invoice untuk item yang tidak dikenakan pajak. | Digunakan jika item pada SO termasuk kategori barang tidak kena pajak atau tidak memiliki pengaturan pajak PPN. |
| `Split Invoice` | Satu SO menghasilkan invoice PPN dan Non-PPN secara terpisah. | Digunakan jika dalam satu SO terdapat kombinasi item PPN dan Non-PPN. Sistem membuat dua invoice terpisah yang tetap merujuk ke SO yang sama. |

### 6.7 Alur Pembayaran Buyer → OfficeSupply

1. Proses pembayaran dimulai setelah invoice Buyer berstatus **Issued** dan tampil di dashboard FinanceBuyer dengan status **Current**.
2. Jika satu SO menghasilkan lebih dari satu invoice (invoice PPN dan invoice Non-PPN), maka FinanceBuyer dapat melihat masing-masing invoice secara terpisah tetapi tetap merujuk ke nomor SO yang sama.
3. FinanceBuyer memilih invoice yang akan dibayar, baik satu invoice tertentu maupun beberapa invoice yang masih berstatus **Current** atau **Overdue**.
4. FinanceBuyer memilih metode pembayaran:
   - **VA (Xendit)**, jika pembayaran dilakukan melalui Virtual Account.
   - **Transfer Bank**, jika pembayaran dilakukan secara manual melalui rekening bank OfficeSupply.
5. Jika menggunakan VA (Xendit), sistem membuat Virtual Account atau instruksi pembayaran sesuai total tagihan invoice yang dipilih.
6. Jika menggunakan Transfer Bank, FinanceBuyer melakukan transfer ke rekening OfficeSupply sesuai total tagihan invoice, lalu mengunggah bukti transfer ke sistem.
7. Untuk pembayaran melalui VA (Xendit), sistem menerima **callback otomatis** dari Xendit setelah pembayaran berhasil.
8. Untuk pembayaran melalui Transfer Bank, Finance User internal melakukan **verifikasi manual** terhadap bukti transfer, nominal pembayaran, tanggal transfer, rekening tujuan, dan identitas pengirim.
9. Jika pembayaran tidak sesuai, Finance User dapat menolak verifikasi pembayaran dan memberikan catatan alasan kepada FinanceBuyer.
10. Jika pembayaran sesuai, sistem atau Finance User internal melakukan approval pembayaran.
11. Setelah pembayaran berhasil diverifikasi, status invoice Buyer berubah menjadi **Paid**.
12. Jika dalam satu SO terdapat invoice PPN dan Non-PPN, maka status **Paid** diterapkan per invoice. Artinya, invoice PPN dan invoice Non-PPN dapat memiliki status pembayaran yang berbeda sampai keduanya dibayar.
13. Jika seluruh invoice yang terkait dengan satu SO sudah berstatus **Paid**, maka sistem menandai pembayaran SO tersebut sebagai lunas secara keseluruhan.
14. Setelah invoice Buyer berstatus **Paid**, sistem melanjutkan proses pembayaran OfficeSupply ke Principal sesuai alur pembayaran Principal atau sistem Pecel.

**Status Pembayaran Invoice Buyer:**

| Status | Deskripsi | Kondisi Penggunaan |
|---|---|---|
| `Current` | Invoice aktif, belum jatuh tempo, dan belum dibayar. | Digunakan setelah invoice berstatus Issued dan masih berada dalam periode pembayaran sesuai payment term. |
| `Overdue` | Invoice melewati tanggal jatuh tempo dan belum dibayar. | Digunakan jika pembayaran belum diterima sampai melewati due date berdasarkan payment term SO. |
| `Payment Pending` | Pembayaran sedang menunggu verifikasi. | Digunakan jika FinanceBuyer sudah melakukan pembayaran atau mengunggah bukti transfer, tetapi pembayaran belum diverifikasi oleh sistem atau Finance User internal. |
| `Payment Rejected` | Pembayaran ditolak karena tidak sesuai. | Digunakan jika bukti transfer, nominal, rekening tujuan, atau informasi pembayaran tidak valid. |
| `Paid` | Invoice telah dibayar dan pembayaran sudah diverifikasi. | Digunakan setelah pembayaran berhasil diverifikasi melalui callback VA Xendit atau approval manual oleh Finance User internal. |

### 6.8 Alur Pembayaran OfficeSupply ke Principal (Sistem "Pecel")

1. Sistem mendeteksi invoice Buyer yang sudah berstatus **Paid**.
2. Jika satu SO hanya memiliki satu invoice Buyer, maka proses pembayaran ke Principal dapat dimulai setelah invoice tersebut berstatus **Paid**.
3. Jika satu SO memiliki lebih dari satu invoice Buyer (invoice PPN dan invoice Non-PPN), maka sistem mengecek status pembayaran masing-masing invoice.
4. Proses pembayaran OfficeSupply ke Principal dapat dimulai setelah invoice Buyer yang terkait dengan item Principal tersebut berstatus **Paid**.
5. Setelah invoice Buyer berstatus **Paid**, sistem otomatis menghitung **deadline pembayaran 48 jam** kepada Principal berdasarkan waktu pembayaran Buyer berhasil diverifikasi.
6. Sistem membuat **Principal Invoice** atau tagihan pembayaran ke Principal dengan status awal **Ready To Pay**.
7. Principal Invoice dibuat berdasarkan item Principal yang terdapat pada SO, nilai tagihan Principal, dan invoice Buyer yang sudah dibayar.
8. Jika dalam satu SO terdapat beberapa Principal, maka sistem membuat Principal Invoice secara terpisah untuk masing-masing Principal sesuai item dan nilai tagihannya.
9. Sistem mengirimkan notifikasi kepada Finance User internal bahwa terdapat Principal Invoice dengan status **Ready To Pay** yang harus dibayarkan.
10. Notifikasi kepada Finance User internal dilengkapi dengan **countdown timer** untuk memantau batas waktu pembayaran 48 jam.
11. Finance User internal memeriksa Principal Invoice, termasuk Principal tujuan, nomor SO, item, nilai pembayaran, rekening Principal, dan status pembayaran invoice Buyer terkait.
12. Jika data Principal Invoice sudah sesuai, Finance User melakukan transfer pembayaran ke rekening Principal.
13. Setelah transfer dilakukan, Finance User mengunggah bukti transfer ke sistem.
14. Setelah bukti transfer tersimpan dan pembayaran dinyatakan selesai, status Principal Invoice berubah menjadi **Paid**.
15. Jika pembayaran ke Principal belum dilakukan sampai melewati batas waktu 48 jam, maka status Principal Invoice berubah menjadi **Overdue**.
16. Jika Principal Invoice berstatus **Overdue**, sistem mengirimkan notifikasi eskalasi kepada Super User untuk tindak lanjut.

**Status Principal Invoice:**

| Status | Deskripsi | Kondisi Penggunaan |
|---|---|---|
| `Ready To Pay` | Principal Invoice siap dibayarkan oleh OfficeSupply. | Digunakan setelah invoice Buyer terkait berstatus Paid dan sistem membuat tagihan pembayaran untuk Principal. |
| `Paid` | Principal Invoice sudah dibayar oleh OfficeSupply. | Digunakan setelah Finance User internal melakukan transfer ke Principal dan mengunggah bukti transfer. |
| `Overdue` | Pembayaran ke Principal melewati batas waktu 48 jam. | Digunakan jika Principal Invoice belum dibayar sampai melewati deadline 48 jam sejak invoice Buyer terkait berstatus Paid. |

### 6.9 Alur Repeat Order

**Aturan Sistem:** Fitur Repeat Order hanya dapat dilakukan pada transaksi Sales Order (SO) biasa.

- Repeat Order tidak dapat dilakukan dari dokumen RFQ atau Quotation.
- SO yang berasal dari Quotation juga tidak dapat di-repeat order, karena harga, item, masa berlaku penawaran, dan ketentuan bisnisnya perlu disesuaikan atau dinegosiasikan ulang.
- Repeat Order hanya tersedia untuk SO biasa yang tidak berasal dari RFQ, Quotation, dan sudah memiliki status akhir tertentu seperti **Delivered** atau **Done**.

1. User membuka detail SO biasa yang sudah pernah dibuat dan memenuhi syarat untuk dilakukan Repeat Order.
2. User menekan tombol khusus **Repeat Order** pada halaman detail SO.
3. Sistem melakukan pengecekan sumber transaksi SO:
   - Jika SO merupakan SO biasa, maka proses Repeat Order dapat dilanjutkan.
   - Jika SO berasal dari RFQ atau Quotation, maka tombol Repeat Order tidak ditampilkan atau sistem menolak proses Repeat Order.
4. Sistem mengambil rincian item dari SO lama, termasuk produk, quantity, satuan, Principal, dan informasi pendukung lainnya.
5. Sistem melakukan pengecekan ulang terhadap data produk, seperti status produk aktif, ketersediaan stok, harga terbaru, berat, dimensi, dan origin pengiriman.
6. Jika terdapat item yang sudah tidak aktif, stok tidak tersedia, harga berubah, atau data produk tidak valid, maka sistem menampilkan informasi kepada user dan meminta penyesuaian sebelum pesanan dilanjutkan.
7. Jika semua item valid, sistem otomatis memasukkan rincian pesanan tersebut ke dalam **Keranjang (Cart)** untuk diproses sebagai SO baru.
8. User dapat meninjau ulang isi keranjang, mengubah quantity jika diperlukan, memilih delivery term, metode pembayaran, dan payment term.
9. Setelah user melanjutkan checkout, sistem membuat SO baru berdasarkan data Repeat Order.
10. SO baru hasil Repeat Order tetap mengikuti alur approval dan status SO normal:
    - Jika dibuat oleh HeadPurchasing, maka SO langsung masuk ke status **In Review**.
    - Jika dibuat oleh AdminPurchasing pada Skema 3 Role, maka SO masuk ke status **Submitted** dan menunggu approval HeadPurchasing.
11. Setelah SO baru dibuat, proses berlanjut sesuai alur SO normal, mulai dari review, confirmation, pemrosesan internal, pengiriman, invoice, hingga pembayaran.

**Aturan Repeat Order:**

| Kondisi | Aturan | Keterangan |
|---|---|---|
| **Sumber Repeat Order** | Hanya dari SO biasa. | Repeat Order hanya dapat dilakukan dari transaksi Sales Order yang tidak berasal dari RFQ atau Quotation. |
| **SO dari RFQ** | Tidak bisa Repeat Order. | Jika kebutuhan masih sama, Buyer harus membuat proses baru sesuai alur RFQ atau SO yang berlaku. |
| **SO dari Quotation** | Tidak bisa Repeat Order. | Harga dan ketentuan penawaran dapat berubah, sehingga perlu dibuat transaksi atau penawaran baru. |
| **Status SO Lama** | Harus sudah selesai atau pernah dikirim. | Tombol Repeat Order dapat ditampilkan untuk SO biasa dengan status Delivered atau Done. |
| **Validasi Produk** | Sistem wajib melakukan validasi ulang. | Produk, stok, harga, berat, dimensi, dan origin pengiriman harus dicek ulang sebelum masuk ke Cart. |
| **Harga** | Menggunakan harga yang berlaku saat Repeat Order dibuat. | Sistem tidak otomatis memakai harga lama dari SO sebelumnya. |
| **SO Baru** | Repeat Order menghasilkan SO baru. | SO baru memiliki nomor SO baru dan mengikuti alur approval, review, dan pemrosesan normal. |

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

### 7.3 Tabel Pra-Transaksi (RFQ → Qn)

- `rfqs` & `rfq_items`
- `quotations` & `quotation_items`
  - `attachments` — JSON berisi daftar file pendukung quotation, seperti path S3, nama file asli, mime type, ukuran file, dan kategori file.

### 7.3.1 Penyesuaian Data untuk Produk Cetak / Aldo

- Produk Aldo / produk cetak tetap menggunakan tabel RFQ dan Quotation yang sudah ada, tanpa perlu membuat tabel khusus baru.
- Pada tabel `quotations`, ditambahkan kolom untuk menyimpan file pendukung produk cetak yang diunggah ke storage S3.
- File pendukung dapat berupa PDF, DOC/DOCX, XLS/XLSX, JPG, PNG, atau format desain lain yang dibutuhkan untuk proses penawaran.

### 7.4 Tabel Transaksi Utama (SO & Multi-Origin)

- `sales_orders` — menyimpan `payment_term_id`, `payment_term_days_snapshot`, `consolidation_status`.
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

- **Fallback Price:** Jika SO tanpa Quotation, harga = `base_price × (1 - diskon terkecil di kategori)`.
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
| **Konsolidasi SO** | SO siap diambil (ready_to_be_picked_up) hanya jika semua DPO Principal sudah `fully_received`. |
| **Payment Term SO** | Jangka waktu pembayaran (TOP) diambil dari SO, tersimpan langsung pada SO. |
| **Invoice Buyer** | Draft Invoice terbit **setelah** SO `delivered`. Harus di-approve Finance User internal sebelum dikirim. |
| **Pembayaran Principal (Pecel)** | OfficeSupply membayar Principal **setelah** buyer lunas, dalam ≤ 2 x 24 jam (48 jam). |
| **SLA Principal** | Wajib kirim ke gudang ≤ 5 hari kerja setelah PO diterima. |

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
- **Queue:** Laravel Horizon + Redis untuk antrian.

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
| **Konsolidasi SO** | SO otomatis `ready_to_be_picked_up` jika semua DPO `fully_received`. |
| **Fallback Price** | SO tanpa Quotation menggunakan diskon terkecil di kategori. |
| **Role Buyer** | AdminPurchasing buat SO, HeadPurchasing approve SO. |
| **Invoice Buyer** | Invoice terbit setelah SO `delivered`. Status "Current" di dashboard buyer. |
| **Payment Term** | Due date invoice = `issued_at` + `SO.payment_term_days`. |
| **Pembayaran Principal (Pecel)** | Principal Invoice terbit ≤ 5 menit setelah buyer paid; SLA 48 jam. |
| **Visibilitas Principal** | SalesPrincipal dapat melihat invoice buyer (view only). |

---

# 21. Prioritas Implementasi

| Phase | Fokus | Output | Estimasi |
|---|---|---|---|
| **Phase 1** | Master Data & Auth | Roles, Users, Companies, Produk, Kategori | 2 minggu |
| **Phase 2** | Produk (Berat/Dimensi/Origin) | Field weight, dimensi, origin_id | 1 minggu |
| **Phase 3** | RFQ, Qn | CRUD RFQ dan Quotation | 2 minggu |
| **Phase 4** | Sales Order (SO) & Multi-Origin Ongkir | SO, approval HeadPurchasing, kalkulasi ongkir per origin | 3 minggu |
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
- **State Diagram** — Status transisi SO, DPO, Inbound Package, Invoice.

---

**Disusun oleh:** Tim Produk OfficeSupply

**Disetujui oleh:** [Nama & Jabatan]

**Tanggal:** 22 Juni 2026

*Dokumen ini adalah bagian dari proses pengembangan sistem OfficeSupply B2B.*