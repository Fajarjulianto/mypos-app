import React from "react";
import { Package, Building2, Star, MessageSquare } from "lucide-react";

type TabType = "products" | "about" | "reviews" | "contact";

interface SupplierTabsProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

export const SupplierTabs = ({ activeTab, onChange }: SupplierTabsProps) => {
  const tabs = [
    { id: "products", label: "Products", icon: Package },
    { id: "about", label: "About", icon: Building2 },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "contact", label: "Contact", icon: MessageSquare },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 sticky top-0 z-10">
      <div className="flex overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id as TabType)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2
                ${
                  isActive
                    ? "border-green-600 text-green-700 bg-green-50/50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
