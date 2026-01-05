import React from "react";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = [
    { id: 1, label: "Pilih Paket" },
    { id: 2, label: "Data Diri" },
    { id: 3, label: "Pembayaran" },
  ];

  return (
    <div className="flex items-center justify-center w-full mb-8">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;

        return (
          <div key={step.id} className="flex items-center">
            {/* Circle & Label Container */}
            <div className="relative flex flex-col items-center group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 
                  ${
                    isCompleted
                      ? "bg-green-600 border-green-600 text-white"
                      : isActive
                      ? "bg-white border-green-600 text-green-600 shadow-[0_0_0_4px_rgba(22,163,74,0.2)]"
                      : "bg-white border-gray-300 text-gray-400"
                  }
                `}
              >
                {isCompleted ? (
                  <Check size={20} strokeWidth={3} />
                ) : (
                  <span className="font-bold">{step.id}</span>
                )}
              </div>
              <span
                className={`absolute -bottom-7 text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive || isCompleted ? "text-green-700" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-16 md:w-32 h-1 mx-2 rounded-full transition-all duration-300 ${
                  isCompleted ? "bg-green-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
