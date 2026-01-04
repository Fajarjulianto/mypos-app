import React from "react";
import { Clock, ThumbsUp, Truck, Award } from "lucide-react";
import { SupplierStats } from "@/types/supplier";

// Sub-komponen kecil untuk Card (Internal use only)
interface StatItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

const StatItem = ({ icon, value, label }: StatItemProps) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-3 text-green-600 p-3 bg-green-50 rounded-full">
      {icon}
    </div>
    <div className="font-bold text-gray-900 text-xl mb-1">{value}</div>
    <div className="text-sm text-gray-500 font-medium">{label}</div>
  </div>
);

interface SupplierStatsGridProps {
  stats: SupplierStats;
}

export const SupplierStatsGrid = ({ stats }: SupplierStatsGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <StatItem
        icon={<Clock size={24} />}
        value={stats.responseTime}
        label="Response Time"
      />
      <StatItem
        icon={<ThumbsUp size={24} />}
        value={`${stats.responseRate}%`}
        label="Response Rate"
      />
      <StatItem
        icon={<Truck size={24} />}
        value={`${stats.onTimeDelivery}%`}
        label="On-Time Delivery"
      />
      <StatItem
        icon={<Award size={24} />}
        value={stats.certifications}
        label="Certifications"
      />
    </div>
  );
};
