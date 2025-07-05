<template>
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script setup>
  // Tidak ada logic JavaScript yang dibutuhkan untuk komponen visual ini.
  </script>
  
  <style scoped>
  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
  
  .spinner {
    /* Ukuran spinner */
    width: 50px;
    height: 50px;
  
    /* Membuat bentuk lingkaran */
    border-radius: 50%;
  
    /* Trik utama:
       - border: membuat lingkaran abu-abu tipis.
       - border-top-color: membuat bagian atas lingkaran menjadi biru (warna primer).
    */
    border: 5px solid var(--color-border, #e2e8f0);
    border-top-color: var(--color-primary, #3b82f6);
  
    /* Menerapkan animasi putaran */
    animation: spin 1s linear infinite;
  }
  
  /* Mendefinisikan animasi 'spin' */
  @keyframes spin {
    /* Animasi berputar 360 derajat */
    to {
      transform: rotate(360deg);
    }
  }
  </style>