import { createRouter, createWebHistory } from 'vue-router';

// Impor semua komponen View (halaman) yang akan digunakan dalam routing.
import DashboardView from '../views/DashboardView.vue';
import ItemListView from '../views/ItemListView.vue';
import AddItemView from '../views/AddItemView.vue';
import EditItemView from '../views/EditItemView.vue';
import AboutView from '../views/AboutView.vue';

// Definisikan semua rute (jalur URL) untuk aplikasi.
const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/items',
    name: 'itemList',
    component: ItemListView
  },
  {
    // Rute untuk halaman tambah item.
    // Penting: Rute ini harus didefinisikan SEBELUM rute dinamis '/items/edit/:id'.
    path: '/items/add',
    name: 'addItem',
    component: AddItemView
  },
  {
    // Rute dinamis untuk halaman edit item.
    // ':id' adalah parameter yang akan berisi ID dari item yang akan diedit.
    path: '/items/edit/:id',
    name: 'editItem',
    component: EditItemView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
];

// Buat instance router.
const router = createRouter({
  // Menggunakan mode 'history' untuk URL yang bersih (tanpa #).
  history: createWebHistory(import.meta.env.BASE_URL),
  // Menerapkan daftar rute yang sudah didefinisikan.
  routes: routes,
  // (Opsional) Menambahkan kelas aktif kustom jika diperlukan.
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',
});

// Ekspor instance router agar bisa digunakan di main.js
export default router;