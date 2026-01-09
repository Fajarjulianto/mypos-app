import DashboardLayout from "@/components/layout/DashboardLayout";
import { ProductCard } from "@/components/features/pos/ProductCard";
import { CartSection } from "@/components/features/pos/CartSection";
import { Search } from "lucide-react";
import { CheckoutModal } from "@/components/features/pos/CheckoutModal";
import { PaymentSuccessModal } from "@/components/features/pos/PaymentSuccesModal";
import { usePosStore } from "@/stores/usePosStore";

// Dummy Data Produk (
const dummyProducts = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 29.99,
    stock: 45,
    category: "Electronics",
  },
  {
    id: 2,
    name: "USB-C Cable",
    price: 12.99,
    stock: 120,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    stock: 23,
    category: "Accessories",
  },
  {
    id: 4,
    name: "Webcam HD",
    price: 79.99,
    stock: 15,
    category: "Electronics",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 89.99,
    stock: 30,
    category: "Electronics",
  },
  {
    id: 6,
    name: 'Monitor 27"',
    price: 299.99,
    stock: 8,
    category: "Electronics",
  },
  { id: 7, name: "Headphones", price: 59.99, stock: 52, category: "Audio" },
  {
    id: 8,
    name: "Mouse Pad XL",
    price: 19.99,
    stock: 78,
    category: "Accessories",
  },
];

export default function SalesPage() {
  const {
    searchTerm,
    setSearchTerm,
    cart,
    isCheckoutOpen,
    setCheckoutOpen,
    isSuccessOpen,
    lastTransaction,
    addToCart,
    updateQty,
    removeItem,
    calculateTotal,
    processPaymentSuccess,
    resetNewOrder,
  } = usePosStore();

  const filteredProducts = dummyProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] overflow-hidden">
        {/* LEFT SIDE: Product Catalog (Scrollable) */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Page Title & Search */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Point of Sale</h1>
            <p className="text-sm text-gray-500 mb-4">
              Create new transactions
            </p>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products or scan barcode"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Product Grid  */}
          <div className="flex-1 overflow-y-auto pr-2 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-400">
                  No products found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Cart  */}
        <div className="w-full lg:w-95 shrink-0 h-full">
          <CartSection
            cart={cart}
            onUpdateQty={updateQty}
            onRemove={removeItem}
            onCheckout={() => setCheckoutOpen(true)}
          />
        </div>

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setCheckoutOpen(false)}
          totalAmount={calculateTotal()}
          onSuccess={processPaymentSuccess}
        />

        <PaymentSuccessModal
          isOpen={isSuccessOpen}
          onClose={resetNewOrder}
          transactionData={lastTransaction}
        />
      </div>
    </DashboardLayout>
  );
}
