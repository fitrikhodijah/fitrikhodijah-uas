<template>
  <div class="item-card" @click="viewDetails">
    <div class="item-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2,4A2,2 0 0,1 4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4M4,4V8H20V4H4Z" /></svg>
    </div>

    <div class="item-details">
      <h4 class="item-name">{{ item.name }}</h4>
      
      <div class="item-meta">
        <span class="item-stock">Stok: {{ item.quantity }}</span>
        <span class="item-price">{{ formattedPrice }}</span>
      </div>
    </div>

    <div class="item-actions">
      <button class="action-btn edit-btn" @click.stop="handleEdit">Edit</button>
      <button class="action-btn delete-btn" @click.stop="handleDelete">Hapus</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: { type: Object, required: true },
});

// Event 'viewDetails' tetap ada untuk memicu modal
const emit = defineEmits(['edit', 'delete', 'viewDetails']);

const formattedPrice = computed(() => {
  if (typeof props.item.price !== 'number') return 'Harga tidak valid';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(props.item.price);
});

function handleEdit() {
  emit('edit', props.item.id);
}

function handleDelete() {
  emit('delete', props.item.id);
}

function viewDetails() {
  emit('viewDetails', props.item);
}
</script>

<style scoped>
/* CSS UNTUK DESKRIPSI DIHAPUS */
.item-card {
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  gap: 1.5rem; 
  background-color: var(--color-surface, #ffffff); 
  border: 1px solid var(--color-border, #e2e8f0); 
  border-radius: var(--border-radius-lg, 12px); 
  padding: 1.25rem; 
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); 
  transition: box-shadow 0.2s, border-color 0.2s;
}
.item-card:hover { 
  border-color: var(--color-primary, #3b82f6); 
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); 
}
.item-icon { 
  flex-shrink: 0; 
  color: var(--color-text-muted, #94a3b8); 
}
.item-icon svg { 
  width: 40px; 
  height: 40px; 
}
.item-details { 
  flex-grow: 1;
  overflow: hidden;
}
.item-name { 
  font-size: 1.1rem; 
  font-weight: 600; 
  color: var(--color-text-header, #1e293b); 
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-meta { 
  display: flex; 
  gap: 1rem; 
  margin-top: 0.5rem; /* Jarak dari nama barang disesuaikan */
  flex-wrap: wrap; 
}
.item-stock, .item-price { 
  font-size: 0.9rem; 
  font-weight: 500; 
  color: var(--color-text-body, #475569); 
  background-color: #f1f5f9; 
  padding: 0.25rem 0.5rem; 
  border-radius: 6px; 
}
.item-actions { 
  display: flex; 
  gap: 0.75rem; 
}
.action-btn { 
  padding: 0.5rem 1rem; 
  border: 1px solid transparent; 
  border-radius: var(--border-radius-md, 8px); 
  font-weight: 500; 
  cursor: pointer; 
  transition: background-color 0.2s, color 0.2s; 
}
.edit-btn { 
  background-color: #f1f5f9; 
  color: #334155; 
}
.edit-btn:hover { 
  background-color: #e2e8f0; 
}
.delete-btn { 
  background-color: #fee2e2; 
  color: #dc2626; 
}
.delete-btn:hover { 
  background-color: #fecaca; 
}
</style>