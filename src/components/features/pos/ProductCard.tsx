import { Package } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div
      onClick={() => onAddToCart(product)}
      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-primary/30 transition-all group"
    >
      {/* Image Placeholder */}
      <div className="w-full aspect-4/3 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/5 transition-colors">
        <Package className="h-10 w-10 text-gray-300 group-hover:text-primary transition-colors" />
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <h3 className="font-semibold text-gray-800 text-sm truncate">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          {/* Harga menggunakan warna Primary */}
          <span className="font-bold text-primary">
            ${product.price.toLocaleString()}
          </span>

          {/* Stock Badge */}
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
            {product.stock} left
          </span>
        </div>
      </div>
    </div>
  );
};
