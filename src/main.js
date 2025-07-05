// 1. Impor semua modul yang dibutuhkan
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';      // Komponen root aplikasi Anda
import router from './router';    // Konfigurasi router Anda
import './assets/main.css';      // File CSS global Anda

// 2. Buat instance aplikasi Vue
const app = createApp(App);

// 3. Pasang (use) plugin yang dibutuhkan oleh aplikasi
// app.use() memberi tahu Vue untuk menggunakan fungsionalitas tambahan.
app.use(createPinia()); // Mengaktifkan Pinia untuk state management
app.use(router);        // Mengaktifkan Vue Router untuk navigasi halaman

// 4. Mount aplikasi ke elemen HTML dengan id="app"
// Ini adalah langkah terakhir yang merender aplikasi Anda ke browser.
app.mount('#app');