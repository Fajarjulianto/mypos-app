import { useState } from "react";
import { WalletCard } from "@/components/features/finance/WalletCard";
import { MonthlySummary } from "@/components/features/finance/MonthlySummary";
import { TransactionList } from "@/components/features/finance/TransactionList";
import { Transaction, FinanceSummary } from "@/types/finance";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { WithdrawModal } from "@/components/features/finance/withdrawlModal";
import { TopUpModal } from "@/components/features/finance/topUpModal";

export default function FinancePage() {
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const [summary] = useState<FinanceSummary>({
    balance: 15234500,
    available: 11734500,
    moneyIn: 12500000,
    moneyOut: 8750000,
    pending: 500000,
  });

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      title: "Bank Transfer Deposit",
      date: "2024-01-20T10:30:00",
      amount: 5000000,
      type: "DEPOSIT",
      status: "COMPLETED",
      currency: "IDR",
    },
    {
      id: "2",
      title: "Escrow Hold - Order #ORD-001234",
      date: "2024-01-19T14:15:00",
      amount: 3500000,
      type: "DEPOSIT",
      status: "FAILED",
      currency: "IDR",
    },
    {
      id: "3",
      title: "Withdrawal to BCA Account",
      date: "2024-01-18T11:00:00",
      amount: 2000000,
      type: "WITHDRAWAL",
      status: "COMPLETED",
      currency: "IDR",
    },
  ]);

  const handleTopUp = () => {
    alert("Top Up Succesfull");
  };

  const handleWithdraw = () => {
    alert("Withdrawl Succesfull");
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Wallet</h1>
          <p className="text-gray-500">Manage your funds and transactions</p>
        </div>

        {/* Top Section: Wallet & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Wallet Card (Takes 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <WalletCard
              balance={summary.balance}
              available={summary.available}
              onTopUp={() => setIsTopUpOpen(true)}
              onWithdraw={() => setIsWithdrawOpen(true)}
            />
          </div>

          {/* Right: Monthly Summary */}
          <div className="lg:col-span-1">
            <MonthlySummary
              moneyIn={summary.moneyIn}
              moneyOut={summary.moneyOut}
              pending={summary.pending}
            />
          </div>
        </div>

        {/* Bottom Section: History */}
        <TransactionList transactions={transactions} />

        <TopUpModal
          isOpen={isTopUpOpen}
          onClose={() => setIsTopUpOpen(false)}
          onConfirm={handleTopUp}
        />
        <WithdrawModal
          isOpen={isWithdrawOpen}
          onClose={() => setIsWithdrawOpen(false)}
          currentBalance={summary.available} // Pass saldo tersedia untuk validasi
          onConfirm={handleWithdraw}
        />
      </div>
    </DashboardLayout>
  );
}
