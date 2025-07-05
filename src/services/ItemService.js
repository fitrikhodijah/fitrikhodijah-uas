import axios from 'axios';

// 1. Buat instance Axios dengan konfigurasi dasar.
// Ini memungkinkan kita untuk mengatur URL dasar dan header di satu tempat.
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Sesuaikan dengan URL json-server Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Ekspor sebuah objek yang berisi semua fungsi untuk berinteraksi dengan API.
export default {
  /**
   * Mengambil semua item dari server.
   * Method: GET
   * Endpoint: /items
   */
  getItems() {
    return apiClient.get('/items');
  },

  /**
   * Mengambil satu item spesifik berdasarkan ID.
   * Method: GET
   * Endpoint: /items/{id}
   */
  getItem(id) {
    return apiClient.get(`/items/${id}`);
  },

  /**
   * Membuat item baru di server.
   * Method: POST
   * Endpoint: /items
   */
  createItem(data) {
    return apiClient.post('/items', data);
  },

  /**
   * Memperbarui item yang sudah ada berdasarkan ID.
   * Method: PUT
   * Endpoint: /items/{id}
   */
  updateItem(id, data) {
    return apiClient.put(`/items/${id}`, data);
  },

  /**
   * Menghapus item berdasarkan ID.
   * Method: DELETE
   * Endpoint: /items/{id}
   */
  deleteItem(id) {
    return apiClient.delete(`/items/${id}`);
  },
};