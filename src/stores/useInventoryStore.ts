import { create } from "zustand";
import { ScannedItem } from "@/types/aiScanService";

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  lastUpdated?: Date;
}

export type NewInventoryItem = Omit<InventoryItem, "id" | "lastUpdated">;

interface InventoryState {
  items: InventoryItem[];
  isLoading: boolean;
  setItems: (items: InventoryItem[]) => void;
  addItem: (newItem: NewInventoryItem) => void;
  updateItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteItem: (id: string) => void;
  addBatchFromScan: (scannedItems: ScannedItem[]) => void;
  getItemBySku: (sku: string) => InventoryItem | undefined;
}

// Mock Data
const initialMockData: InventoryItem[] = [
  {
    id: "1",
    sku: "SNK-001",
    name: "Indomie Goreng",
    category: "Makanan",
    stock: 50,
    price: 3500,
    lastUpdated: new Date(),
  },
  {
    id: "2",
    sku: "DRK-002",
    name: "Teh Botol Sosro",
    category: "Minuman",
    stock: 24,
    price: 5000,
    lastUpdated: new Date(),
  },
];

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: initialMockData,
  isLoading: false,

  setItems: (items) => set({ items }),

  addItem: (newItem) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          ...newItem,
          id: crypto.randomUUID(),
          lastUpdated: new Date(),
        },
      ],
    })),

  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates, lastUpdated: new Date() } : item
      ),
    })),

  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  getItemBySku: (sku) => {
    return get().items.find((item) => item.sku === sku);
  },

  addBatchFromScan: (scannedItems) =>
    set((state) => {
      const currentItems = [...state.items];

      scannedItems.forEach((scanItem) => {
        const existingItemIndex = currentItems.findIndex(
          (i) => i.name.toLowerCase() === scanItem.name.toLowerCase()
        );

        if (existingItemIndex !== -1) {
          const existingItem = currentItems[existingItemIndex];
          currentItems[existingItemIndex] = {
            ...existingItem,
            stock: existingItem.stock + scanItem.qty, // Tambah stok lama dengan hasil scan
            lastUpdated: new Date(),
          };
        } else {
          currentItems.push({
            id: crypto.randomUUID(),
            sku: `AUTO-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Generate SKU sementara
            name: scanItem.name,
            category: "Uncategorized",
            stock: scanItem.qty,
            price: scanItem.price,
            lastUpdated: new Date(),
          });
        }
      });

      return { items: currentItems };
    }),
}));
