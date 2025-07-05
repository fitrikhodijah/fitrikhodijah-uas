git init# Sistem Manajemen Inventaris Sederhana (UAS PBK)

Proyek ini adalah aplikasi web *Single Page Application* (SPA) yang dibangun untuk memenuhi Ujian Akhir Semester (UAS) mata kuliah Pemrograman Berbasis Komponen. Aplikasi ini berfungsi sebagai sistem manajemen inventaris sederhana untuk mencatat, melihat, mengubah, dan menghapus data barang.

## Profil
- **Nama Mahasiswa:** FITRI KHODIJAH
- **NPM:** 233510094
- **Kelas:** 4D

---

## 🚀 Fitur Utama

Aplikasi ini memiliki beberapa fitur utama untuk manajemen inventaris:

* **Dashboard Interaktif**: Halaman utama yang menampilkan ringkasan data penting secara visual.
    * **Kartu Statistik**: Menampilkan total jenis barang, jumlah barang dengan stok menipis, total nilai inventaris, dan jumlah total semua stok.
    * **Grafik Stok**: Visualisasi 5 barang dengan stok terbanyak dalam bentuk grafik batang untuk analisis cepat.
* **Manajemen Barang (CRUD)**:
    * **Tambah Barang (Create)**: Form untuk menambahkan data barang baru, termasuk nama, kuantitas, harga, dan keterangan.
    * **Lihat Daftar Barang (Read)**: Menampilkan semua barang dalam format kartu yang responsif dan mudah dibaca.
    * **Edit Barang (Update)**: Memperbarui detail barang yang sudah ada.
    * **Hapus Barang (Delete)**: Menghapus data barang dengan dialog konfirmasi.
* **Pencarian Real-time**: Fitur filter pada halaman daftar barang untuk mencari item berdasarkan nama secara langsung.
* **Detail Barang (Modal)**: Saat kartu barang diklik, sebuah *pop-up* (modal) akan muncul menampilkan detail lengkap barang, termasuk deskripsi.
* **Unit Testing**: Pengujian unit pada **Pinia Store** menggunakan **Vitest** untuk memastikan logika bisnis seperti kalkulasi *getters* dan *actions* berjalan sesuai harapan.

---

## 🛠️ Teknologi yang Digunakan

-   **Frontend Framework**: Vue.js 3 (dengan `<script setup>` dan Composition API)
-   **Build Tool**: Vite
-   **State Management**: Pinia
-   **Routing**: Vue Router
-   **HTTP Client**: Axios
-   **Mock API**: JSON-Server
-   **Testing Framework**: Vitest & Vue Test Utils
-   **Styling**: CSS murni dengan variabel untuk tema.

---

## 📂 Struktur Proyek

/
├── public/
├── src/
│   ├── assets/
│   │   └── main.css       # Styling global & variabel warna
│   ├── components/
│   │   ├── ItemCard.vue   # Komponen kartu untuk setiap barang
│   │   ├── ItemForm.vue   # Form untuk tambah/edit barang
│   │   ├── LoadingSpinner.vue
│   │   ├── Modal.vue      # Komponen pop-up untuk detail
│   │   └── Navbar.vue     # Komponen navigasi atas
│   ├── router/
│   │   └── index.js       # Konfigurasi routing aplikasi
│   ├── services/
│   │   └── ItemService.js # Modul untuk interaksi dengan API
│   ├── stores/
│   │   └── itemStore.js   # Pinia store untuk state management
│   ├── views/|
|   |   |── AboutView.vue
│   │   ├── AddItemView.vue
│   │   ├── DashboardView.vue
│   │   ├── EditItemView.vue
│   │   └── ItemListView.vue
│   ├── App.vue            # Komponen root aplikasi
│   └── main.js            # Titik masuk aplikasi
├── test/
│   └── unit/
│       └── itemStore.spec.js # File unit test untuk Pinia store
├── db.json                # Database untuk JSON-Server
├── package.json           # Dependensi dan skrip proyek
└── vite.config.js         # Konfigurasi Vite


---

## ⚙️ Endpoint API (JSON-Server)

Aplikasi ini berkomunikasi dengan backend palsu yang disediakan oleh `json-server` melalui endpoint berikut:

-   `GET /items` : Mengambil semua data barang.
-   `GET /items/:id` : Mengambil satu data barang berdasarkan ID.
-   `POST /items` : Menyimpan data barang baru.
-   `PUT /items/:id` : Memperbarui data barang yang sudah ada.
-   `DELETE /items/:id` : Menghapus data barang.

---
