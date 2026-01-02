import React from "react";
import { Wallet, Plus, ArrowUpRight } from "lucide-react";
import { formatRupiah } from "@/utils/format";

interface WalletCardProps {
  balance: number;
  available: number;
  onTopUp: () => void;
  onWithdraw: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  available,
  onTopUp,
  onWithdraw,
}) => {
  return (
    <div className="bg-primary rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <Wallet size={20} />
            <span className="font-medium">Wallet Balance</span>
          </div>
          <h2 className="text-4xl font-bold mb-1">{formatRupiah(balance)}</h2>
          <p className="text-green-100 text-sm opacity-80">
            Available: {formatRupiah(available)}
          </p>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onTopUp}
            className="flex-1 bg-white text-blue-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Plus size={18} />
            Top Up
          </button>
          <button
            onClick={onWithdraw}
            className="flex-1 bg-blue-700/50 backdrop-blur-sm text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700/70 transition-colors border border-blue-500/30"
          >
            <ArrowUpRight size={18} />
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
};
