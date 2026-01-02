import React, { useState } from "react";
import { Bell } from "lucide-react";

interface ToggleItemProps {
  label: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
}

const ToggleItem = ({
  label,
  description,
  isEnabled,
  onToggle,
}: ToggleItemProps) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 px-4 -mx-4 transition-colors rounded-lg">
      <div>
        <h4 className="text-sm font-bold text-gray-800">{label}</h4>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>

      {/* Custom Toggle Switch */}
      <button
        onClick={onToggle}
        className={`
          relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/30
          ${isEnabled ? "bg-blue-600" : "bg-gray-200"}
        `}
      >
        <div
          className={`
            absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300
            ${isEnabled ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
};

export const NotificationSettings = () => {
  // State untuk setiap opsi toggle
  const [settings, setSettings] = useState({
    emailNotif: true,
    pushNotif: true,
    salesAlert: true,
    lowStock: true,
    dailyReport: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <Bell className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Notifications</h3>
          <p className="text-xs text-gray-500">
            Configure how you receive alerts.
          </p>
        </div>
      </div>

      {/* Toggle List */}
      <div className="p-6">
        <ToggleItem
          label="Email Notifications"
          description="Receive updates via email"
          isEnabled={settings.emailNotif}
          onToggle={() => toggle("emailNotif")}
        />
        <ToggleItem
          label="Push Notifications"
          description="Browser push notifications"
          isEnabled={settings.pushNotif}
          onToggle={() => toggle("pushNotif")}
        />
        <ToggleItem
          label="Sales Alerts"
          description="Get notified for new sales"
          isEnabled={settings.salesAlert}
          onToggle={() => toggle("salesAlert")}
        />
        <ToggleItem
          label="Low Stock Alerts"
          description="Alert when inventory is low"
          isEnabled={settings.lowStock}
          onToggle={() => toggle("lowStock")}
        />
        <ToggleItem
          label="Daily Reports"
          description="Receive daily summary reports"
          isEnabled={settings.dailyReport}
          onToggle={() => toggle("dailyReport")}
        />
      </div>
    </div>
  );
};
