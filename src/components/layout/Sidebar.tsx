import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Wallet,
  BarChart3,
  Settings,
  Package2,
  X,
  LogOut, // Import Icon Logout
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingCart, label: "Sales", href: "/dashboard/sales" },
  { icon: Package, label: "Inventory", href: "/dashboard/inventory" },
  { icon: Wallet, label: "Keuangan", href: "/dashboard/finance" },
  { icon: BarChart3, label: "Laporan", href: "/dashboard/reports" },
];

interface SidebarProps {
  isMobileOpen: boolean;
  toggleMobile: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export const Sidebar = ({
  isMobileOpen,
  toggleMobile,
  isCollapsed,
}: SidebarProps) => {
  const router = useRouter();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-100 transition-all duration-300 ease-in-out flex flex-col
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static 
        ${isCollapsed ? "md:w-20" : "md:w-64"} 
      `}
      >
        {/* HEADER: Logo */}
        <div
          className={`flex items-center h-16 px-4 border-b border-gray-50 shrink-0 ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-3 font-bold text-gray-800 overflow-hidden"
          >
            <div className="shrink-0 h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <Package2 className="h-5 w-5" />
            </div>

            <span
              className={`text-lg tracking-tight whitespace-nowrap transition-all duration-300 ${
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              MYPOS
            </span>
          </Link>
          <button
            onClick={toggleMobile}
            className="md:hidden ml-auto text-gray-400"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* MENU ITEMS (Scrollable) */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {sidebarItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                    flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative
                    ${isCollapsed ? "justify-center" : ""} 
                    ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/25"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                title={isCollapsed ? item.label : ""}
              >
                <item.icon
                  className={`h-5 w-5 shrink-0 transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />

                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER: Settings & Logout */}
        <div className="p-3 border-t border-gray-50 space-y-1.5 shrink-0">
          {/* Settings */}
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all ${
              isCollapsed ? "justify-center" : ""
            }`}
            title="Settings"
          >
            <Settings className="h-5 w-5 text-gray-400 shrink-0" />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              Settings
            </span>
          </Link>

          {/* LOGOUT BUTTON - Sekarang rapi mengikuti lebar sidebar */}
          <button
            onClick={() => router.push("/login")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all ${
              isCollapsed ? "justify-center" : ""
            }`}
            title="Logout"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span
              className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
