import { useState } from "react";
import Link from "next/link";
import { SupplierHeader } from "@/components/marketplace/SupplierHeader";
import { SupplierStatsGrid } from "@/components/marketplace/SupplierStats";
import { ArrowLeft } from "lucide-react";
import { SupplierTabs } from "@/components/marketplace/SupplierTabs";
import { ProductsTab } from "@/components/marketplace/tabs/ProductTabs";
import { AboutTab } from "@/components/marketplace/tabs/AboutTabs";
import { ReviewsTab } from "@/components/marketplace/tabs/ReviewsTab";
import { ContactTab } from "@/components/marketplace/tabs/ContactTab";

import { Supplier } from "@/types/supplier";

// --- Mock Data Lengkap ---
const mockSupplier: Supplier = {
  id: "sup-123",
  name: "TechAudio Pro",
  isVerified: true,
  isEscrowProtected: true,
  location: "Shenzhen, China",
  businessType: "Manufacturer",
  joinedYear: 2019,
  rating: 4.8,
  reviewCount: 234,
  stats: {
    responseTime: "< 2 hours",
    responseRate: 98,
    onTimeDelivery: 96,
    certifications: 4,
  },
  // Data Baru
  companyInfo: {
    overview:
      "Leading manufacturer of premium audio equipment with over 10 years of experience. We specialize in wireless headphones, earbuds, and speakers with cutting-edge technology.",
    businessType: "Manufacturer",
    employees: "100-500",
    annualRevenue: "$10M - $50M",
    memberSince: 2019,
    certifications: ["ISO 9001", "CE", "FCC", "RoHS"],
  },
  contactInfo: {
    email: "sales@techaudio.com",
    phone: "+86 755 8888 8888",
    website: "www.techaudio.com",
  },
  products: [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 149.99,
      minOrder: 10,
    },
    { id: "2", name: "True Wireless Earbuds", price: 79.99, minOrder: 20 },
    { id: "3", name: "Portable Bluetooth Speaker", price: 59.99, minOrder: 30 },
    { id: "4", name: "Gaming Headset Pro", price: 199.99, minOrder: 5 },
  ],
  reviews: [
    {
      id: "r1",
      user: "John D.",
      rating: 5,
      comment: "Excellent quality and fast shipping!",
      date: "2024-01-15",
    },
    {
      id: "r2",
      user: "Sarah M.",
      rating: 4,
      comment: "Good products, responsive communication.",
      date: "2024-01-10",
    },
  ],
  reviewStats: {
    average: 4.8,
    total: 234,
    distribution: { 5: 70, 4: 20, 3: 10, 2: 0, 1: 0 },
  },
};

export default function SupplierProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "products" | "about" | "reviews" | "contact"
  >("products");

  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductsTab products={mockSupplier.products} />;
      case "about":
        return <AboutTab info={mockSupplier.companyInfo} />;
      case "reviews":
        return (
          <ReviewsTab
            reviews={mockSupplier.reviews}
            stats={mockSupplier.reviewStats}
          />
        );
      case "contact":
        return <ContactTab contact={mockSupplier.contactInfo} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Container */}
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
        <div>
          <Link
            href="/dashboard/marketplace"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 font-medium transition-colors group"
          >
            <div className="p-2 bg-white border border-gray-200 rounded-full group-hover:border-green-600 transition-colors shadow-sm">
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </div>
            <span>Back to Marketplace</span>
          </Link>
        </div>
        {/* 1. Header & Quick Stats (Dari request sebelumnya) */}
        <SupplierHeader
          supplier={mockSupplier}
          onContact={() => {}}
          onFollow={() => {}}
        />
        <SupplierStatsGrid stats={mockSupplier.stats} />

        {/* 2. Menu Tabs Navigation */}
        <div className="mt-8">
          <SupplierTabs activeTab={activeTab} onChange={setActiveTab} />

          {/* 3. Tab Content Area */}
          <div className="min-h-100">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
