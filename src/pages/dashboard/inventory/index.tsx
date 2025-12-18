import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { InventoryStats } from "@/components/features/inventory/inventoryStats";
import { InventoryTable } from "@/components/features/inventory/inventoryTable";
import { Plus, Sparkles } from "lucide-react";

export default function InventoryPage() {
  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track and manage your stock
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* AI Scan Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-primary text-primary rounded-xl text-sm font-semibold hover:bg-primary/5 transition-all shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>AI Scan</span>
          </button>

          {/* Add Product Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30">
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* 1. Stats Cards */}
      <InventoryStats />

      {/* 2. Main Table */}
      <InventoryTable />
    </DashboardLayout>
  );
}
