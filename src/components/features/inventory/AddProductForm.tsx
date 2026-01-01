import React, { useState, useRef } from "react";
import {
  ScanBarcode,
  UploadCloud,
  Sparkles,
  ChevronDown,
  Save,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";

interface AddProductFormProps {
  onClose: () => void;
}

export const AddProductForm = ({ onClose }: AddProductFormProps) => {
  const [formData, setFormData] = useState({
    sku: "",
    category: "",
    name: "",
    price: "",
    stock: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<
    { label: string; price: number; reason: string }[] | null
  >(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleScanBarcode = () => {
    const randomSku = "SKU-" + Math.floor(100000 + Math.random() * 900000);
    setFormData((prev) => ({ ...prev, sku: randomSku }));
  };

  const handleAskAI = () => {
    if (!formData.name) return alert("Isi nama produk dulu.");
    setIsAiLoading(true);
    setTimeout(() => {
      setIsAiLoading(false);
      setAiSuggestions([
        { label: "Kompetitif", price: 15000, reason: "Margin tipis" },
        { label: "Standar", price: 25000, reason: "Pasar rata-rata" },
        { label: "Premium", price: 45000, reason: "Brand eksklusif" },
      ]);
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah klik tembus ke container (agar tidak membuka file picker lagi)
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input file agar bisa upload file yang sama jika perlu
    }
  };

  return (
    // Tambahkan max-h-screen dan overflow agar bisa di-scroll jika layar kecil
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
        {/* Tombol Close X di pojok kanan atas */}
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content Scrollable */}
      <div className="p-8 overflow-y-auto custom-scrollbar">
        {/* ... (Isi Grid Input SAMA PERSIS seperti kode sebelumnya) ... */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Image) */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Gambar Produk (Opsional)
            </label>
            <div
              className={`relative w-full aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 cursor-pointer ${
                imagePreview
                  ? "border-blue-200 bg-blue-50/30"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <>
                  <Image
                    alt="image"
                    src={imagePreview}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    fill
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 p-2 bg-white hover:bg-red-50 text-red-500 rounded-full shadow-md hover:shadow-lg transition-all z-20 hover:scale-110 active:scale-95"
                    title="Hapus Gambar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <UploadCloud className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    Upload Gambar
                    <br />
                    (Max 3MB)
                  </p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Right Column (Inputs) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  SKU
                </label>
                <div className="relative">
                  <input
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none"
                    placeholder="Auto/Scan"
                  />
                  <button
                    onClick={handleScanBarcode}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                  >
                    <ScanBarcode className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Kategori
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none appearance-none"
                  >
                    <option>Pilih...</option>
                    <option>Makanan</option>
                    <option>Elektronik</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Nama Produk
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-xs font-bold text-gray-500 uppercase">
                  Harga
                </label>
                <button
                  onClick={handleAskAI}
                  className="text-[10px] flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold hover:bg-blue-100"
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
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-bold outline-none focus:border-blue-500"
                placeholder="Rp 0"
              />

              {aiSuggestions && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {aiSuggestions.map((s, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        setFormData({ ...formData, price: s.price.toString() })
                      }
                      className="border border-blue-100 bg-blue-50/50 p-2 rounded-lg cursor-pointer hover:bg-blue-100 text-center"
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

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Stok
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
        {/* Tombol Batal memanggil onClose */}
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
        >
          Batal
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Save className="h-4 w-4" />
          Simpan Produk
        </button>
      </div>
    </div>
  );
};
