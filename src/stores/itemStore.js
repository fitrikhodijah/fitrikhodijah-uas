import { defineStore } from 'pinia';
import ItemService from '../services/ItemService.js';

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    totalItems: (state) => state.items.length,
    lowStockItems: (state) => {
      const LOW_STOCK_THRESHOLD = 10;
      return state.items.filter(item => item.quantity < LOW_STOCK_THRESHOLD);
    },
    totalInventoryValue: (state) => {
      const totalValue = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(totalValue);
    },
    totalStockQuantity: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    },
  },

  // 3. ACTIONS: Diperbarui dengan Optimistic UI Update
  actions: {
    async fetchItems() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await ItemService.getItems();
        this.items = response.data;
      } catch (err) {
        this.error = err;
        console.error('Gagal mengambil items:', err);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchItemById(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await ItemService.getItem(id);
        return response.data;
      } catch (err) {
        this.error = err;
        console.error(`Gagal mengambil item dengan ID ${id}:`, err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async addItem(newItem) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await ItemService.createItem(newItem);
        // --- PEMBARUAN ---
        // Langsung tambahkan item baru ke state lokal.
        this.items.push(response.data);
      } catch (err) {
        this.error = err;
        console.error('Gagal menambahkan item:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async updateItem(itemToUpdate) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await ItemService.updateItem(itemToUpdate.id, itemToUpdate);
        // --- PEMBARUAN ---
        // Cari index item yang diubah, lalu ganti datanya di state lokal.
        const index = this.items.findIndex(item => item.id === itemToUpdate.id);
        if (index !== -1) {
          this.items[index] = response.data;
        }
      } catch (err) {
        this.error = err;
        console.error('Gagal mengupdate item:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteItem(id) {
      this.isLoading = true;
      this.error = null;
      try {
        await ItemService.deleteItem(id);
        // --- PEMBARUAN ---
        // Filter state lokal untuk menghapus item tanpa fetch ulang.
        this.items = this.items.filter(item => item.id !== id);
      } catch (err) {
        this.error = err;
        console.error('Gagal menghapus item:', err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});