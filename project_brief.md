# Project Brief: Aplikasi Pembukuan UMKM Tahu

## 1. Ringkasan Proyek

Proyek ini adalah inisiatif pemberdayaan UMKM lokal dalam konteks Beasiswa Bakti BCA. Tujuan utamanya adalah membantu UMKM lokal meningkatkan omzet tahunan, memperbaiki pencatatan keuangan, dan membuat pemilik usaha dapat memahami kondisi bisnisnya dengan lebih jelas.

UMKM yang menjadi studi kasus awal adalah usaha produksi dan penjualan tahu milik Ibu Pak Riyanto. Saat ini, pembukuan awal dibuat dalam file Excel bernama `Buku Pengeluaran (1).xlsx`. Excel tersebut berfungsi sebagai prototype sistem pembukuan manual yang mencatat pengeluaran, penjualan, piutang, HPP, laba rugi, dan klarifikasi asumsi bisnis.

Aplikasi yang akan dibangun bertujuan mengubah proses pembukuan Excel tersebut menjadi aplikasi digital yang sederhana, fleksibel, dan mudah digunakan oleh pemilik UMKM non-teknis dan non-akuntansi.

Proyek ini bukan hanya digitalisasi spreadsheet. Proyek ini adalah upaya membuat alat bantu pengambilan keputusan bisnis berbasis data untuk UMKM kecil, agar pemilik usaha dapat memahami biaya produksi, omzet, piutang, margin, laba bersih, dan dampak perubahan harga bahan baku terhadap keuntungan.

## 2. Tujuan Sosial Dan Bisnis

Tujuan sosial:

- Membantu UMKM lokal memiliki sistem pembukuan yang lebih rapi.
- Membantu pemilik UMKM memahami kondisi keuangan usaha tanpa harus memahami akuntansi kompleks.
- Membantu UMKM mengambil keputusan bisnis berdasarkan data, bukan hanya ingatan atau perkiraan.
- Mendukung kontribusi nyata dalam konteks Beasiswa Bakti BCA melalui pemberdayaan ekonomi lokal.

Tujuan bisnis:

- Menghitung omzet harian, bulanan, dan tahunan.
- Menghitung Harga Pokok Produksi (HPP) per tahu dan per bungkus.
- Menghitung laba kotor, laba bersih, dan margin keuntungan.
- Mengelola piutang pelanggan/warung.
- Mengidentifikasi biaya yang belum tercatat atau belum terkonfirmasi.
- Membantu menyusun strategi peningkatan omzet tahunan.
- Membantu pemilik usaha memahami dampak kenaikan harga bahan baku, perubahan harga jual, perubahan volume produksi, dan perubahan volume penjualan.

## 3. Target Pengguna

Pengguna utama aplikasi adalah pemilik UMKM tahu atau pengelola usaha kecil yang tidak terbiasa dengan istilah akuntansi rumit.

Karakteristik pengguna:

- Terbiasa mencatat manual atau menggunakan Excel sederhana.
- Membutuhkan tampilan yang jelas dan mudah dipahami.
- Lebih familiar dengan istilah sehari-hari seperti pengeluaran, penjualan, utang pelanggan, omzet, modal, untung, dan rugi.
- Membutuhkan input data yang cepat dan tidak membingungkan.
- Membutuhkan ringkasan yang langsung menjawab pertanyaan: usaha hari ini untung atau rugi, berapa omzet, berapa biaya, dan siapa yang belum bayar.

Implikasi desain:

- Bahasa antarmuka utama sebaiknya Bahasa Indonesia.
- Hindari istilah akuntansi kompleks jika tidak perlu.
- Jika memakai istilah seperti HPP atau margin, tampilkan penjelasan singkat.
- Form input harus sederhana.
- Dashboard harus menyajikan angka utama secara jelas.
- Aplikasi harus tetap berguna meskipun data belum lengkap.

## 4. Sumber Data Awal

Sumber domain awal berasal dari Excel `Buku Pengeluaran (1).xlsx`.

Workbook tersebut memiliki lima sheet:

1. `Pengeluaran`
2. `Penjualan`
3. `Piutang Warung`
4. `HPP & Laba Rugi`
5. `Klarifikasi`

Excel ini dibuat sebagai pembukuan awal untuk usaha tahu. Struktur dan rumus di dalamnya menjadi sumber awal domain aplikasi, tetapi angka-angkanya harus dianggap sebagai default awal yang dapat berubah setelah wawancara lanjutan.

## 5. Profil UMKM Awal

Usaha: produksi dan penjualan tahu.

Pemilik/usaha: Ibu Pak Riyanto.

Produk utama: tahu.

Satuan produksi:

- Papan tahu.
- Tahu satuan.
- Bungkus tahu.

Satuan penjualan utama saat ini:

- Per tahu.
- Per bungkus.

Asumsi bisnis yang sudah dikonfirmasi:

- `1 papan = 169 tahu`.
- Angka 169 tahu per papan bersifat pasti untuk cetakan saat ini karena tahu dibuat menggunakan cetakan tetap.
- `1 bungkus = 10 tahu`.
- Harga jual saat ini adalah `Rp 600/tahu`.
- Harga jual per bungkus saat ini adalah `Rp 6.000/bungkus` karena 1 bungkus berisi 10 tahu.

Data produksi awal dari Excel:

- Kedelai per hari: `50 kg`.
- Dari `50 kg` kedelai dihasilkan `10 papan tahu`.
- Total tahu per hari: `10 papan x 169 tahu = 1.690 tahu`.
- Total bungkus per hari: `1.690 tahu / 10 tahu per bungkus = 169 bungkus`.

Jika seluruh produksi terjual:

- Omzet harian: `169 bungkus x Rp 6.000 = Rp 1.014.000`.

## 6. Angka Default Awal Dari Excel

Angka berikut berasal dari Excel dan harus diperlakukan sebagai default awal, bukan konstanta permanen.

Biaya bahan baku:

- Kedelai: `Rp 10.900/kg`.
- Kebutuhan kedelai: `50 kg/hari`.
- Total biaya kedelai harian: `Rp 10.900 x 50 = Rp 545.000`.

Biaya bahan tambahan:

- Air: `Rp 0/hari` untuk sementara.
- Status air: belum terkonfirmasi. Perlu diketahui apakah memakai sumur sendiri atau PDAM berbayar.

Biaya operasional/produksi:

- Kayu bakar: `Rp 400.000/minggu`.
- Kayu bakar harian jika dibagi 7 hari: sekitar `Rp 57.143/hari`.
- Listrik: `Rp 400.000/minggu`.
- Listrik harian jika dibagi 7 hari: sekitar `Rp 57.143/hari`.

Biaya distribusi/pemasaran:

- Bensin distribusi: `Rp 15.000/hari`.
- Plastik kemasan: `Rp 5.000/hari`.

Total biaya produksi awal:

- Kedelai: `Rp 545.000`.
- Air: `Rp 0`.
- Kayu bakar: sekitar `Rp 57.143`.
- Listrik: sekitar `Rp 57.143`.
- Total biaya produksi: sekitar `Rp 659.286/hari`.

Total biaya distribusi awal:

- Bensin: `Rp 15.000`.
- Plastik: `Rp 5.000`.
- Total distribusi: `Rp 20.000/hari`.

Total biaya termasuk distribusi:

- Sekitar `Rp 679.286/hari`.

## 7. Perhitungan Finansial Awal

Jika semua produksi harian terjual:

- Produksi harian: `169 bungkus`.
- Harga jual: `Rp 6.000/bungkus`.
- Omzet harian: `Rp 1.014.000`.
- Total biaya produksi: sekitar `Rp 659.286/hari`.
- HPP per bungkus: `Rp 659.286 / 169 = sekitar Rp 3.901`.
- HPP per tahu: `Rp 659.286 / 1.690 = sekitar Rp 390`.
- Margin per bungkus: `Rp 6.000 - Rp 3.901 = sekitar Rp 2.099`.
- Margin per tahu: `Rp 600 - Rp 390 = sekitar Rp 210`.
- Laba kotor harian: `Rp 1.014.000 - Rp 659.286 = sekitar Rp 354.714`.
- Estimasi laba bersih setelah bensin dan plastik: `Rp 354.714 - Rp 20.000 = sekitar Rp 334.714/hari`.

Estimasi bulanan jika semua produksi terjual:

- 25 hari produksi: omzet sekitar `Rp 25.350.000`, laba bersih sekitar `Rp 8.367.850`.
- 30 hari produksi: omzet sekitar `Rp 30.420.000`, laba bersih sekitar `Rp 10.041.420`.

Catatan penting:

Perhitungan ini adalah estimasi awal. Akurasi bergantung pada data yang masih perlu dikonfirmasi seperti jumlah hari produksi, apakah semua produksi habis terjual, biaya air, biaya tenaga kerja, retur, harga diskon, dan biaya lain yang belum tercatat.

## 8. Struktur Excel Saat Ini

### 8.1 Sheet Pengeluaran

Sheet `Pengeluaran` mencatat biaya usaha berdasarkan kategori.

Kategori utama:

- Bahan baku.
- Bahan tambahan.
- Biaya operasional/produksi.
- Biaya pemasaran/distribusi.
- Biaya lain-lain.

Data yang sudah ada:

- Kedelai.
- Air.
- Kayu bakar.
- Listrik.
- Bensin distribusi.
- Plastik kemasan.

Peran dalam aplikasi:

- Menjadi dasar fitur catatan pengeluaran.
- Menjadi sumber perhitungan biaya produksi.
- Menjadi sumber HPP dan laba rugi.

### 8.2 Sheet Penjualan

Sheet `Penjualan` mencatat transaksi penjualan.

Kolom awal:

- No.
- Tanggal.
- Nama pembeli/warung.
- Jumlah bungkus.
- Harga satuan per bungkus.
- Total penjualan.
- Pembayaran.
- Piutang.
- Catatan.

Masalah yang ditemukan:

- Data penjualan saat ini baru mencatat contoh/awal `10 bungkus x Rp 6.000 = Rp 60.000`.
- Data tersebut belum mencerminkan potensi produksi harian `169 bungkus`.
- Jika laporan laba rugi menarik data dari sheet ini apa adanya, hasilnya dapat terlihat rugi besar karena penjualan belum lengkap.

Peran dalam aplikasi:

- Menjadi dasar fitur catatan penjualan.
- Harus mendukung penjualan tunai, pembayaran sebagian, dan piutang.
- Harus bisa mencatat pelanggan/warung secara lebih rapi.

### 8.3 Sheet Piutang Warung

Sheet `Piutang Warung` mencatat pelanggan yang belum membayar lunas.

Kolom awal:

- No.
- Tanggal.
- Nama pembeli/warung.
- Piutang.
- Tanggal bayar.
- Jumlah bayar.
- Sisa piutang.
- Status.
- Catatan.

Masalah yang ditemukan:

- Ada pembayaran sebagian `Rp 30.000`.
- Ada juga pembayaran `Rp 300.000` yang perlu dikonfirmasi apakah data nyata, contoh, atau belum terhubung ke pelanggan yang benar.
- Data piutang perlu dirapikan per pelanggan dan per transaksi.

Peran dalam aplikasi:

- Menjadi dasar fitur manajemen piutang.
- Harus menyimpan riwayat pembayaran.
- Harus bisa menghitung sisa piutang dan status lunas/belum lunas.

### 8.4 Sheet HPP & Laba Rugi

Sheet `HPP & Laba Rugi` menghitung inti finansial usaha.

Fungsi utama:

- Menghitung HPP.
- Menghitung total pemasukan.
- Menghitung total pengeluaran.
- Menghitung laba kotor.
- Menghitung laba bersih.
- Menghitung margin.
- Menghitung BEP.
- Menghitung keuntungan per unit.

Peran dalam aplikasi:

- Menjadi dasar calculation engine.
- Rumus harus dibuat eksplisit dan mudah dites.
- Hasil harus transparan agar dapat dijelaskan ke pemilik UMKM.

### 8.5 Sheet Klarifikasi

Sheet `Klarifikasi` berisi ringkasan analisis dan pertanyaan lanjutan.

Hal yang sudah diklarifikasi:

- Harga `Rp 6.000` adalah harga per bungkus, bukan per papan.
- `1 bungkus = 10 tahu`.
- `1 papan = 169 tahu`.
- Berdasarkan asumsi awal, HPP per bungkus sekitar `Rp 3.901` dan margin per bungkus sekitar `Rp 2.099`.

Peran dalam aplikasi:

- Menjadi sumber daftar data yang masih perlu dikonfirmasi.
- Menjadi dasar fitur indikator `data belum lengkap` atau `asumsi masih estimasi`.

## 9. Prinsip Utama Pengembangan

Prinsip paling penting:

Semua angka dari Excel adalah default awal yang bisa berubah, bukan konstanta permanen. Aplikasi harus fleksibel terhadap perubahan harga, biaya, volume produksi, volume penjualan, hari produksi, data pelanggan, dan data piutang.

Aturan pengembangan:

- Jangan hardcode harga kedelai, harga jual, jumlah papan, biaya listrik, biaya kayu, biaya plastik, atau jumlah hari kerja sebagai konstanta permanen.
- Angka dari Excel boleh digunakan sebagai seed data atau default editable.
- Pisahkan data aktual, asumsi default, dan simulasi.
- Jika data belum lengkap, aplikasi harus memberi status atau peringatan.
- Jika penjualan belum lengkap, laporan laba rugi harus ditandai sebagai estimasi atau belum final.
- Jika produksi lebih besar daripada penjualan, aplikasi harus menampilkan gap produksi-penjualan.
- Jika ada biaya yang belum dikonfirmasi, aplikasi harus bisa menandainya sebagai belum dikonfirmasi.
- Rumus finansial harus dibuat testable dan tidak tersembunyi di UI.
- MVP harus sederhana dan tidak overengineered.

## 10. Data Yang Belum Terkonfirmasi

Data operasional:

- Apakah produksi benar-benar selalu `10 papan/hari`.
- Apakah semua `169 bungkus/hari` habis terjual setiap hari.
- Jika tidak habis, berapa rata-rata sisa per hari.
- Sisa tahu biasanya diapakan: dijual besok, dikonsumsi sendiri, digoreng, atau dibuang.
- Berapa hari produksi dalam satu bulan.
- Apakah ada hari libur produksi.
- Apakah produksi berdasarkan pesanan atau produksi tetap.

Data harga dan pelanggan:

- Apakah semua pembeli membayar `Rp 6.000/bungkus`.
- Apakah ada pelanggan yang mendapatkan harga diskon.
- Siapa saja pelanggan tetap/warung.
- Berapa bungkus yang dibeli masing-masing pelanggan per hari.
- Apakah pelanggan membayar tunai, mingguan, atau bulanan.
- Berapa total piutang aktual saat ini.
- Apakah pembayaran `Rp 30.000` dan `Rp 300.000` di Excel adalah data nyata atau contoh.

Data biaya:

- Apakah air produksi berasal dari sumur sendiri atau PDAM.
- Jika PDAM, berapa biaya air per bulan dan berapa proporsi untuk produksi tahu.
- Apakah listrik `Rp 400.000/minggu` khusus usaha tahu atau bercampur dengan kebutuhan rumah tangga.
- Apakah kayu bakar `Rp 400.000/minggu` khusus produksi tahu.
- Apakah ada biaya tenaga kerja.
- Apakah ada biaya sewa tempat.
- Apakah ada biaya retribusi pasar, parkir, pungutan los, atau biaya distribusi tambahan.
- Apakah ada biaya perawatan alat.
- Apakah ada penyusutan alat/mesin.
- Apakah ada retur dari warung.
- Seberapa sering harga kedelai berubah.
- Apa strategi jika harga kedelai naik.

## 11. Fitur MVP

### 11.1 Dashboard Ringkasan

Dashboard harus menampilkan angka utama secara cepat.

Konten dashboard:

- Omzet hari ini.
- Omzet bulan ini.
- Total pengeluaran.
- Laba kotor.
- Laba bersih estimasi.
- Total piutang.
- Status usaha: untung, rugi, atau estimasi belum lengkap.
- Ringkasan produksi: papan, tahu, bungkus.
- Peringatan jika data belum lengkap.

### 11.2 Pengaturan Usaha

Pengaturan usaha berisi konfigurasi dasar yang dapat diedit.

Field awal:

- Nama usaha.
- Produk utama.
- Jumlah tahu per papan.
- Jumlah tahu per bungkus.
- Jumlah papan per hari default.
- Harga jual per tahu.
- Harga jual per bungkus.
- Jumlah hari produksi per bulan.
- Mata uang.

Default awal:

- Tahu per papan: `169`.
- Tahu per bungkus: `10`.
- Papan per hari: `10`.
- Harga per tahu: `600`.
- Harga per bungkus: `6000`.

Semua default tersebut harus bisa diedit.

### 11.3 Catatan Produksi

Catatan produksi digunakan untuk mencatat hasil produksi harian.

Field awal:

- Tanggal.
- Jumlah papan.
- Tahu per papan.
- Total tahu.
- Total bungkus.
- Catatan.

Perhitungan:

- Total tahu = jumlah papan x tahu per papan.
- Total bungkus = total tahu / tahu per bungkus.

### 11.4 Catatan Pengeluaran

Catatan pengeluaran digunakan untuk mencatat biaya usaha.

Field awal:

- Tanggal.
- Kategori biaya.
- Nama item.
- Harga satuan.
- Jumlah.
- Satuan.
- Total.
- Status konfirmasi.
- Catatan.

Kategori minimal:

- Bahan baku.
- Bahan tambahan.
- Operasional/produksi.
- Distribusi/pemasaran.
- Lain-lain.

### 11.5 Catatan Penjualan

Catatan penjualan digunakan untuk mencatat transaksi dari pelanggan/warung.

Field awal:

- Tanggal.
- Nama pembeli/warung.
- Jumlah bungkus.
- Harga per bungkus.
- Total penjualan.
- Jumlah dibayar.
- Piutang otomatis.
- Catatan.

Perhitungan:

- Total penjualan = jumlah bungkus x harga per bungkus.
- Piutang = total penjualan - jumlah dibayar.

Harus mendukung:

- Pembayaran tunai penuh.
- Pembayaran sebagian.
- Piutang.
- Harga berbeda per pelanggan jika diperlukan.

### 11.6 Piutang Dan Pembayaran

Fitur piutang digunakan untuk mengelola pelanggan yang belum lunas.

Konten minimal:

- Daftar pelanggan dengan piutang.
- Total piutang per pelanggan.
- Detail transaksi yang belum lunas.
- Riwayat pembayaran.
- Sisa piutang.
- Status lunas/belum lunas.
- Catatan.

### 11.7 HPP Dan Laba Rugi

Fitur ini menghitung kondisi finansial usaha.

Output minimal:

- Total biaya produksi.
- HPP per tahu.
- HPP per bungkus.
- Total penjualan.
- Laba kotor.
- Biaya distribusi/pemasaran.
- Biaya lain-lain.
- Laba bersih.
- Margin per tahu.
- Margin per bungkus.
- Margin persen.
- Status estimasi jika data belum lengkap.

### 11.8 Simulasi

Simulasi membantu pemilik usaha memahami dampak perubahan kondisi bisnis.

Skenario minimal:

- Jika harga kedelai naik.
- Jika harga jual naik.
- Jika produksi naik atau turun.
- Jika tidak semua produk terjual.
- Jika jumlah hari produksi berubah.
- Target omzet bulanan atau tahunan.

### 11.9 Laporan

Laporan harus sederhana dan mudah dibaca.

Laporan minimal:

- Laporan harian.
- Laporan bulanan.
- Ringkasan tahunan.

Export ke Excel/CSV/PDF berguna, tetapi tidak wajib untuk MVP pertama jika memperlambat development.

## 12. Data Model Konseptual

Entitas yang perlu dipertimbangkan:

- `BusinessProfile`: informasi usaha dan konfigurasi default.
- `Product`: produk yang dijual.
- `ProductionRecord`: catatan produksi harian.
- `Expense`: catatan pengeluaran.
- `Customer`: pelanggan atau warung.
- `SalesTransaction`: transaksi penjualan.
- `Receivable`: piutang dari transaksi penjualan.
- `Payment`: pembayaran piutang.
- `FinancialSummary`: hasil agregasi finansial.
- `Scenario`: simulasi harga, biaya, produksi, dan penjualan.

Catatan desain:

- Jangan campur data aktual dengan simulasi.
- Jangan campur konfigurasi default dengan transaksi historis.
- Transaksi historis sebaiknya menyimpan harga saat transaksi terjadi, karena harga dapat berubah di masa depan.
- Perhitungan finansial sebaiknya berada di modul/domain logic yang bisa diuji.

## 13. Rumus Finansial Inti

Produksi:

```text
total_tahu = jumlah_papan * tahu_per_papan
total_bungkus = total_tahu / tahu_per_bungkus
```

Penjualan:

```text
total_penjualan = jumlah_bungkus * harga_per_bungkus
piutang = total_penjualan - jumlah_dibayar
```

Biaya produksi:

```text
total_biaya_produksi = bahan_baku + bahan_tambahan + biaya_operasional_produksi
```

HPP:

```text
hpp_per_bungkus = total_biaya_produksi / total_bungkus_diproduksi
hpp_per_tahu = total_biaya_produksi / total_tahu_diproduksi
```

Laba:

```text
laba_kotor = total_penjualan - total_biaya_produksi
laba_bersih = laba_kotor - biaya_distribusi - biaya_lain_lain
```

Margin:

```text
margin_per_bungkus = harga_jual_per_bungkus - hpp_per_bungkus
margin_per_tahu = harga_jual_per_tahu - hpp_per_tahu
margin_persen = laba_bersih / total_penjualan
```

Catatan:

- Rumus harus aman terhadap pembagian nol.
- Jika data produksi atau penjualan kosong, tampilkan status estimasi atau data belum lengkap.
- Jika hanya asumsi yang tersedia, hasil harus diberi label simulasi atau estimasi.

## 14. Strategi Menangani Data Belum Lengkap

Aplikasi harus dirancang untuk kondisi lapangan, di mana tidak semua data langsung tersedia.

Status data yang disarankan:

- `actual`: data nyata sudah dikonfirmasi.
- `estimated`: data masih perkiraan.
- `unconfirmed`: data belum dikonfirmasi.
- `simulation`: data hanya untuk skenario.

Contoh penggunaan:

- Air = `Rp 0` tetapi status `unconfirmed`.
- Produksi = `10 papan/hari` tetapi bisa status `estimated` sampai diverifikasi pola hariannya.
- Harga jual = `Rp 6.000/bungkus` dengan status `actual` karena sudah dikonfirmasi.
- Harga kedelai = `Rp 10.900/kg` bisa status `actual` untuk saat wawancara, tetapi tetap editable karena harga bisa berubah.

Peringatan yang perlu ditampilkan:

- Data penjualan belum lengkap.
- Ada biaya belum dikonfirmasi.
- Ada produksi yang belum tercatat penjualannya.
- Ada piutang belum lunas.
- Hasil laba rugi masih estimasi.

## 15. Non-Goals MVP

Hal yang sebaiknya tidak menjadi prioritas MVP pertama:

- Sistem akuntansi double-entry penuh.
- Multi-cabang atau multi-tenant kompleks.
- Integrasi pembayaran online.
- Inventory bahan baku kompleks.
- Payroll detail.
- Tax reporting.
- Export PDF canggih.
- Role-based access control kompleks.
- Mobile app native.

MVP harus fokus pada pencatatan, perhitungan dasar, dashboard, piutang, dan simulasi sederhana.

## 16. Risiko Produk

Risiko utama:

- Data penjualan belum lengkap sehingga laporan laba rugi bisa menyesatkan.
- Beberapa biaya belum tercatat sehingga HPP bisa terlalu rendah.
- Pemilik usaha mungkin tidak konsisten mencatat data harian.
- Terlalu banyak fitur bisa membuat aplikasi sulit dipakai.
- Jika istilah terlalu teknis, pemilik UMKM bisa bingung.
- Jika angka default di-hardcode, aplikasi tidak fleksibel saat data berubah.

Mitigasi:

- Gunakan label estimasi/data belum lengkap.
- Buat form sesederhana mungkin.
- Pisahkan input harian dari laporan analisis.
- Jadikan semua angka bisnis dapat diedit.
- Tampilkan penjelasan rumus secara sederhana.
- Prioritaskan correctness dan clarity dibanding fitur banyak.

## 17. Pertanyaan Wawancara Lanjutan

Pertanyaan paling penting:

1. Apakah semua 169 bungkus selalu habis terjual setiap hari?
2. Kalau tidak habis, rata-rata sisa berapa bungkus per hari?
3. Sisa tahu biasanya diapakan?
4. Berapa hari produksi dalam sebulan?
5. Apakah benar produksi selalu 10 papan per hari?
6. Siapa saja pembeli tetap atau warung langganan?
7. Berapa bungkus yang dibeli masing-masing pelanggan per hari?
8. Apakah semua pelanggan membayar Rp 6.000/bungkus?
9. Apakah ada pelanggan yang mendapat harga diskon?
10. Siapa saja pelanggan yang membayar belakangan atau piutang?
11. Berapa total piutang aktual saat ini?
12. Apakah pembayaran Rp 30.000 dan Rp 300.000 di Excel adalah data nyata atau contoh?
13. Apakah air produksi gratis dari sumur atau berbayar?
14. Apakah listrik Rp 400.000/minggu khusus usaha tahu?
15. Apakah kayu bakar Rp 400.000/minggu khusus produksi tahu?
16. Apakah ada tenaga kerja yang perlu dihitung?
17. Apakah ada biaya sewa tempat?
18. Apakah ada retribusi pasar, parkir, atau pungutan rutin?
19. Apakah ada biaya perawatan alat?
20. Apakah ada retur dari warung?
21. Seberapa sering harga kedelai berubah?
22. Apa strategi jika harga kedelai naik?

## 18. Narasi Proyek Untuk Beasiswa Bakti BCA

Melalui proyek ini, saya berupaya membantu UMKM tahu lokal milik Ibu Pak Riyanto agar memiliki sistem pembukuan yang sederhana, akurat, dan mudah digunakan. Sebelumnya, pemilik usaha belum memiliki gambaran yang rapi mengenai harga pokok produksi, margin keuntungan, piutang, dan laba bersih. Saya memulai dengan menyusun template Excel pembukuan yang mencatat pengeluaran, penjualan, piutang, HPP, laba rugi, serta analisis margin.

Dari data awal, usaha memproduksi 1.690 tahu atau 169 bungkus per hari, dengan harga jual Rp 600 per tahu atau Rp 6.000 per bungkus. Berdasarkan biaya yang tercatat, HPP per bungkus sekitar Rp 3.901 dan margin sekitar Rp 2.099 per bungkus. Dengan pembukuan ini, pemilik UMKM dapat memahami kondisi usaha secara lebih objektif dan mengambil keputusan untuk meningkatkan omzet serta menjaga profitabilitas.

Tahap berikutnya adalah mengembangkan pembukuan Excel tersebut menjadi aplikasi digital yang lebih mudah digunakan, fleksibel terhadap perubahan harga dan biaya, serta mampu membantu pemilik usaha memantau omzet, laba, piutang, dan simulasi bisnis secara lebih praktis.

Dalam konteks Beasiswa Bakti BCA, proyek ini menunjukkan kontribusi nyata terhadap pengembangan UMKM lokal dengan pendekatan praktis, terukur, dan berkelanjutan.

## 19. Instruksi Untuk AI/Development Agent

Saat mengerjakan proyek ini:

- Baca dokumen ini sebagai konteks utama proyek.
- Jika file Excel tersedia, analisis Excel sebagai sumber domain awal.
- Jangan langsung coding sebelum memahami domain dan risiko data.
- Jangan hardcode angka bisnis sebagai konstanta permanen.
- Gunakan angka dari Excel sebagai default editable atau seed data.
- Pisahkan data aktual, asumsi, dan simulasi.
- Prioritaskan MVP yang sederhana dan berguna.
- Pastikan calculation logic mudah dites.
- Pastikan UI menggunakan Bahasa Indonesia yang mudah dipahami.
- Jika ada data belum lengkap, tampilkan status estimasi atau perlu dilengkapi.
- Jika membuat rencana, identifikasi scope, non-goals, data model, rumus, risiko, dan urutan implementasi.
- Jika mengimplementasikan, jalankan verifikasi relevan seperti test, typecheck, lint, build, atau smoke test sesuai stack proyek.

Prompt awal yang direkomendasikan untuk `/prime`:

```text
/prime

Baca project_brief.md sebagai konteks utama proyek.
Pahami bahwa ini adalah aplikasi pembukuan UMKM tahu untuk inisiatif Beasiswa Bakti BCA.
Jangan edit file dulu.
Petakan tujuan produk, domain bisnis, asumsi valid, data belum pasti, risiko, fitur MVP, struktur proyek saat ini, dan langkah terbaik berikutnya.
```

## 20. Prinsip Kunci Yang Tidak Boleh Dilupakan

Semua angka dari Excel adalah default awal yang bisa berubah, bukan konstanta permanen. Aplikasi harus fleksibel terhadap perubahan harga, biaya, volume produksi, volume penjualan, hari produksi, pelanggan, dan data piutang.

Jika ada konflik antara data aktual terbaru dan angka di dokumen ini, gunakan data aktual terbaru. Perbarui dokumen ini agar tetap menjadi sumber konteks yang akurat.
