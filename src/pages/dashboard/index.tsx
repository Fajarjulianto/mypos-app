import { RevenueChart } from "@/components/dashboard/revenueChart";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign, ShoppingBag, CreditCard, Package } from "lucide-react";

export default function DashboardPage() {
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

        {/* Custom Date Picker (Visual Only) */}
        <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
          <span>Nov 19, 2023 - Nov 26, 2023</span>
        </button>
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

        {/* CHART KECIL (Payment Method - Placeholder) */}
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm min-h-200">
          <h3 className="font-bold text-gray-900 mb-4">Payment Method</h3>
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            [Area untuk Grafik Donat]
          </div>
        </div>
      </div>

      {/* 3. Table Section Placeholder */}
    </DashboardLayout>
  );
}
