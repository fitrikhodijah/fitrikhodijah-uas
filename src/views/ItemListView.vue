<template>
  <div class="item-list-page">
    <header class="page-header">
      <div class="header-content">
        <h1>Daftar Barang</h1>
        <p class="subtitle">Kelola semua barang yang ada di dalam inventaris Anda.</p>
      </div>
      <div class="header-actions">
        <RouterLink to="/items/add" class="add-btn">
          <span>+</span> Tambah Barang
        </RouterLink>
      </div>
    </header>

    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery"
        placeholder="Cari barang berdasarkan nama..."
      />
    </div>

    <div v-if="isLoading" class="loading-container">
      <LoadingSpinner />
    </div>

    <div v-else>
      <div v-if="filteredItems.length === 0" class="empty-state">
        <p v-if="searchQuery">Tidak ada barang yang cocok dengan pencarian "{{ searchQuery }}".</p>
        <p v-else>Belum ada barang di inventaris. Silakan tambahkan barang baru.</p>
      </div>
      
      <div v-else class="cards-container">
        <ItemCard 
          v-for="item in filteredItems" 
          :key="item.id"
          :item="item"
          @edit="handleEditItem"
          @delete="handleDeleteItem"
          @viewDetails="openItemModal"
        />
      </div>
    </div>
    
    <Modal :show="!!selectedItem" @close="closeItemModal">
      <template #header>
        <h3 class="modal-title">Detail Barang</h3>
      </template>
      <template #body>
        <div v-if="selectedItem" class="item-details-modal">
          <h4>{{ selectedItem.name }}</h4>
          <p><strong>Jumlah Stok:</strong> {{ selectedItem.quantity }} Unit</p>
          <p><strong>Harga:</strong> {{ formatCurrency(selectedItem.price) }}</p>
          <p class="description-label"><strong>Keterangan:</strong></p>
          <p class="description-text">{{ selectedItem.description || 'Tidak ada keterangan.' }}</p>
        </div>
      </template>
      <template #footer>
          <button @click="closeItemModal" class="btn-secondary">Tutup</button>
          <button @click="goToEditPage" class="btn-primary">Edit Barang</button>
      </template>
    </Modal>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter, RouterLink } from 'vue-router';
import { useItemStore } from '@/stores/itemStore.js';
import ItemCard from '../components/ItemCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import Modal from '../components/Modal.vue';

const itemStore = useItemStore();
const router = useRouter();
const { items, isLoading } = storeToRefs(itemStore);

// State untuk Modal
const selectedItem = ref(null);

function openItemModal(item) {
  selectedItem.value = item;
}
function closeItemModal() {
  selectedItem.value = null;
}
function goToEditPage() {
    if (selectedItem.value) {
        router.push(`/items/edit/${selectedItem.value.id}`);
    }
}
function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
}

// State untuk Pencarian
const searchQuery = ref('');

const filteredItems = computed(() => {
  if (!searchQuery.value) {
    return items.value;
  }
  return items.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  itemStore.fetchItems();
});

function handleEditItem(itemId) {
  router.push(`/items/edit/${itemId}`);
}

function handleDeleteItem(itemId) {
  if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
    itemStore.deleteItem(itemId);
  }
}
</script>

<style scoped>
.item-list-page {
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-content h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-header);
}

.header-content .subtitle {
  font-size: 1rem;
  color: var(--color-text-body);
  margin-top: 0.25rem;
}

.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-primary, #3b82f6);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: var(--border-radius-md, 8px);
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.add-btn span {
  font-size: 1.25rem;
  line-height: 1;
}

.add-btn:hover {
  background-color: var(--color-primary-hover, #2563eb);
}

.search-bar {
  margin-bottom: 2rem;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--border-radius-md, 8px);
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-bar input:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.loading-container {
  margin-top: 4rem;
}

.empty-state {
  margin-top: 4rem;
  text-align: center;
  padding: 2rem;
  background-color: var(--color-surface, #ffffff);
  border: 1px dashed var(--color-border, #e2e8f0);
  border-radius: var(--border-radius-lg, 12px);
}

.empty-state p {
  color: var(--color-text-muted, #94a3b8);
  font-size: 1.1rem;
}

/* --- PERUBAHAN UTAMA UNTUK LAYOUT KARTU --- */
.cards-container {
  display: grid;
  grid-template-columns: 1fr; /* Default 1 kolom untuk layar kecil/ponsel */
  gap: 1.5rem;
}

/* Untuk layar dengan lebar 768px atau lebih (tablet ke atas), gunakan 2 kolom */
@media (min-width: 768px) {
  .cards-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
/* Aturan untuk 3 kolom sudah dihapus */

/* CSS untuk Modal */
.modal-title {
  margin: 0;
  font-size: 1.5rem;
  color: var(--color-text-header);
}

.item-details-modal h4 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.item-details-modal p {
  margin: 0.5rem 0;
  color: var(--color-text-body);
}

.item-details-modal .description-label {
  margin-top: 1rem;
}

.item-details-modal .description-text {
  background-color: #f8fafc;
  padding: 0.75rem;
  border-radius: 6px;
  white-space: pre-wrap;
  max-height: 150px;
  overflow-y: auto;
}

.modal-footer button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color .2s;
}

.modal-footer .btn-secondary {
  background-color: #e2e8f0;
  color: #334155;
  margin-right: 0.5rem;
}

.modal-footer .btn-primary {
  background-color: var(--color-primary);
  color: white;
}
</style>