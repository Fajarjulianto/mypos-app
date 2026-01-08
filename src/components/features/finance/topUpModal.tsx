import React, { useState } from "react";
import { X, Wallet, CheckCircle2, ArrowRight } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  type: "VA" | "E-WALLET";
  icon: string; // Bisa diganti URL image logo bank
}

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number, methodId: string) => void;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "bca_va", name: "BCA Virtual Account", type: "VA", icon: "BCA" },
  { id: "bri_va", name: "BRI Virtual Account", type: "VA", icon: "BRI" },
  { id: "gopay", name: "GoPay", type: "E-WALLET", icon: "GOPAY" },
  { id: "ovo", name: "OVO", type: "E-WALLET", icon: "OVO" },
];

const PRESET_AMOUNTS = [50000, 100000, 250000, 500000, 1000000, 2000000];

export const TopUpModal = ({ isOpen, onClose, onConfirm }: TopUpModalProps) => {
  const [amount, setAmount] = useState<number | "">("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setAmount(isNaN(val) ? "" : val);
  };

  const handleSubmit = () => {
    if (amount && selectedMethod) {
      onConfirm(Number(amount), selectedMethod);
      setAmount("");
      setSelectedMethod(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-3xl">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <ArrowRight className="rotate-90" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Top Up Wallet</h2>
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
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Nominal Top Up
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                Rp
              </span>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-bold text-lg"
              />
            </div>

            {/* Preset Chips */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className={`py-2 px-1 rounded-lg text-xs font-semibold border transition-all ${
                    amount === preset
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-green-400"
                  }`}
                >
                  {preset.toLocaleString("id-ID")}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Metode Pembayaran
            </label>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? "border-green-600 bg-green-50 shadow-sm"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-xs text-gray-500">
                      {method.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">
                        {method.name}
                      </p>
                      <p className="text-[10px] text-gray-500 font-semibold">
                        {method.type}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMethod === method.id
                        ? "border-green-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 rounded-b-3xl">
          <button
            onClick={handleSubmit}
            disabled={!amount || !selectedMethod}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Wallet size={18} />
            Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};
