<template>
  <header class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <RouterLink to="/" class="brand-link">
          <span class="app-icon">🗃️</span>
          <span class="app-title">Inventaris</span>
        </RouterLink>
      </div>
      <nav class="navigation-menu">
        <RouterLink to="/" class="nav-link">Dashboard</RouterLink>
        <RouterLink to="/items" class="nav-link">Daftar Barang</RouterLink>
        <RouterLink to="/about" class="nav-link">Tentang</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.navbar {
  background-color: var(--color-surface, #ffffff);
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  padding: 0 2rem;
  height: 65px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.05);
}

.navbar-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.app-icon {
  font-size: 1.5rem;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-header, #1e293b);
}

.navigation-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  font-weight: 500;
  color: var(--color-text-body, #475569);
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.nav-link:hover {
  color: var(--color-primary, #3b82f6);
}

/* Style untuk link yang sedang aktif */
.router-link-exact-active {
  color: var(--color-primary, #3b82f6);
  border-bottom-color: var(--color-primary, #3b82f6);
}
</style>