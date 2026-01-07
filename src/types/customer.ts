// types/customer.ts

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;     // Total uang yang dibelanjakan
  totalTransactions: number; // Jumlah kedatangan/transaksi
  points: number;         // Poin loyalty
  lastVisit: string;      // ISO Date string
  status: "ACTIVE" | "INACTIVE";
  avatar?: string;        // URL foto (opsional)
}

// Tipe untuk State Store
export interface CustomerState {
  customers: Customer[];
  searchQuery: string;
  isLoading: boolean;
  
  // Actions
  setSearchQuery: (query: string) => void;
  deleteCustomer: (id: string) => void;
  addCustomer: (customer: Omit<Customer, "id">) => void;
  
  // Computed (Getter)
  getFilteredCustomers: () => Customer[];
}