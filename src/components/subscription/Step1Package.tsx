import React from "react";
import { CheckCircle2 } from "lucide-react";
import { PlanTier, PricingPlan } from "@/types/subscription";

// Mock Data Paket
const PLANS: PricingPlan[] = [
  {
    id: "STARTER",
    name: "Starter",
    price: 99000,
    description: "Cocok untuk usaha rintisan kecil.",
    features: [
      "1 Outlet",
      "Maks. 500 Transaksi/bln",
      "Laporan Dasar",
      "Support Email",
    ],
  },
  {
    id: "GROWTH",
    name: "Growth",
    price: 199000,
    description: "Untuk bisnis yang sedang berkembang.",
    features: [
      "3 Outlet",
      "Unlimited Transaksi",
      "Laporan Lengkap",
      "Manajemen Stok",
      "Support Priority",
    ],
    recommended: true,
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    price: 499000,
    description: "Solusi lengkap skala besar.",
    features: [
      "Unlimited Outlet",
      "API Access",
      "Custom Domain",
      "Dedicated Account Manager",
      "White Label",
    ],
  },
];

interface Step1Props {
  selectedPlan: PlanTier | null;
  onSelect: (planId: PlanTier) => void;
  onNext: () => void;
}

export const Step1Packages = ({
  selectedPlan,
  onSelect,
  onNext,
}: Step1Props) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
        Pilih Paket Langganan
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Sesuaikan dengan kebutuhan bisnis Anda saat ini.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => onSelect(plan.id)}
              className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
                isSelected
                  ? "border-green-600 bg-green-50/50 shadow-green-100"
                  : "border-gray-200 bg-white hover:border-green-200"
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  MOST POPULAR
                </span>
              )}

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3
                    className={`font-bold text-lg ${
                      isSelected ? "text-green-700" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {plan.description}
                  </p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="text-green-600" size={24} />
                )}
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  Rp{plan.price.toLocaleString("id-ID")}
                </span>
                <span className="text-gray-500 text-sm">/bulan</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-green-500 shrink-0"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedPlan}
          className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-600/20"
        >
          Lanjut ke Data Diri
        </button>
      </div>
    </div>
  );
};
