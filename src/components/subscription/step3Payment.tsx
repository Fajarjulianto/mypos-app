import React, { useMemo } from "react";
import {
  CreditCard,
  Wallet,
  QrCode,
  ArrowLeft,
  ArrowRight,
  Banknote,
} from "lucide-react";
import { PaymentMethod, SubscriptionFormData } from "@/types/subscription";

// Mock Payment Methods
const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "bca_va",
    name: "BCA Virtual Account",
    category: "VIRTUAL_ACCOUNT",
    icon: "bank",
  },
  {
    id: "mandiri_va",
    name: "Mandiri Virtual Account",
    category: "VIRTUAL_ACCOUNT",
    icon: "bank",
  },
  { id: "gopay", name: "GoPay", category: "E_WALLET", icon: "wallet" },
  { id: "ovo", name: "OVO", category: "E_WALLET", icon: "wallet" },
  { id: "qris", name: "QRIS (Scan)", category: "QRIS", icon: "qr" },
];

// Mapping Harga Paket (Sebaiknya disatukan di file constants/config, tapi disini oke untuk demo)
const PLAN_PRICES: Record<string, number> = {
  STARTER: 99000,
  GROWTH: 199000,
  ENTERPRISE: 499000,
};

interface Step3Props {
  formData: SubscriptionFormData;
  // FIX: Menggunakan Generic <K> untuk Type Safety (No 'any')
  updateData: <K extends keyof SubscriptionFormData>(
    field: K,
    value: SubscriptionFormData[K]
  ) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const Step3Payment = ({
  formData,
  updateData,
  onBack,
  onSubmit,
}: Step3Props) => {
  // Helper Icon
  const renderIcon = (type: string) => {
    switch (type) {
      case "bank":
        return <Banknote className="text-blue-600" size={20} />;
      case "wallet":
        return <Wallet className="text-purple-600" size={20} />;
      case "qr":
        return <QrCode className="text-gray-800" size={20} />;
      default:
        return <CreditCard size={20} />;
    }
  };

  // Helper Format Currency
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Kalkulasi Total (Memoized agar tidak re-render berlebih)
  const { subtotal, tax, total } = useMemo(() => {
    const price = formData.selectedPlan
      ? PLAN_PRICES[formData.selectedPlan]
      : 0;
    const taxAmount = price * 0.11; // PPN 11%
    return {
      subtotal: price,
      tax: taxAmount,
      total: price + taxAmount,
    };
  }, [formData.selectedPlan]);

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* --- LEFT COLUMN: PAYMENT METHODS --- */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Metode Pembayaran
          </h2>
          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = formData.selectedPaymentId === method.id;
              return (
                <div
                  key={method.id}
                  onClick={() => updateData("selectedPaymentId", method.id)}
                  className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all group ${
                    isSelected
                      ? "border-green-600 bg-green-50 ring-1 ring-green-600 shadow-sm"
                      : "border-gray-200 bg-white hover:border-green-400 hover:bg-gray-50"
                  }`}
                >
                  {/* Icon Wrapper */}
                  <div
                    className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-white border-green-200"
                        : "bg-gray-50 border-gray-100 group-hover:bg-white"
                    }`}
                  >
                    {renderIcon(method.icon)}
                  </div>

                  {/* Text Info */}
                  <div className="flex-1">
                    <h4
                      className={`font-bold transition-colors ${
                        isSelected ? "text-green-800" : "text-gray-800"
                      }`}
                    >
                      {method.name}
                    </h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mt-0.5">
                      {method.category.replace("_", " ")}
                    </p>
                  </div>

                  {/* Radio Circle Indicator */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-green-600"
                        : "border-gray-300 group-hover:border-gray-400"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 bg-green-600 rounded-full animate-in zoom-in duration-200" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- RIGHT COLUMN: ORDER SUMMARY --- */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">
              Ringkasan Order
            </h3>

            {/* Plan Info */}
            <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-200 border-dashed">
              <div>
                <p className="text-sm text-gray-500 mb-1">Paket Pilihan</p>
                <p className="font-bold text-gray-900 text-lg">
                  {formData.selectedPlan
                    ? formData.selectedPlan.charAt(0) +
                      formData.selectedPlan.slice(1).toLowerCase()
                    : "-"}{" "}
                  Plan
                </p>
                <p className="text-xs text-green-600 font-medium bg-green-100 inline-block px-2 py-0.5 rounded mt-1">
                  {formData.billingCycle === "MONTHLY" ? "Bulanan" : "Tahunan"}
                </p>
              </div>
              <p className="font-bold text-gray-900">
                {formatRupiah(subtotal)}
              </p>
            </div>

            {/* Calculation Details */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Pajak (PPN 11%)</span>
                <span>{formatRupiah(tax)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-8">
              <span className="font-bold text-lg text-gray-900">
                Total Bayar
              </span>
              <span className="font-bold text-xl text-green-600">
                {formatRupiah(total)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onSubmit}
                disabled={!formData.selectedPaymentId}
                className="w-full py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                Bayar Sekarang <ArrowRight size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={onBack}
                className="w-full py-3.5 text-gray-500 font-semibold hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} /> Kembali
              </button>
            </div>

            {/* Security Note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Enkripsi SSL 256-bit Secured
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
