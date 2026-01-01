import { useState } from "react";
import { X, Banknote, QrCode, User, Wallet, ArrowRight } from "lucide-react";
import { formatRupiah } from "@/utils/format";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onSuccess: (details: {
    amountPaid: number;
    change: number;
    paymentMethod: "CASH" | "QRIS";
    customerName: string;
  }) => void;
}

const quickAmounts = [50000, 100000, 200000, 500000, 1000000];

export const CheckoutModal = ({
  isOpen,
  onClose,
  totalAmount,
  onSuccess,
}: CheckoutModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "QRIS">("CASH");
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [customerName, setCustomerName] = useState("Umum");

  if (!isOpen) return null;

  const change = Math.max(0, amountPaid - totalAmount);
  const isInsufficient = paymentMethod === "CASH" && amountPaid < totalAmount;

  const handlePay = () => {
    if (isInsufficient) return;

    onSuccess({
      amountPaid: paymentMethod === "CASH" ? amountPaid : totalAmount,
      change: paymentMethod === "CASH" ? change : 0,
      paymentMethod,
      customerName,
    });

    setTimeout(() => {
      setAmountPaid(0);
      setCustomerName("Umum");
      setPaymentMethod("CASH");
    }, 100);
  };

  const handleClose = () => {
    // Reset semua state ke default saat ditutup
    setAmountPaid(0);
    setCustomerName("Umum");
    setPaymentMethod("CASH");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Pembayaran</h2>
            <p className="text-xs text-gray-500">Selesaikan transaksi ini</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {/* 1. Customer Name */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Nama Pelanggan
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          {/* 2. Payment Method Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
            <button
              onClick={() => setPaymentMethod("CASH")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                paymentMethod === "CASH"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Banknote className="h-4 w-4" /> Tunai (Cash)
            </button>
            <button
              onClick={() => setPaymentMethod("QRIS")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                paymentMethod === "QRIS"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <QrCode className="h-4 w-4" /> QRIS
            </button>
          </div>

          {/* 3. Payment Details Area */}
          {paymentMethod === "CASH" ? (
            <div className="space-y-6">
              {/* Total & Input */}
              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50 text-center">
                <p className="text-sm text-gray-500 mb-1">Total Tagihan</p>
                <h3 className="text-3xl font-extrabold text-blue-600 mb-6">
                  {formatRupiah(totalAmount)}
                </h3>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Wallet className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={amountPaid || ""}
                    onChange={(e) => setAmountPaid(Number(e.target.value))}
                    placeholder="Masukkan nominal..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-xl font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-300"
                    autoFocus
                  />
                </div>

                {/* Change Display */}
                <div className="flex justify-between items-center mt-4 px-2">
                  <span className="text-sm text-gray-500 font-medium">
                    Kembalian
                  </span>
                  <span
                    className={`text-lg font-bold ${
                      change > 0 ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {formatRupiah(change)}
                  </span>
                </div>
              </div>

              {/* Quick Amounts Chips */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-3">
                  Uang Pas & Pecahan
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setAmountPaid(totalAmount)}
                    className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-bold transition-colors border border-blue-200"
                  >
                    Uang Pas
                  </button>
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setAmountPaid(amount)}
                      disabled={amount < totalAmount && amount !== totalAmount} // Optional: Disable if smaller
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors border ${
                        amount < totalAmount
                          ? "bg-gray-50 text-gray-300 border-transparent cursor-not-allowed"
                          : "bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600"
                      }`}
                    >
                      {amount >= 1000 ? `${amount / 1000}k` : amount}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // QRIS VIEW
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200">
                {/* Placeholder QR */}
                <div className="w-48 h-48 bg-gray-800 rounded-lg flex items-center justify-center text-white/20">
                  <QrCode className="h-20 w-20" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Scan QRIS untuk membayar
                </p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {formatRupiah(totalAmount)}
                </p>
              </div>
              <p className="text-xs text-gray-400 max-w-xs">
                Minta pelanggan scan QR Code di atas menggunakan aplikasi
                e-wallet atau mobile banking.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={handlePay}
            disabled={isInsufficient}
            className={`
              w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold text-white shadow-lg transition-all active:scale-[0.98]
              ${
                isInsufficient
                  ? "bg-gray-300 cursor-not-allowed shadow-none"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/30"
              }
            `}
          >
            <span>
              {paymentMethod === "CASH"
                ? `Bayar ${formatRupiah(amountPaid || 0)}`
                : "Konfirmasi Pembayaran"}
            </span>
            {!isInsufficient && <ArrowRight className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
