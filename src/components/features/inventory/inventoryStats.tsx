import React from "react";
import { Package, AlertTriangle, XCircle, TrendingUp } from "lucide-react";

export const InventoryStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Card 1: Total Products */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">
            Total Products
          </p>
          <h3 className="text-2xl font-bold text-gray-800">8</h3>
        </div>
        <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-primary">
          <Package className="h-5 w-5" />
        </div>
      </div>

      {/* Card 2: Low Stock */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Low Stock</p>
          <h3 className="text-2xl font-bold text-gray-800">2</h3>
        </div>
        <div className="h-10 w-10 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
      </div>

      {/* Card 3: Out of Stock */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Out of Stock</p>
          <h3 className="text-2xl font-bold text-gray-800">1</h3>
        </div>
        <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
          <XCircle className="h-5 w-5" />
        </div>
      </div>

      {/* Card 4: Total Value */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1">Total Value</p>
          <h3 className="text-2xl font-bold text-gray-800">$10,437.17</h3>
        </div>
        <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center text-primary">
          <TrendingUp className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};
