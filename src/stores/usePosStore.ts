// stores/usePosStore.ts
import { create } from "zustand";
import type {
  PaymentResult,
  TransactionRecord,
  TransactionItem,
} from "@/types/sales";

// Definisi Tipe (Disamakan dengan kode asli Anda)
interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

// Interface Produk untuk parameter function
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface PosState {
  // State Variables
  searchTerm: string;
  cart: CartItem[];
  isCheckoutOpen: boolean;
  isSuccessOpen: boolean;
  lastTransaction: TransactionRecord | null;

  // Actions
  setSearchTerm: (term: string) => void;
  setCheckoutOpen: (isOpen: boolean) => void;
  setSuccessOpen: (isOpen: boolean) => void;

  // Logic Actions
  addToCart: (product: Product) => void;
  updateQty: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  calculateTotal: () => number;

  // Transaction Logic
  processPaymentSuccess: (result: PaymentResult) => void;
  resetNewOrder: () => void;
}

export const usePosStore = create<PosState>((set, get) => ({
  // Initial State
  searchTerm: "",
  cart: [],
  isCheckoutOpen: false,
  isSuccessOpen: false,
  lastTransaction: null,

  // Simple Setters
  setSearchTerm: (term) => set({ searchTerm: term }),
  setCheckoutOpen: (isOpen) => set({ isCheckoutOpen: isOpen }),
  setSuccessOpen: (isOpen) => set({ isSuccessOpen: isOpen }),

  // Logic: Calculate Total
  calculateTotal: () => {
    return get().cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  },

  // Logic: Add to Cart
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }
      return {
        cart: [
          ...state.cart,
          { id: product.id, name: product.name, price: product.price, qty: 1 },
        ],
      };
    }),

  // Logic: Update Quantity
  updateQty: (id, delta) =>
    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.id === id) {
          return { ...item, qty: Math.max(1, item.qty + delta) };
        }
        return item;
      }),
    })),

  // Logic: Remove Item
  removeItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // Logic: Payment Success
  processPaymentSuccess: (result) => {
    const state = get();
    const totalAmount = state.calculateTotal();

    const transactionItems: TransactionItem[] = state.cart.map((item) => ({
      name: item.name,
      qty: item.qty,
      price: item.price,
      total: item.price * item.qty,
      unit: "pcs",
    }));

    const newTransaction: TransactionRecord = {
      ...result,
      id: `TRX-${Date.now()}`,
      total: totalAmount,
      date: new Date(),
      items: transactionItems,
    };

    set({
      lastTransaction: newTransaction,
      isCheckoutOpen: false,
      isSuccessOpen: true,
    });
  },

  // Logic: New Order / Reset
  resetNewOrder: () =>
    set({
      isSuccessOpen: false,
      lastTransaction: null,
      cart: [],
    }),
}));
