import React from "react";
import {
  Menu,
  // Search,
  Bell,
  AlignJustify,
} from "lucide-react";

interface HeaderProps {
  toggleMobile: () => void;
  toggleCollapse: () => void;
  isCollapsed: boolean;
}

export const Header = ({
  toggleMobile,
  toggleCollapse,
  isCollapsed,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between bg-white/80 px-4 backdrop-blur-md border-b border-gray-100/50">
      {/* Left Section: Toggle Buttons & Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Tombol Mobile (Hamburger) */}
        <button
          onClick={toggleMobile}
          className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Tombol Desktop (Collapse Sidebar) - INI YANG BARU */}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex p-2 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {/* Ikon berubah sesuai state */}
          {isCollapsed ? (
            <AlignJustify className="h-5 w-5" />
          ) : (
            <AlignJustify className="h-5 w-5" />
          )}
        </button>

        {/* Search Bar */}
        {/* <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all border border-transparent focus:border-primary/20"
          />
        </div> */}
      </div>

      {/* Right Section (Sama seperti sebelumnya) */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-3 pl-2 cursor-pointer border-l border-gray-100">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-700">Kang Roy</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
            {/* <img src="https://github.com/shadcn.png" alt="User" className="h-full w-full object-cover" /> */}
          </div>
        </div>
      </div>
    </header>
  );
};
