import React from "react";
import { Trash2, ShoppingCart, Plus, Minus } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface CartSectionProps {
  cart: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export const CartSection = ({
  cart,
  onUpdateQty,
  onRemove,
  onCheckout,
}: CartSectionProps) => {
  // Kalkulasi Total
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.08; // Pajak 8% sesuai foto
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      {/* Header Cart */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-gray-800 text-lg">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h3>Current Order</h3>
        </div>
        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-md">
          {cart.length} Items
        </span>
      </div>

      {/* Cart Items List (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm space-y-2">
            <ShoppingCart className="h-10 w-10 opacity-20" />
            <p>No items selected</p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    ${item.price} each
                  </p>
                </div>
                {/* Qty Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="p-1 hover:bg-white rounded-md transition-shadow shadow-sm disabled:opacity-50"
                      disabled={item.qty <= 1}
                    >
                      <Minus className="h-3 w-3 text-gray-600" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="p-1 hover:bg-white rounded-md transition-shadow shadow-sm"
                    >
                      <Plus className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Footer */}
      <div className="p-5 bg-gray-50 rounded-b-2xl border-t border-gray-100">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>
              $
              {subtotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tax (8%)</span>
            <span>
              $
              {tax.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-800 mt-2 pt-2 border-t border-gray-200 border-dashed">
            <span>Total</span>
            <span className="text-primary">
              $
              {total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          disabled={cart.length === 0}
          className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};
