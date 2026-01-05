import React, { useState } from "react";
import Head from "next/head";
import { StepIndicator } from "@/components/subscription/stepIndicator";
import { Step1Packages } from "@/components/subscription/Step1Package";
import { Step2PersonalData } from "@/components/subscription/Step2PersonalData";
import { Step3Payment } from "@/components/subscription/step3Payment";
import { SubscriptionFormData } from "@/types/subscription";

export default function SubscriptionPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Global Form State
  const [formData, setFormData] = useState<SubscriptionFormData>({
    selectedPlan: null,
    billingCycle: "MONTHLY",
    fullName: "",
    email: "",
    whatsapp: "",
    password: "",
    referralCode: "",
    isPolicyAccepted: false,
    isCaptchaVerified: false,
    selectedPaymentId: null,
  });

  // Handler Update State
  const updateData = <K extends keyof SubscriptionFormData>(
    field: K,
    value: SubscriptionFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Navigasi
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Handler Submit Akhir
  const handleSubmitOrder = () => {
    console.log("Submitting Order:", formData);
    alert("Order berhasil dibuat! Redirect ke halaman pembayaran...");
    // Logic API call disini...
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Head>
        <title>Order Subscription | POS App</title>
      </Head>

      <div className="max-w-5xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Mulai Perjalanan Bisnis Anda
          </h1>
          <p className="mt-2 text-gray-500">
            Selesaikan pendaftaran dalam 3 langkah mudah.
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 md:p-10 border border-gray-100 relative overflow-hidden">
          {/* Decorative Blob (Optional) */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

          {currentStep === 1 && (
            <Step1Packages
              selectedPlan={formData.selectedPlan}
              onSelect={(planId) => updateData("selectedPlan", planId)}
              onNext={nextStep}
            />
          )}

          {currentStep === 2 && (
            <Step2PersonalData
              formData={formData}
              updateData={updateData}
              onBack={prevStep}
              onNext={nextStep}
            />
          )}

          {currentStep === 3 && (
            <Step3Payment
              formData={formData}
              updateData={updateData}
              onBack={prevStep}
              onSubmit={handleSubmitOrder}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} POS Application. Secure Encrypted
          Transaction.
        </div>
      </div>
    </div>
  );
}
