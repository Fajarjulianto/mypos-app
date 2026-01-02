import React from "react";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { formatRupiah } from "@/utils/format";

interface SummaryProps {
  moneyIn: number;
  moneyOut: number;
  pending: number;
}

export const MonthlySummary: React.FC<SummaryProps> = ({
  moneyIn,
  moneyOut,
  pending,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-full">
      <h3 className="text-lg font-bold text-gray-800 mb-6">This Month</h3>

      <div className="space-y-6">
        {/* Money In */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Money In</p>
            <p className="text-lg font-bold text-gray-800">
              {formatRupiah(moneyIn)}
            </p>
          </div>
        </div>

        {/* Money Out */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-100 rounded-full text-red-600">
            <TrendingDown size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Money Out</p>
            <p className="text-lg font-bold text-gray-800">
              {formatRupiah(moneyOut)}
            </p>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full" />

        {/* Pending */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-orange-100 rounded-full text-orange-600">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pending</p>
            <p className="text-lg font-bold text-gray-800">
              {formatRupiah(pending)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
