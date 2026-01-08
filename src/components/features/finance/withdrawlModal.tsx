import React, { useState } from "react";
import { X, ArrowUpRight, AlertCircle, Landmark } from "lucide-react";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number; // Untuk validasi
  onConfirm: (amount: number, bankData: any) => void;
}

export const WithdrawModal = ({
  isOpen,
  onClose,
  currentBalance,
  onConfirm,
}: WithdrawModalProps) => {
  const [amount, setAmount] = useState<number | "">("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("BCA"); // Default mock

  if (!isOpen) return null;

  const maxAmount = currentBalance;
  const isOverBalance = typeof amount === "number" && amount > maxAmount;
  const adminFee = 6500; // Mock fee

  const handleSetPercent = (percent: number) => {
    setAmount(Math.floor(maxAmount * (percent / 100)));
  };

  const handleSubmit = () => {
    if (amount && !isOverBalance && accountNumber) {
      onConfirm(Number(amount), { bankName, accountNumber });
      setAmount("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-3xl">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <ArrowUpRight size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Tarik Dana</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Balance Info */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex justify-between items-center">
            <span className="text-sm text-gray-500 font-medium">
              Saldo Tersedia
            </span>
            <span className="text-lg font-bold text-green-600">
              Rp {currentBalance.toLocaleString("id-ID")}
            </span>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Jumlah Penarikan
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                Rp
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value ? parseInt(e.target.value) : "")
                }
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 outline-none font-bold text-lg transition-all ${
                  isOverBalance
                    ? "border-red-300 focus:ring-red-200 text-red-600"
                    : "border-gray-300 focus:ring-green-500"
                }`}
                placeholder="0"
              />
            </div>
            {/* Quick Percent */}
            <div className="flex gap-2 mt-2">
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  onClick={() => handleSetPercent(pct)}
                  className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-gray-600 transition-colors"
                >
                  {pct}%
                </button>
              ))}
            </div>
            {isOverBalance && (
              <div className="flex items-center gap-1 mt-2 text-xs text-red-600 font-medium animate-pulse">
                <AlertCircle size={12} /> Saldo tidak mencukupi
              </div>
            )}
          </div>

          {/* Bank Destination */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Rekening Tujuan
            </label>
            <div className="flex gap-2 mb-3">
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-1/3 p-3 border border-gray-300 rounded-xl bg-white font-semibold text-gray-700 outline-none focus:border-green-500"
              >
                <option value="BCA">BCA</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BRI">BRI</option>
                <option value="BNI">BNI</option>
              </select>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Nomor Rekening"
                className="flex-1 p-3 border border-gray-300 rounded-xl font-semibold outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>
            <div className="flex items-start gap-2 p-3 bg-blue-50 text-blue-700 rounded-xl text-xs">
              <Landmark size={16} className="shrink-0 mt-0.5" />
              <p>
                Pastikan nama pemilik rekening sesuai dengan nama akun terdaftar
                untuk mempercepat proses verifikasi.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 rounded-b-3xl">
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-500">Biaya Admin</span>
            <span className="font-bold text-gray-800">
              Rp {adminFee.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between items-center mb-6 text-sm">
            <span className="text-gray-500">Total Diterima</span>
            <span className="font-bold text-xl text-green-600">
              Rp{" "}
              {Math.max(0, Number(amount) - adminFee).toLocaleString("id-ID")}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!amount || isOverBalance || !accountNumber}
            className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Konfirmasi Penarikan
          </button>
        </div>
      </div>
    </div>
  );
};
