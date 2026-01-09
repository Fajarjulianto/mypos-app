import React, { useRef, useEffect } from "react";
import {
  ScanBarcode,
  UploadCloud,
  Sparkles,
  ChevronDown,
  Save,
  Trash2,
  X,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useProductFormStore } from "@/stores/useProductFormStore"; // Import Store

interface AddProductFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddProductForm = ({ onClose, onSuccess }: AddProductFormProps) => {
  // 1. Panggil semua state & action dari Store
  const {
    formData,
    imagePreview,
    isSubmitting,
    isAiLoading,
    aiSuggestions,
    setField,
    setPrice,
    setImage,
    removeImage,
    generateRandomSku,
    fetchAiSuggestions,
    submitProduct,
    resetForm,
  } = useProductFormStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form saat modal pertama kali dibuka (Mount)
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  // Handler UI Helper
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const onRemoveImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeImage();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmitClick = async () => {
    const success = await submitProduct();
    if (success) {
      alert("Produk berhasil ditambahkan!");
      if (onSuccess) onSuccess();
      onClose();
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Tambah Produk Baru
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Lengkapi informasi produk untuk inventaris.
          </p>
        </div>
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-8 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Image Upload Section --- */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Gambar Produk
            </label>
            <div
              className={`relative w-full aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 cursor-pointer transition-colors ${
                imagePreview
                  ? "border-blue-200 bg-blue-50/30"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              onClick={() => !isSubmitting && fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <>
                  <Image
                    alt="preview"
                    src={imagePreview}
                    fill
                    className="object-cover rounded-2xl"
                  />
                  <button
                    onClick={onRemoveImageClick}
                    disabled={isSubmitting}
                    className="absolute top-3 right-3 p-2 bg-white hover:bg-red-50 text-red-500 rounded-full shadow-md z-20 hover:scale-110 active:scale-95 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <UploadCloud className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    Upload Gambar <br /> (Max 3MB)
                  </p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={onFileChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* --- Form Inputs Section --- */}
          <div className="lg:col-span-2 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {/* SKU */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  SKU
                </label>
                <div className="relative">
                  <input
                    value={formData.sku}
                    onChange={(e) => setField("sku", e.target.value)}
                    disabled={isSubmitting}
                    className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none"
                    placeholder="Auto/Scan"
                  />
                  <button
                    onClick={generateRandomSku}
                    disabled={isSubmitting}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 disabled:opacity-50"
                  >
                    <ScanBarcode className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Kategori
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) => setField("category", e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none appearance-none"
                  >
                    <option value="">Pilih...</option>
                    <option value="Makanan">Makanan</option>
                    <option value="Elektronik">Elektronik</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Nama Produk
              </label>
              <input
                value={formData.name}
                onChange={(e) => setField("name", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Price & AI */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-xs font-bold text-gray-500 uppercase">
                  Harga
                </label>
                <button
                  onClick={fetchAiSuggestions}
                  disabled={isSubmitting || isAiLoading}
                  className="text-[10px] flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold hover:bg-blue-100 disabled:opacity-50"
                >
                  {isAiLoading ? (
                    "..."
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3" /> AI Saran
                    </>
                  )}
                </button>
              </div>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setField("price", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-bold outline-none focus:border-blue-500"
                placeholder="Rp 0"
              />

              {/* AI Suggestions List */}
              {aiSuggestions && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {aiSuggestions.map((s, i) => (
                    <div
                      key={i}
                      onClick={() => !isSubmitting && setPrice(s.price)}
                      className="border border-blue-100 bg-blue-50/50 p-2 rounded-lg cursor-pointer hover:bg-blue-100 text-center transition-colors"
                    >
                      <p className="text-[9px] font-bold text-blue-500 uppercase">
                        {s.label}
                      </p>
                      <p className="text-xs font-bold">
                        {s.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Stok
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setField("stock", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Batal
        </button>
        <button
          onClick={onSubmitClick}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Menyimpan...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Simpan Produk
            </>
          )}
        </button>
      </div>
    </div>
  );
};
