import React from "react";
import { LucideIcon, PackageOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  fullHeight?: boolean;
}

export const EmptyState = ({
  title = "No Data Available",
  description = "We couldn't find any data to display here.",
  icon: Icon = PackageOpen, // Default icon
  action,
  fullHeight = false,
}: EmptyStateProps) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border-2 border-dashed border-gray-100
        ${fullHeight ? "h-full min-h-100" : "py-12"}
      `}
    >
      {/* Icon Wrapper with Soft Background */}
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>

      {/* Text Content */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
        {description}
      </p>

      {/* Optional Action Button */}
      {action && (
        <div className="mt-2 animate-in zoom-in-95 duration-300">{action}</div>
      )}
    </div>
  );
};
