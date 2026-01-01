import React, { useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SupplierCard } from "@/components/marketplace/SupplierCard";
import { Search, Filter, ChevronDown } from "lucide-react";

// 1. Update Data Dummy dengan Field 'category'
const dummyProducts = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    vendor: "TechAudio Pro",
    category: "Electronics",
    rating: 4.8,
    reviews: 234,
    location: "Shenzhen, China",
    deliveryTime: "3-5 days",
    price: 149.99,
    minOrder: 10,
    unit: "pcs",
    isEscrow: true,
  },
  {
    id: 2,
    title: "Organic Cotton T-Shirts (Pack of 50)",
    vendor: "GreenWear Co",
    category: "Apparel",
    rating: 4.6,
    reviews: 189,
    location: "Mumbai, India",
    deliveryTime: "5-7 days",
    price: 299.99,
    minOrder: 50,
    unit: "pcs",
    isEscrow: true,
  },
  {
    id: 3,
    title: "Smart Watch Series 5 Clone",
    vendor: "Gadget Hub",
    category: "Electronics",
    rating: 4.2,
    reviews: 56,
    location: "Guangzhou, China",
    deliveryTime: "7-10 days",
    price: 45.0,
    minOrder: 20,
    unit: "pcs",
    isEscrow: true,
  },
  {
    id: 4,
    title: "Leather Wallet Handmade",
    vendor: "Craftsmen ID",
    category: "Accessories",
    rating: 4.9,
    reviews: 12,
    location: "Bandung, Indonesia",
    deliveryTime: "2-3 days",
    price: 18.5,
    minOrder: 100,
    unit: "pcs",
    isEscrow: true,
  },
  {
    id: 5,
    title: "Coffee Beans Arabica 1kg",
    vendor: "Java Coffee",
    category: "Food & Beverage",
    rating: 4.7,
    reviews: 340,
    location: "Semarang, Indonesia",
    deliveryTime: "1-2 days",
    price: 12.0,
    minOrder: 50,
    unit: "kg",
    isEscrow: true,
  },
  {
    id: 6,
    title: "Mechanical Keyboard Switches",
    vendor: "KeyMaster",
    category: "Electronics",
    rating: 4.5,
    reviews: 88,
    location: "Seoul, Korea",
    deliveryTime: "5-9 days",
    price: 0.35,
    minOrder: 1000,
    unit: "pcs",
    isEscrow: true,
  },
];

// List Kategori Unik untuk Dropdown
const categories = [
  "All Categories",
  "Electronics",
  "Apparel",
  "Accessories",
  "Food & Beverage",
];

export default function MarketplacePage() {
  // 2. Setup State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("popular"); // 'popular', 'price_low', 'price_high', 'rating'

  // 3. Logika Filtering & Sorting (Menggunakan useMemo agar efisien)
  const filteredProducts = useMemo(() => {
    return dummyProducts
      .filter((product) => {
        // Filter Pencarian (Nama Produk atau Vendor)
        const matchSearch =
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.vendor.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter Kategori
        const matchCategory =
          selectedCategory === "All Categories" ||
          product.category === selectedCategory;

        return matchSearch && matchCategory;
      })
      .sort((a, b) => {
        // Logika Sorting
        switch (sortBy) {
          case "price_low":
            return a.price - b.price;
          case "price_high":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "popular":
          default:
            return b.reviews - a.reviews; // Default: Paling banyak review
        }
      });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Supplier Marketplace
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Browse verified suppliers with escrow protection
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-2 mb-8">
        {/* SEARCH INPUT */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products or suppliers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-lg bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-emerald-100 transition-all hover:bg-gray-100"
          />
        </div>

        {/* CONTROLS (Dropdowns) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* CATEGORY DROPDOWN */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-11 pl-4 pr-10 appearance-none bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer outline-none focus:border-emerald-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* SORT DROPDOWN */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 pl-4 pr-10 appearance-none bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer outline-none focus:border-emerald-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* FILTER BUTTON (Visual Only for now) */}
          <button className="h-11 px-4 flex items-center gap-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* PRODUCT GRID - Render hasil filter */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <SupplierCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        // Empty State jika tidak ada hasil
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            No products found
          </h3>
          <p className="text-gray-500 max-w-sm mt-1">
            We couldn&apos;t find any products matching &quot;{searchTerm}&quot;
            in {selectedCategory}.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All Categories");
            }}
            className="mt-4 text-emerald-600 font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}
