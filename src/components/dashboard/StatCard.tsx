import React from "react";
import { MoreVertical, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp?: boolean;
  icon: React.ElementType;
  iconColorClass: string; // e.g., "text-orange-500"
  bgIconClass: string; // e.g., "bg-orange-100"
}

export const StatCard = ({
  title,
  value,
  trend,
  trendUp = true,
  icon: Icon,
  iconColorClass,
  bgIconClass,
}: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center ${bgIconClass}`}
          >
            <Icon className={`h-6 w-6 ${iconColorClass}`} />
          </div>
          <span className="text-sm font-medium text-gray-500">{title}</span>
        </div>
        <button className="text-gray-300 hover:text-gray-600">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <div className="flex items-center gap-2 text-xs font-medium">
          <span
            className={`flex items-center gap-1 ${
              trendUp ? "text-green-500" : "text-red-500"
            }`}
          >
            {trendUp ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {trend}
          </span>
          <span className="text-gray-400">From last month</span>
        </div>
      </div>
    </div>
  );
};
