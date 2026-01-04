import DashboardLayout from "@/components/layout/DashboardLayout";
import { InventoryStats } from "@/components/features/inventory/inventoryStats";
import { InventoryTable } from "@/components/features/inventory/inventoryTable";
import { Plus, Sparkles } from "lucide-react";
import { AddProductForm } from "@/components/features/inventory/AddProductForm";
import { useState } from "react";
import { AiScanModal } from "@/components/features/inventory/AiScanModal";
import { useScanStore } from "@/stores/useScanStore";
import { toast } from "sonner";
import { useInventoryStore } from "@/stores/useAiInventoryStore";
import { ScannedItem } from "@/types/aiScanService";

export default function InventoryPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openScanModal = useScanStore((state) => state.openModal);
  const { addBatchFromScan } = useInventoryStore();

  const handleScanSave = (scannedItems: ScannedItem[]) => {
    if (scannedItems.length === 0) return;

    addBatchFromScan(scannedItems);

    toast.success("Inventory Updated!", {
      description: `${scannedItems.length} jenis barang telah diproses.`,
    });
  };

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
          <button
            onClick={openScanModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-primary text-primary rounded-xl text-sm font-semibold hover:bg-primary/5 transition-all shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI Scan</span>
          </button>

          {/* Add Product Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
          >
            <Plus className="h-5 w-5" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <InventoryStats />
      {/*  Main Table */}
      <InventoryTable />

      <AiScanModal onSave={handleScanSave} />

      {isAddModalOpen && (
        // Overlay Gelap (Backdrop)
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in">
          {/* Area luar untuk klik-tutup (Opsional) */}
          <div
            className="absolute inset-0"
            onClick={() => setIsAddModalOpen(false)}
          />

          {/* Form Container (z-10 agar di atas backdrop) */}
          <div className="relative z-10 w-full max-w-4xl animate-in zoom-in-95 duration-200">
            {/* Pass fungsi tutup ke komponen form */}
            <AddProductForm onClose={() => setIsAddModalOpen(false)} />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
