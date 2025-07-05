<template>
  <div class="form-container">
    <h2 class="form-title">{{ isEditMode ? 'Edit Barang' : 'Tambah Barang Baru' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nama Barang</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          placeholder="Contoh: Buku Tulis"
          required
          :disabled="isSubmitting"
        />
      </div>

      <div class="form-group">
        <label for="quantity">Kuantitas (Stok)</label>
        <input
          id="quantity"
          v-model.number="formData.quantity"
          type="number"
          placeholder="Contoh: 50"
          required
          :disabled="isSubmitting"
        />
      </div>

      <div class="form-group">
        <label for="price">Harga Satuan</label>
        <input
          id="price"
          v-model.number="formData.price"
          type="number"
          placeholder="Contoh: 5000"
          required
          :disabled="isSubmitting"
        />
      </div>

      <div class="form-group">
        <label for="description">Keterangan Barang (Opsional)</label>
        <textarea
          id="description"
          v-model="formData.description"
          placeholder="Tulis deskripsi singkat mengenai barang..."
          rows="4"
          :disabled="isSubmitting"
        ></textarea>
      </div>

      <button type="submit" class="submit-btn" :disabled="isSubmitting">
        <span v-if="isSubmitting">Menyimpan...</span>
        <span v-else>{{ isEditMode ? 'Simpan Perubahan' : 'Tambah Barang' }}</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  initialData: { type: Object, default: null },
  isSubmitting: { type: Boolean, default: false },
});

const emit = defineEmits(['submit']);

// == MENAMBAHKAN PROPERTI 'description' KE STATE FORM ==
const formData = ref({
  name: '',
  quantity: 0,
  price: 0,
  description: '', // <-- DITAMBAHKAN
});

const isEditMode = computed(() => !!props.initialData);

// Watcher juga diperbarui untuk menangani 'description'
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = { ...newData };
    } else {
      formData.value = { name: '', quantity: 0, price: 0, description: '' };
    }
  },
  { immediate: true }
);

function handleSubmit() {
  emit('submit', formData.value);
}
</script>

<style scoped>
/* Menambahkan style untuk textarea agar konsisten */
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--border-radius-md, 8px);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  resize: vertical;
}

.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* ... Sisa CSS lainnya tetap sama ... */
.form-container { background-color: var(--color-surface, #ffffff); padding: 2rem; border-radius: var(--border-radius-lg, 12px); border: 1px solid var(--color-border, #e2e8f0); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); max-width: 600px; margin: 2rem auto; }
.form-title { margin-bottom: 2rem; text-align: center; color: var(--color-text-header, #1e293b); }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--color-text-body, #475569); }
.form-group input { width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: var(--border-radius-md, 8px); font-size: 1rem; font-family: inherit; transition: border-color 0.2s, box-shadow 0.2s; }
.form-group input:focus { outline: none; border-color: var(--color-primary, #3b82f6); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); }
.submit-btn { width: 100%; padding: 0.85rem 1.5rem; border: none; border-radius: var(--border-radius-md, 8px); background-color: var(--color-primary, #3b82f6); color: white; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s; }
.submit-btn:hover:not(:disabled) { background-color: var(--color-primary-hover, #2563eb); }
.submit-btn:disabled { background-color: #9ca3af; cursor: not-allowed; }
</style>