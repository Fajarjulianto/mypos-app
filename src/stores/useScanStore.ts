import { create } from "zustand";
import { scanImageService, ScannedItem } from "@/types/aiScanService";

interface ScanSummary {
  totalQty: number;
  totalValue: number;
}

interface ScanState {
  // State Variables
  isOpen: boolean;
  imagePreview: string | null;
  items: ScannedItem[];
  isScanning: boolean;
  error: string | null;

  // Actions
  openModal: () => void;
  closeModal: () => void;
  resetScan: () => void;

  // Logic
  handleFileScan: (file: File) => Promise<void>;
  updateItem: <K extends keyof ScannedItem>(
    id: number,
    field: K,
    value: ScannedItem[K]
  ) => void;
  deleteItem: (id: number) => void;
  addItem: () => void;

  // Computed
  getSummary: () => ScanSummary;
}

export const useScanStore = create<ScanState>((set, get) => ({
  isOpen: false,
  imagePreview: null,
  items: [],
  isScanning: false,
  error: null,

  openModal: () => set({ isOpen: true }),

  closeModal: () => {
    const currentImg = get().imagePreview;
    if (currentImg) URL.revokeObjectURL(currentImg);
    set({ isOpen: false, imagePreview: null, items: [], error: null });
  },

  resetScan: () => {
    const currentImg = get().imagePreview;
    if (currentImg) URL.revokeObjectURL(currentImg);
    set({ imagePreview: null, items: [], error: null });
  },

  handleFileScan: async (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    set({ imagePreview: objectUrl, isScanning: true, error: null, items: [] });

    try {
      const apiData = await scanImageService(file);

      const processedItems: ScannedItem[] = apiData.map((item, index) => ({
        id: Date.now() + index,
        name: item.name,
        qty: 1,
        price: item.standardPrice,
        confidence: 100,
      }));

      set({ items: processedItems, isScanning: false });
    } catch (error: unknown) {
      let errorMessage = "Terjadi kesalahan saat memindai.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      set({
        error: errorMessage,
        isScanning: false,
      });
    }
  },

  updateItem: (id, field, value) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  },

  deleteItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  addItem: () => {
    set((state) => ({
      items: [
        ...state.items,
        { id: Date.now(), name: "", qty: 1, price: 0, confidence: 100 },
      ],
    }));
  },

  getSummary: () => {
    const { items } = get();
    return items.reduce(
      (acc, item) => ({
        totalQty: acc.totalQty + item.qty,
        totalValue: acc.totalValue + item.qty * item.price,
      }),
      { totalQty: 0, totalValue: 0 }
    );
  },
}));
