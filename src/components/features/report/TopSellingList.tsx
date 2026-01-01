import { TrendingUp } from "lucide-react";

// Definisi Tipe Data yang Ketat
export interface TopProduct {
  id: number;
  rank: number;
  name: string;
  unitsSold: number;
  revenue: number;
}

interface TopSellingListProps {
  products: TopProduct[];
}

export const TopSellingList = ({ products }: TopSellingListProps) => {
  // Helper Format Uang
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(val);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-50 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-green-600" />
        <h3 className="font-bold text-gray-900">Top Selling Products</h3>
      </div>

      {/* List Content */}
      <div className="p-2">
        {products.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {/* Left: Rank & Info */}
            <div className="flex items-center gap-4">
              {/* Rank Number */}
              <div
                className={`
                w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold
                ${
                  item.rank <= 3
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                }
              `}
              >
                #{item.rank}
              </div>

              {/* Product Details */}
              <div>
                <p className="font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  <span className="font-medium text-gray-700">
                    {item.unitsSold}
                  </span>{" "}
                  units sold
                </p>
              </div>
            </div>

            {/* Right: Revenue */}
            <div className="text-right">
              <p className="font-bold text-green-600 text-base">
                {formatCurrency(item.revenue)}
              </p>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                Revenue
              </p>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            No data available for the selected period.
          </div>
        )}
      </div>
    </div>
  );
};
