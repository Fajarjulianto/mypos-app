import React, { useState } from "react";
import { Calendar, Search, Download, FileText } from "lucide-react";

interface SalesFilterProps {
  onSearch: (startDate: string, endDate: string) => void;
  onExport: () => void;
}

export const SalesFilter = ({ onSearch, onExport }: SalesFilterProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
      {/* Header Title */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-green-50 rounded-lg text-blue-600">
          <FileText className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Sales Report</h2>
      </div>

      {/* Filter Inputs Grid */}
      <div className="flex flex-col lg:flex-row items-end gap-4">
        {/* Start Date */}
        <div className="w-full lg:flex-1">
          <label className="block text-xs font-semibold text-gray-500 mb-2">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* End Date */}
        <div className="w-full lg:flex-1">
          <label className="block text-xs font-semibold text-gray-500 mb-2">
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 w-full lg:w-auto mt-4 lg:mt-0">
          <button
            onClick={() => onSearch(startDate, endDate)}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-green-600/20 active:scale-95"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>

          <button
            onClick={onExport}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all active:scale-95"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};
