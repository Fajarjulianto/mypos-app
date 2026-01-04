import { create } from "zustand";
import { InventoryItem } from "@/types/inventory"; // Import tipe yang sudah dibuat
import { inventoryService } from "@/services/inventoriServices";

interface InventoryState {
  // --- State ---
  items: InventoryItem[];
  isLoading: boolean;
  error: string | null;

  // --- Actions ---
  fetchInventory: () => Promise<void>;

  // Actions lain (delete, update) bisa ditambahkan di sini
  setItems: (items: InventoryItem[]) => void; // Jika butuh update manual
}

export const useInventoryStore = create<InventoryState>((set) => ({
  items: [],
  isLoading: false,
  error: null,

  setItems: (items) => set({ items }),

  fetchInventory: async () => {
    set({ isLoading: true, error: null }); // Reset state sebelum fetch
    try {
      const data = await inventoryService.getAll();
      set({ items: data, isLoading: false });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan tidak diketahui";
      set({ error: errorMessage, isLoading: false, items: [] });
    }
  },
}));
