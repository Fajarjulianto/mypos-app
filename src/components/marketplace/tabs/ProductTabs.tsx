import React from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types/supplier";

interface ProductsTabProps {
  products: Product[];
}

export const ProductsTab = ({ products }: ProductsTabProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
        >
          {/* Image Placeholder */}
          <div className="h-48 bg-gray-100 flex items-center justify-center relative">
            <div className="text-gray-300">
              {/* Ganti dengan <Image /> jika ada url real */}
              <ShoppingCart size={40} opacity={0.2} />
            </div>
            <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
              <Heart size={18} />
            </button>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-12">
              {product.name}
            </h3>
            <div className="mb-4">
              <span className="text-xl font-bold text-green-600">
                ${product.price}
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Min. order: {product.minOrder} pcs
              </p>
            </div>
            <button className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
              <ShoppingCart size={16} />
              Order Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
