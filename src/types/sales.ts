// Tipe data hasil dari Modal Checkout
export interface PaymentResult {
  amountPaid: number;
  change: number;
  paymentMethod: "CASH" | "QRIS";
  customerName: string;
}

// Tipe data Transaksi Utuh (setelah disimpan ke DB/State)
export interface TransactionRecord extends PaymentResult {
  id: string;
  amountPaid: number;
  total: number;
  date: Date;
  items: TransactionItem[];
}

export interface TransactionItem {
  name: string;
  qty: number;
  price: number;
  total: number;
  unit?: string; // (pcs, kg, pack)
}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}
