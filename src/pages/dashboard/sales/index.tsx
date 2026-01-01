import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ProductCard } from "@/components/features/pos/ProductCard";
import { CartSection } from "@/components/features/pos/CartSection";
import { Search } from "lucide-react";
import { CheckoutModal } from "@/components/features/pos/CheckoutModal";
import { PaymentSuccessModal } from "@/components/features/pos/PaymentSuccesModal";
import type {
  PaymentResult,
  TransactionRecord,
  TransactionItem,
} from "@/types/sales";
// Dummy Data Produk
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

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [lastTransaction, setLastTransaction] =
    useState<TransactionRecord | null>(null);

  const calculateTotal = (): number => {
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  };
  const handlePaymentSuccess = (result: PaymentResult) => {
    // Buat object TransactionRecord lengkap
    const transactionItems: TransactionItem[] = cart.map((item) => ({
      name: item.name,
      qty: item.qty,
      price: item.price,
      total: item.price * item.qty,
      unit: "pcs",
    }));

    const newTransaction: TransactionRecord = {
      ...result,
      id: `TRX-${Date.now()}`,
      total: calculateTotal(),
      date: new Date(),
      items: transactionItems,
    };

    // Simpan ke state
    setLastTransaction(newTransaction);

    // Atur visibilitas modal
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const handleNewOrder = () => {
    setIsSuccessOpen(false);
    setLastTransaction(null);
    setCart([]);
  };
  // Filter Produk
  const filteredProducts = dummyProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic: Tambah ke Cart
  const handleAddToCart = (product: (typeof dummyProducts)[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, qty: 1 },
      ];
    });
  };

  // Logic: Update Quantity
  const handleUpdateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, qty: Math.max(1, item.qty + delta) };
        }
        return item;
      })
    );
  };

  // Logic: Hapus Item
  const handleRemoveItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

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
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto pr-2 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
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

        {/* RIGHT SIDE: Cart (Fixed Width on Large Screens) */}
        <div className="w-full lg:w-95 shrink-0 h-full">
          <CartSection
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemove={handleRemoveItem}
            onCheckout={() => setIsCheckoutOpen(true)}
          />
        </div>
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          totalAmount={calculateTotal()}
          onSuccess={handlePaymentSuccess}
        />
        <PaymentSuccessModal
          isOpen={isSuccessOpen}
          onClose={handleNewOrder}
          transactionData={lastTransaction}
        />
      </div>
    </DashboardLayout>
  );
}
