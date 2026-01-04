import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import {
  Search,
  Filter,
  Download,
  Edit3,
  Trash2,
  Loader2,
  Plus,
} from "lucide-react";
import React, { useEffect } from "react";
import { useInventoryStore } from "@/stores/useInventoryStore";
// Data Dummy
const products = [
  {
    id: 1,
    sku: "WM-001",
    name: "Wireless Mouse",
    category: "Electronics",
    stock: 45,
    maxStock: 20,
    price: 29.99,
    status: "In Stock",
  },
  {
    id: 2,
    sku: "UC-002",
    name: "USB-C Cable",
    category: "Accessories",
    stock: 120,
    maxStock: 50,
    price: 12.99,
    status: "In Stock",
  },
  {
    id: 3,
    sku: "LS-003",
    name: "Laptop Stand",
    category: "Electronics",
    stock: 23,
    maxStock: 15,
    price: 49.99,
    status: "In Stock",
  },
  {
    id: 4,
    sku: "WC-004",
    name: "Webcam HD",
    category: "Electronics",
    stock: 5,
    maxStock: 15,
    price: 79.99,
    status: "Low Stock",
  },
];

export const InventoryTable = () => {
  const { items, isLoading, error, fetchInventory } = useInventoryStore();

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);
  return (
    <>
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
          <p className="text-gray-500">Memuat data...</p>
        </div>
      )}

      {!isLoading && error && (
        <ErrorState message={error} onRetry={fetchInventory} />
      )}

      {!isLoading && !error && items.length === 0 && (
        <EmptyState
          title="Inventory Kosong"
          description="Belum ada produk yang tercatat di sistem."
          action={
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-700">
              <Plus className="h-4 w-4" /> Tambah Produk
            </button>
          }
        />
      )}

      {!isLoading && !error && items.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header Tabel: Search & Filter */}
          <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-gray-800 text-lg">All Products</h3>

            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full sm:w-64"
                />
              </div>

              {/* Filter Button */}
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                <Filter className="h-4 w-4" />
              </button>

              {/* Download Button */}
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">SKU</th>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <span className="font-medium text-gray-900">
                        {product.stock}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {" "}
                        / {product.maxStock}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-800">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold
                    ${
                      product.status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : ""
                    }
                    ${
                      product.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : ""
                    }
                    ${
                      product.status === "Out of Stock"
                        ? "bg-red-100 text-red-700"
                        : ""
                    }
                  `}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (Optional/Visual) */}
          <div className="p-4 border-t border-gray-100 flex justify-center">
            <p className="text-xs text-gray-400">Showing 4 of 8 products</p>
          </div>
        </div>
      )}
    </>
  );
};
