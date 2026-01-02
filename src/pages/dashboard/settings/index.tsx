import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { StoreProfileForm } from "@/components/features/settings/storeProfileForm";
import { NotificationSettings } from "@/components/features/settings/NotificationSetting";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
            <Settings className="h-6 w-6 text-gray-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500">
              Manage your store preferences.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          {/* Left Column: Store Profile (Lebih Lebar) */}
          <div className="xl:col-span-2">
            <StoreProfileForm />
          </div>

          {/* Right Column: Notifications (Lebih Sempit) */}
          <div className="xl:col-span-1">
            <NotificationSettings />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
