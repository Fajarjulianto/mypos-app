import { create } from "zustand";
import { Customer, CustomerState } from "@/types/customer";

// Mock Data
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "cust-1",
    name: "Dimas Anggara",
    email: "dimas@example.com",
    phone: "081234567890",
    totalSpent: 15500000,
    totalTransactions: 45,
    points: 1250,
    lastVisit: "2024-01-20",
    status: "ACTIVE",
  },
  {
    id: "cust-2",
    name: "Siti Aminah",
    email: "siti.am@example.com",
    phone: "081987654321",
    totalSpent: 250000,
    totalTransactions: 2,
    points: 25,
    lastVisit: "2023-12-15",
    status: "INACTIVE",
  },
  {
    id: "cust-3",
    name: "Budi Santoso",
    email: "budi.san@example.com",
    phone: "085678901234",
    totalSpent: 5400000,
    totalTransactions: 12,
    points: 540,
    lastVisit: "2024-01-18",
    status: "ACTIVE",
  },
];

export const useCustomerStore = create<CustomerState>((set, get) => ({
  customers: MOCK_CUSTOMERS,
  searchQuery: "",
  isLoading: false,

  setSearchQuery: (query) => set({ searchQuery: query }),

  deleteCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((c) => c.id !== id),
    })),

  addCustomer: (newCustomer) =>
    set((state) => ({
      customers: [
        { ...newCustomer, id: `cust-${Date.now()}` },
        ...state.customers,
      ],
    })),

  getFilteredCustomers: () => {
    const { customers, searchQuery } = get();
    const lowerQuery = searchQuery.toLowerCase();

    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.email.toLowerCase().includes(lowerQuery) ||
        c.phone.includes(lowerQuery)
    );
  },
}));
