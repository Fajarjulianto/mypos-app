import {
  Heart,
  Star,
  MapPin,
  Truck,
  ShieldCheck,
  BadgeCheck,
  ShoppingCart,
  Image as ImageIcon,
} from "lucide-react";

interface Product {
  id: number;
  title: string;
  vendor: string;
  rating: number;
  reviews: number;
  location: string;
  deliveryTime: string;
  price: number;
  minOrder: number;
  unit: string;
  isEscrow: boolean;
}

export const SupplierCard = ({ product }: { product: Product }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-emerald-200 transition-all duration-300 flex flex-col h-full">
      {/* 1. Image Area */}
      <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        {/* Placeholder Icon (Ganti <img> jika ada gambar asli) */}
        <ImageIcon className="h-12 w-12 text-gray-300 group-hover:scale-110 transition-transform duration-500" />

        {/* Badge: Escrow Protected (Pojok Kiri Atas) */}
        {product.isEscrow && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <ShieldCheck className="h-3 w-3" />
            <span>Escrow Protected</span>
          </div>
        )}

        {/* Wishlist Button (Pojok Kanan Atas) */}
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* 2. Content Area */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">
          {product.title}
        </h3>

        {/* Vendor Info */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-sm text-blue-600 font-medium">
            {product.vendor}
          </span>
          <BadgeCheck className="h-3.5 w-3.5 text-blue-500 fill-blue-100" />
        </div>

        {/* Rating & Stats Grid */}
        <div className="flex flex-col gap-2 mb-4 text-xs text-gray-500">
          {/* Row 1: Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="h-3.5 w-3.5 fill-amber-500" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Row 2: Location & Delivery */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              <span className="truncate max-w-20">{product.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="h-3.5 w-3.5 text-gray-400" />
              <span>{product.deliveryTime}</span>
            </div>
          </div>
        </div>

        {/* Footer: Price & Action */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900">
              ${product.price.toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-400">
              Min. order: {product.minOrder} {product.unit}
            </div>
          </div>

          <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 shadow-sm shadow-emerald-200 transition-all active:scale-95">
            <ShoppingCart className="h-4 w-4" />
            Order
          </button>
        </div>
      </div>
    </div>
  );
};
