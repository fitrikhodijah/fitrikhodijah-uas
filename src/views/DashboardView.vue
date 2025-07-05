<template>
    <div class="dashboard">
      <header class="dashboard-header">
        <h1>Dashboard</h1>
        <p class="subtitle">Selamat datang! Berikut ringkasan inventaris Anda.</p>
      </header>
  
      <section class="summary-cards">
        <div class="card" :class="stat.className" v-for="stat in stats" :key="stat.title">
          <div class="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" :d="stat.iconPath" />
            </svg>
          </div>
          <div class="card-content">
            <p class="card-title">{{ stat.title }}</p>
            <h3 class="card-value">{{ stat.value }}</h3>
          </div>
        </div>
      </section>
  
      <section class="main-content">
         <div class="chart-container">
          <h3>Top 5 Barang Stok Terbanyak</h3>
          <Bar v-if="!isLoading && items.length > 0" :data="chartData" :options="chartOptions" />
          <p v-else class="placeholder-text">Memuat data grafik...</p>
        </div>
  
        <div class="alerts-list">
          <h3>Stok Kritis (Perlu Restock)</h3>
          <div v-if="lowStockItems.length === 0" class="empty-list">
              <p>👍 Semua stok aman!</p>
          </div>
          <table v-else>
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Sisa Stok</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in lowStockItems" :key="item.id">
                <td>{{ item.name }}</td>
                <td><span class="stock-low">{{ item.quantity }} Unit</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useItemStore } from '@/stores/itemStore.js';
  import { Bar } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  const itemStore = useItemStore();
  
  const { 
    items,
    isLoading, 
    totalItems, 
    lowStockItems, 
    totalInventoryValue, 
    totalStockQuantity 
  } = storeToRefs(itemStore);
  
  onMounted(() => {
      itemStore.fetchItems();
  });
  
  // Data untuk kartu statistik, diambil dari getters Pinia store
  const stats = computed(() => [
    {
      title: 'Total Jenis Barang',
      value: totalItems.value,
      iconPath: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
      className: 'card-green',
    },
    {
      title: 'Stok Menipis',
      value: lowStockItems.value.length,
      iconPath: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z',
      className: 'card-red',
    },
    {
      title: 'Nilai Inventaris',
      value: totalInventoryValue.value,
      iconPath: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0h.75A.75.75 0 014.5 6v.75m0 0v.75A.75.75 0 013.75 8.25h-.75m0 0h-.75A.75.75 0 012.25 7.5v-.75M3 15v-2.25A.75.75 0 013.75 12h.75m0 0h.75A.75.75 0 016 12.75v2.25m0 0v.75A.75.75 0 015.25 16.5h-.75m0 0h-.75A.75.75 0 013.75 15.75v-.75M5.25 12v-2.25A.75.75 0 016 9h.75m0 0h.75A.75.75 0 018.25 9.75v2.25m0 0v.75A.75.75 0 017.5 13.5h-.75m0 0h-.75A.75.75 0 016 12.75v-.75m9-3.75a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-.75V9.75a.75.75 0 01.75-.75h2.25z',
      className: 'card-blue',
    },
    {
      title: 'Total Stok Barang',
      value: `${totalStockQuantity.value} Unit`,
      iconPath: 'M9 8.25H7.5M9 12H7.5M9 15.75H7.5M12 8.25H16.5M12 12H16.5M12 15.75H16.5M5.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V6.75A2.25 2.25 0 015.25 4.5z',
      className: 'card-orange',
    }
  ]);
  
  // Logika untuk data grafik horizontal
  const chartData = computed(() => {
    if (!items.value || items.value.length === 0) {
      return { labels: [], datasets: [{ data: [] }] };
    }
    const sortedItems = [...items.value]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
      .reverse(); // Dibalik agar #1 di atas pada chart horizontal
    return {
      labels: sortedItems.map(item => item.name),
      datasets: [
        {
          label: 'Jumlah Stok',
          backgroundColor: '#3b82f6',
          borderColor: '#1e40af',
          borderWidth: 1,
          data: sortedItems.map(item => item.quantity),
        },
      ],
    };
  });
  
  // Opsi untuk grafik horizontal
  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false, // Penting agar bisa diatur tingginya via CSS
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 2rem;
    background-color: var(--color-background, #f0f4f8);
    min-height: 100vh;
  }
  .dashboard-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-text-header, #1e293b);
  }
  .dashboard-header .subtitle {
    font-size: 1.1rem;
    color: var(--color-text-body, #64748b);
    margin-top: -0.5rem;
  }
  .summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  .card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 12px;
    color: #ffffff;
    overflow: hidden;
    position: relative;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
  .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    z-index: 1;
  }
  .card-icon, .card-content {
    position: relative;
    z-index: 2;
  }
  .card-icon {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 0.75rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-icon svg {
    width: 28px;
    height: 28px;
    color: #ffffff;
  }
  .card-content .card-title {
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.9rem;
    margin: 0;
    font-weight: 500;
  }
  .card-content .card-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: #ffffff;
    margin: 0.25rem 0 0 0;
  }
  .card.card-green { background-color: #22c55e; }
  .card.card-red { background-color: #ef4444; }
  .card.card-blue { background-color: #3b82f6; }
  .card.card-orange { background-color: #f97316; }
  .card.card-purple { background-color: #8b5cf6; }
  .card.card-teal { background-color: #14b8a6; }
  .main-content {
    margin-top: 2.5rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
  }
  
  /* === PERUBAHAN UTAMA UNTUK MEMPERKECIL GRAFIK === */
  .chart-container {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    height: 350px; /* <-- Atur tinggi kontainer secara eksplisit */
  }
  /* =============================================== */
  
  .alerts-list {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  .main-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-header);
    margin-top: 0;
    margin-bottom: 1rem;
  }
  .placeholder-text, .empty-list {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--color-text-muted);
  }
  .alerts-list table {
    width: 100%;
    border-collapse: collapse;
  }
  .alerts-list th, .alerts-list td {
    text-align: left;
    padding: 0.75rem 0.5rem;
    border-bottom: 1px solid var(--color-border);
  }
  .alerts-list th {
    color: var(--color-text-body);
    font-size: 0.8rem;
    text-transform: uppercase;
  }
  .alerts-list td {
    color: var(--color-text-body);
  }
  .stock-low {
    color: #dc2626;
    font-weight: 600;
  }
  
  @media (max-width: 992px) {
    .main-content {
      grid-template-columns: 1fr;
    }
  }
  </style>