import { RevenueChart } from "@/components/dashboard/revenueChart";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign, ShoppingBag, CreditCard, Package } from "lucide-react";
import {
  SalesByCategoryChart,
  CategoryData,
} from "@/components/dashboard/BestSellingChart";
import { AiSuggestionCard } from "@/components/ui/AiSuggestionCard";
import { AiSuggestion } from "@/types/ai";
export default function DashboardPage() {
  const mockBestSellers: CategoryData[] = [
    {
      id: "prod-1",
      name: "Kopi Susu Gula Aren",
      value: 150,
      color: "#16a34a", // Green-600
    },
    {
      id: "prod-3",
      name: "Amin Rice",
      value: 50,
      color: "#f59e0b", // Amber-500
    },
    {
      id: "prod-4",
      name: "Sugar",
      value: 450,
      color: "#9333ea", // Purple-600
    },
  ];

  const productSuggestion: AiSuggestion = {
    id: "sugg-1",
    summary: "Analisis Tren: Permintaan 'Kopi Gula Aren' meningkat 40%.",
    details: [
      "Stok susu cair menipis, disarankan restock 20% lebih banyak.",
      "Kompetitor di area sekitar menurunkan harga sebesar Rp 2.000.",
      "Waktu terbaik untuk membuat promo flash sale adalah jam 13:00 - 15:00.",
    ],
    actionLabel: "Terapkan Strategi Ini",
  };

  return (
    <DashboardLayout>
      {/* Page Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Here is your analytics store details
          </p>
        </div>

        {/* AI Suggestion Notification */}
        <AiSuggestionCard
          suggestion={productSuggestion}
          onAccept={() => alert("Strategi diterapkan!")}
        />
      </div>

      {/* 1. Stat Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Revenue"
          value="$45,500"
          trend="10.5%"
          trendUp={true}
          icon={DollarSign}
          iconColorClass="text-orange-500"
          bgIconClass="bg-orange-50"
        />
        <StatCard
          title="Total Order"
          value="650"
          trend="15%"
          trendUp={true}
          icon={ShoppingBag}
          iconColorClass="text-blue-500"
          bgIconClass="bg-blue-50"
        />
        <StatCard
          title="Average Sale"
          value="$70"
          trend="3.5%"
          trendUp={true}
          icon={CreditCard}
          iconColorClass="text-cyan-500"
          bgIconClass="bg-cyan-50"
        />
        <StatCard
          title="Total Discount"
          value="$240"
          trend="2.5%"
          trendUp={false}
          icon={Package}
          iconColorClass="text-red-500"
          bgIconClass="bg-red-50"
        />
      </div>

      {/* 2. Charts Section Placeholder */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {/* CHART BESAR (Revenue Chart) */}
        <div className="md:col-span-2 min-h-200">
          {/* Panggil Komponen Chart Disini */}
          <RevenueChart />
        </div>

        {/* PIE CHART */}

        <SalesByCategoryChart data={mockBestSellers} />
      </div>

      {/* 3. Table Section Placeholder */}
    </DashboardLayout>
  );
}
