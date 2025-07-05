import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useItemStore } from '@/stores/itemStore.js'; // <-- DIUBAH: Menggunakan alias @
import ItemService from '@/services/ItemService.js'; // <-- DIUBAH: Menggunakan alias @

// Mock ItemService menggunakan path yang benar dengan alias @
vi.mock('@/services/ItemService.js', () => ({
  default: {
    getItems: vi.fn(),
    createItem: vi.fn(),
    deleteItem: vi.fn(),
  },
}));

// 'describe' adalah blok utama yang mengelompokkan tes untuk 'itemStore'
describe('itemStore', () => {

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  // Tes 1: Memeriksa state awal
  it('should have correct initial state', () => {
    const store = useItemStore();
    expect(store.items).toEqual([]);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBe(null);
  });

  // Tes 2: Memeriksa sebuah getter
  it('should return correct lowStockItems count from getter', () => {
    const store = useItemStore();
    store.items = [
      { id: 1, name: 'Stok Banyak', quantity: 100 },
      { id: 2, name: 'Stok Sedikit', quantity: 5 },
      { id: 3, name: 'Stok Kritis', quantity: 2 },
    ];
    expect(store.lowStockItems.length).toBe(2);
    expect(store.lowStockItems[0].name).toBe('Stok Sedikit');
  });

  // Tes 3: Memeriksa sebuah action
  it('should fetch items and update state on fetchItems action', async () => {
    const store = useItemStore();
    const mockData = [
      { id: 1, name: 'Mock Item 1' },
      { id: 2, name: 'Mock Item 2' },
    ];
    
    ItemService.getItems.mockResolvedValue({ data: mockData });

    await store.fetchItems();

    expect(store.items).toEqual(mockData);
    expect(store.isLoading).toBe(false);
    expect(ItemService.getItems).toHaveBeenCalledTimes(1);
  });

  // Tes 4: Memeriksa penanganan error di sebuah action
  it('should set error state when fetchItems fails', async () => {
    const store = useItemStore();
    const mockError = new Error('Network Error');
    
    ItemService.getItems.mockRejectedValue(mockError);

    await store.fetchItems();

    expect(store.error).toEqual(mockError);
    expect(store.items).toEqual([]);
    expect(store.isLoading).toBe(false);
  });
});