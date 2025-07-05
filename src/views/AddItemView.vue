<template>
    <div class="add-item-page">
      <header class="page-header">
        <h1>Tambah Barang Baru</h1>
        <p>Isi detail di bawah ini untuk menambahkan item baru ke dalam inventaris.</p>
      </header>
  
      <div class="form-wrapper">
        <ItemForm @submit="handleAddItem" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { useItemStore } from '../stores/itemStore';
  import ItemForm from '../components/ItemForm.vue';
  
  // 1. Inisialisasi store dan router
  const itemStore = useItemStore();
  const router = useRouter();
  
  // 2. Fungsi untuk menangani data yang dikirim dari ItemForm
  async function handleAddItem(formData) {
    try {
      // Memanggil action 'addItem' di store dengan data dari form
      await itemStore.addItem(formData);
      
      // Jika berhasil, arahkan pengguna kembali ke halaman daftar barang
      router.push('/items');
  
    } catch (error) {
      // (Opsional) Tangani error jika gagal menambahkan item
      console.error('Gagal menambahkan item:', error);
      alert('Terjadi kesalahan saat menambahkan item. Silakan coba lagi.');
    }
  }
  </script>
  
  <style scoped>
  .add-item-page {
    padding: 2rem;
    max-width: 1280px;
    margin: 0 auto;
  }
  
  .page-header {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .page-header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-header);
  }
  
  .page-header p {
    font-size: 1rem;
    color: var(--color-text-body);
    margin-top: 0.25rem;
  }
  
  /* Styling untuk form-wrapper tidak terlalu dibutuhkan karena ItemForm 
    sudah memiliki styling-nya sendiri, termasuk max-width dan margin auto.
  */
  .form-wrapper {
    /* Kosongkan jika Anda sudah puas dengan gaya ItemForm */
  }
  </style>