import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SalesFilter } from "@/components/features/report/SalesFilter";
import {
  TopSellingList,
  type TopProduct,
} from "@/components/features/report/TopSellingList";

// Data Dummy sesuai referensi image_6076dd.png
const dummyTopProducts: TopProduct[] = [
  { id: 1, rank: 1, name: "Wireless Mouse", unitsSold: 245, revenue: 7350.55 },
  {
    id: 2,
    rank: 2,
    name: "Keyboard Mechanical",
    unitsSold: 189,
    revenue: 17010.11,
  },
  { id: 3, rank: 3, name: 'Monitor 27"', unitsSold: 78, revenue: 23399.22 },
  { id: 4, rank: 4, name: "Webcam HD", unitsSold: 156, revenue: 12478.44 },
  { id: 5, rank: 5, name: "Headphones", unitsSold: 203, revenue: 12179.97 },
];

export default function ReportsPage() {
  const [reportData, setReportData] = useState<TopProduct[]>(dummyTopProducts);
  const [isLoading, setIsLoading] = useState(false);

  // Handler Pencarian (Simulasi)
  const handleSearch = (start: string, end: string) => {
    if (!start || !end) {
      alert("Please select both start and end dates.");
      return;
    }

    setIsLoading(true);
    // Simulasi API call
    setTimeout(() => {
      setIsLoading(false);
      // Di sini nanti logika fetch data asli berdasarkan tanggal
      console.log(`Searching from ${start} to ${end}`);
    }, 1000);
  };

  // Handler Export
  const handleExport = () => {
    alert("Downloading report as .CSV...");
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics & Reports
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor performance and sales trends.
          </p>
        </div>

        {/* 1. Header Filter Section */}
        <SalesFilter onSearch={handleSearch} onExport={handleExport} />

        {/* 2. Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Selling List */}
          <div
            className={`transition-opacity duration-300 ${
              isLoading ? "opacity-50" : "opacity-100"
            }`}
          >
            <TopSellingList products={reportData} />
          </div>

          {/* Placeholder untuk Chart atau report lain (Opsional) */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-center justify-center text-gray-400 border-dashed min-h-75">
            <div className="text-center">
              <p className="text-sm">Additional Charts Area</p>
              <p className="text-xs mt-1">(Revenue Graph, etc.)</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
