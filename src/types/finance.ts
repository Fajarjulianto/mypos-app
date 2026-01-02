// types/finance.ts

export type TransactionStatus = "COMPLETED" | "PENDING" | "FAILED";
export type TransactionType = "DEPOSIT" | "WITHDRAWAL";

export interface FinanceSummary {
  balance: number;
  available: number;
  moneyIn: number;
  moneyOut: number;
  pending: number;
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  currency: string;
}
