<template>
    <div class="about-page">
      <div class="content-card">
        <div class="header">
          <span class="icon">ℹ️</span>
          <h1>Tentang Aplikasi Inventaris</h1>
        </div>
        <p class="description">
          Aplikasi ini adalah sebuah sistem manajemen inventaris sederhana yang dibuat untuk memenuhi tugas Ujian Akhir Semester (UAS) mata kuliah Pemrograman Berbasis Komponen (PBK).
        </p>
  
        <div class="divider"></div>
  
        <div class="details-section">
          <h3>Teknologi yang Digunakan</h3>
          <ul>
            <li><strong>Framework:</strong> Vue.js 3 (Composition API)</li>
            <li><strong>Build Tool:</strong> Vite</li>
            <li><strong>Routing:</strong> Vue Router</li>
            <li><strong>State Management:</strong> Pinia</li>
            <li><strong>Mock API:</strong> JSON-Server</li>
            <li><strong>Unit Testing:</strong> Vitest</li>
          </ul>
        </div>
  
        <div class="divider"></div>
  
        <div class="details-section">
          <h3>Profil Pengembang</h3>
          <ul>
            <li><strong>Nama:</strong> FITRI KHODIJAH</li>
            <li><strong>NPM:</strong> 233510094</li>
            <li><strong>Kelas:</strong> 4D</li>
            <li><strong>Mata Kuliah:</strong> Pemrograman Berbasis Komponen</li>
          </ul>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  // Tidak ada logic JavaScript yang dibutuhkan untuk halaman statis ini.
  </script>
  
  <style scoped>
  .about-page {
    padding: 2rem;
    max-width: 800px;
    margin: 2rem auto;
  }
  
  .content-card {
    background-color: var(--color-surface, #ffffff);
    border: 1px solid var(--color-border, #e2e8f0);
    border-radius: var(--border-radius-lg, 12px);
    padding: 2.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
  }
  
  .header {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .icon {
    font-size: 3rem;
    line-height: 1;
  }
  
  .header h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-text-header);
    margin-top: 0.5rem;
  }
  
  .description {
    text-align: center;
    color: var(--color-text-body);
    font-size: 1.1rem;
    line-height: 1.7;
  }
  
  .divider {
    height: 1px;
    background-color: var(--color-border, #e2e8f0);
    margin: 2rem 0;
  }
  
  .details-section h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-header);
    margin-bottom: 1rem;
  }
  
  .details-section ul {
    list-style: none;
    padding: 0;
  }
  
  .details-section li {
    font-size: 1rem;
    color: var(--color-text-body);
    margin-bottom: 0.75rem;
  }
  
  .details-section li strong {
    color: var(--color-text-header);
    min-width: 120px;
    display: inline-block;
  }
  </style>