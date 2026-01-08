import React, { useState, useEffect } from "react";
import { X, User, Mail, Phone, Check } from "lucide-react";
import { useCustomerStore } from "@/stores/useCustomerStore";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Initial State kosong
const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
};

export const AddCustomerModal = ({
  isOpen,
  onClose,
}: AddCustomerModalProps) => {
  const { addCustomer } = useCustomerStore();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form saat modal dibuka/ditutup
  useEffect(() => {}, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulasi delay network sebentar
    setTimeout(() => {
      addCustomer({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        // Default values untuk customer baru
        totalSpent: 0,
        totalTransactions: 0,
        points: 0,
        lastVisit: new Date().toISOString(),
        status: "ACTIVE",
      });

      setIsSubmitting(false);
      onClose(); // Tutup modal
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* --- Header --- */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900">Tambah Pelanggan</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* --- Body (Form) --- */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form
            id="add-customer-form"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Contoh: Dimas Anggara"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>

              {/* No HP */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">
                  No. WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="0812..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* --- Footer (Actions) --- */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-white hover:border-gray-400 transition-colors"
          >
            Batal
          </button>
          <button
            form="add-customer-form"
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 px-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              "Menyimpan..."
            ) : (
              <>
                <Check size={20} /> Simpan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
