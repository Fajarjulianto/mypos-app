import {
  Search,
  Plus,
  User,
  MoreHorizontal,
  Mail,
  Phone,
  Crown,
  History,
  Filter,
} from "lucide-react";
import { useCustomerStore } from "@/stores/useCustomerStore";

// Import komponen yang sudah Anda punya
import { AiSuggestionCard } from "@/components/ui/AiSuggestionCard";
import { AiSuggestion } from "@/types/ai";

export default function CustomerPage() {
  const { customers, searchQuery, setSearchQuery, getFilteredCustomers } =
    useCustomerStore();

  const filteredData = getFilteredCustomers();

  // Helper: Format Rupiah
  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);

  // Mock AI Data untuk Customer
  const customerAiSuggestion: AiSuggestion = {
    id: "ai-cust-1",
    summary: "Peluang Retensi: 5 Pelanggan Gold jarang berkunjung.",
    details: [
      "Budi Santoso & 4 lainnya belum belanja > 30 hari.",
      "Saran: Kirim voucher diskon 10% via WhatsApp.",
      "Potensi pendapatan kembali: Rp 2.500.000.",
    ],
    actionLabel: "Buat Broadcast WhatsApp",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* 1. Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pelanggan</h1>
          <p className="text-gray-500">
            Kelola data pelanggan dan membership loyalty.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
          <Plus size={20} /> Tambah Pelanggan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* 2. Stats Cards (Kiri) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card Total */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
              <User size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Pelanggan</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {customers.length}
              </h3>
            </div>
          </div>

          {/* Card Active Members */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-4 bg-yellow-50 text-yellow-600 rounded-xl">
              <Crown size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Aktif</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {customers.filter((c) => c.status === "ACTIVE").length}
              </h3>
            </div>
          </div>
        </div>

        {/* 3. AI Suggestion (Kanan) */}
        <div className="lg:col-span-1">
          <AiSuggestionCard
            suggestion={customerAiSuggestion}
            onAccept={() => alert("Membuka menu broadcast...")}
          />
        </div>
      </div>

      {/* 4. Filter & Table Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari nama, email, atau no. hp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">
            <Filter size={18} /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Nama Pelanggan
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Membership
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Total Belanja
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Kunjungan Terakhir
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700 text-center">
                  Status
                </th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-green-50/30 transition-colors group"
                  >
                    {/* Column: Identity */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {customer.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Mail size={12} /> {customer.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Phone size={12} /> {customer.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column: Membership */}
                    <td className="px-6 py-4">
                      <p className="text-xs text-gray-500 mt-1.5 font-medium">
                        {customer.points} Poin
                      </p>
                    </td>

                    {/* Column: Spending */}
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">
                        {formatRupiah(customer.totalSpent)}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {customer.totalTransactions} Transaksi
                      </p>
                    </td>

                    {/* Column: Last Visit */}
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <History size={16} className="text-gray-400" />
                        {new Date(customer.lastVisit).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </div>
                    </td>

                    {/* Column: Status */}
                    <td className="px-6 py-4 text-center">
                      <div
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          customer.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {customer.status === "ACTIVE" ? "Aktif" : "Non-Aktif"}
                      </div>
                    </td>

                    {/* Column: Actions */}
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Tidak ada pelanggan ditemukan dengan kata kunci &quot;
                    {searchQuery}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (Static Mock) */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50 text-sm text-gray-500">
          <span>Menampilkan 1-3 dari {customers.length} data</span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 border rounded bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
