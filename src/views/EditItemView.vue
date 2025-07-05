<template>
    <div class="edit-item-page">
      <header class="page-header">
        <h1>Edit Barang</h1>
        <p v-if="itemData">Perbarui detail untuk: <strong>{{ itemData.name }}</strong></p>
      </header>
  
      <div class="form-wrapper">
        <LoadingSpinner v-if="isLoading" />
        
        <ItemForm 
          v-else-if="itemData"
          :initial-data="itemData" 
          @submit="handleUpdateItem"
        />
  
        <div v-else class="not-found">
          <p>Item tidak ditemukan atau gagal dimuat.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useItemStore } from '../stores/itemStore';
  import ItemForm from '../components/ItemForm.vue';
  import LoadingSpinner from '../components/LoadingSpinner.vue';
  
  // 1. Inisialisasi store, route, dan router
  const itemStore = useItemStore();
  const route = useRoute(); // Untuk mendapatkan parameter dari URL (seperti ID)
  const router = useRouter(); // Untuk navigasi
  
  // 2. State lokal untuk menampung data item tunggal dan status loading
  const itemData = ref(null);
  const isLoading = ref(true);
  
  // 3. Ambil data saat komponen dimuat
  onMounted(async () => {
    // Dapatkan ID dari parameter URL (misal: /items/edit/123 -> id = '123')
    const itemId = route.params.id;
    
    try {
      // Panggil action di store untuk mengambil satu item berdasarkan ID
      // Action ini mengembalikan data item yang ditemukan
      const data = await itemStore.fetchItemById(itemId);
      itemData.value = data;
    } catch (error) {
      console.error('Gagal mengambil data item:', error);
      itemData.value = null; // Set jadi null jika gagal
    } finally {
      // Apapun hasilnya, hentikan loading
      isLoading.value = false;
    }
  });
  
  // 4. Fungsi untuk menangani update data dari form
  async function handleUpdateItem(formData) {
    try {
      // Panggil action 'updateItem' di store
      await itemStore.updateItem(formData);
  
      // Jika berhasil, arahkan pengguna kembali ke halaman daftar barang
      router.push('/items');
    } catch (error) {
      console.error('Gagal memperbarui item:', error);
      alert('Terjadi kesalahan saat memperbarui item.');
    }
  }
  </script>
  
  <style scoped>
  .edit-item-page {
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
  
  .form-wrapper {
    /* Kosongkan jika Anda sudah puas dengan gaya ItemForm */
  }
  
  .not-found {
    text-align: center;
    margin-top: 4rem;
    color: var(--color-text-muted);
  }
  </style>