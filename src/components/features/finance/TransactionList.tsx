import React from "react";
import { Transaction } from "@/types/finance";
import {
  Search,
  Download,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { formatRupiah } from "@/utils/format";
import { format } from "date-fns";

interface TransactionListProps {
  transactions: Transaction[];
}

const getStatusBadge = (status: Transaction["status"]) => {
  switch (status) {
    case "COMPLETED":
      return (
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
          Completed
        </span>
      );
    case "PENDING":
      return (
        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
          Pending
        </span>
      );
    case "FAILED":
      return (
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
          Failed
        </span>
      );
    default:
      return null;
  }
};

const getIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "DEPOSIT":
      return (
        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
          <ArrowDownLeft size={20} />
        </div>
      );
    case "WITHDRAWAL":
      return (
        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
          <ArrowUpRight size={20} />
        </div>
      );
  }
};

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-blue-600">
            <Clock size={24} />
          </span>
          Transaction History
        </h3>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium">
            Filter
          </button>
          <button className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {transactions.map((trx) => (
          <div
            key={trx.id}
            className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {getIcon(trx.type)}
              <div>
                <p className="font-bold text-gray-800">{trx.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(trx.date), "dd MMM yyyy 'at' hh:mm a")}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-6 mt-4 sm:mt-0">
              <div className="text-right">
                <p
                  className={`font-bold ${
                    trx.type === "WITHDRAWAL"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {trx.type === "WITHDRAWAL" ? "-" : "+"}{" "}
                  {formatRupiah(trx.amount)}
                </p>
              </div>
              <div className="min-w-25 text-right">
                {getStatusBadge(trx.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
