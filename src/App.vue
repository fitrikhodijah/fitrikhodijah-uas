<template>
  <div class="app-container">
    <Navbar />

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
// Mengimpor komponen yang dibutuhkan
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<style scoped>
/* Gaya untuk wadah utama aplikasi */
.app-container {
  min-height: 100vh; /* Memastikan aplikasi memenuhi seluruh tinggi layar */
  background-color: var(--color-background, #f8fafc); /* Menggunakan warna latar dari main.css */
}

/* Gaya untuk area konten utama */
.main-content {
  /* Memberi padding agar konten tidak menempel ke tepi */
  padding: 2rem; 

  /* Membatasi lebar konten di layar besar dan menempatkannya di tengah */
  max-width: 1280px;
  margin: 0 auto;
}
</style>