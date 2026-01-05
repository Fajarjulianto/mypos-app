// types/subscription.ts

export type PlanTier = "STARTER" | "GROWTH" | "ENTERPRISE";

export interface PricingPlan {
  id: PlanTier;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  category: "VIRTUAL_ACCOUNT" | "E_WALLET" | "QRIS" | "CREDIT_CARD";
  icon: string; // Bisa berupa URL atau nama icon
}

export interface SubscriptionFormData {
  // Step 1
  selectedPlan: PlanTier | null;
  billingCycle: "MONTHLY" | "YEARLY";

  // Step 2
  fullName: string;
  email: string;
  whatsapp: string;
  password: string;
  referralCode?: string;
  isPolicyAccepted: boolean;
  isCaptchaVerified: boolean;

  // Step 3
  selectedPaymentId: string | null;
}
