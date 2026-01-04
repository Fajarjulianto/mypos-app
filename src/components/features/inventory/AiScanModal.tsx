import React, { useRef } from "react";
import {
  Camera,
  X,
  Check,
  Plus,
  Trash2,
  ScanLine,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import { useScanStore } from "@/stores/useScanStore";
import { ScannedItem } from "@/types/aiScanService"; // Pastikan path import sesuai

interface AiScanModalProps {
  onSave: (items: ScannedItem[]) => void;
}

export const AiScanModal = ({ onSave }: AiScanModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isOpen,
    closeModal,
    imagePreview,
    items,
    isScanning,
    error,
    handleFileScan,
    resetScan,
    updateItem,
    deleteItem,
    addItem,
    getSummary,
  } = useScanStore();

  const summary = getSummary();

  const triggerCamera = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileScan(file);
  };

  const handleFinalSave = () => {
    onSave(items);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] md:h-[85vh]">
        {/* --- 1. HEADER (DIPERBAIKI: TOMBOL CLOSE ADA DISINI) --- */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-600/20">
              <ScanLine className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                AI Stock Scan
              </h2>
              <p className="text-sm text-gray-500">Inventory & Stock Opname</p>
            </div>
          </div>

          {/* Tombol Close */}
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Close Modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* --- 2. MAIN CONTENT --- */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Panel: Camera/Image */}
          <div
            className={`relative bg-gray-50 border-r transition-all duration-300 ${
              items.length > 0 || isScanning
                ? "lg:w-1/3 h-64 lg:h-full"
                : "w-full h-full flex flex-col justify-center"
            }`}
          >
            {imagePreview ? (
              <div className="relative w-full h-full group bg-slate-900 flex items-center justify-center">
                <Image
                  fill
                  src={imagePreview}
                  alt="Scan"
                  className="object-contain"
                />

                {/* Overlay saat scanning */}
                {isScanning && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10 text-white">
                    <Loader2 className="h-10 w-10 animate-spin mb-2" />
                    <span className="animate-pulse">Analyzing...</span>
                  </div>
                )}

                {/* Tombol Foto Ulang */}
                {!isScanning && (
                  <button
                    onClick={resetScan}
                    className="absolute bottom-6 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity transform hover:scale-105"
                  >
                    <RefreshCw className="h-4 w-4" /> Foto Ulang
                  </button>
                )}
              </div>
            ) : (
              // Tampilan Awal (Belum ada foto)
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 border-4 border-blue-100">
                  <Camera className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">
                  Mulai Scanning
                </h3>
                <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                  Ambil foto rak barang untuk menghitung stok otomatis.
                </p>
                <button
                  onClick={triggerCamera}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 active:scale-95"
                >
                  Buka Kamera
                </button>
              </div>
            )}

            {/* Hidden Input for File/Camera */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileChange}
              className="hidden"
              accept="image/*"
              capture="environment"
            />
          </div>

          {/* Right Panel: Results List */}
          {(items.length > 0 || error) && (
            <div className="flex-1 bg-white flex flex-col h-full animate-in slide-in-from-right duration-300">
              {error && (
                <div className="p-6 text-center h-full flex flex-col items-center justify-center">
                  <div className="bg-red-50 p-4 rounded-full mb-4 text-red-500">
                    <X className="h-8 w-8" />
                  </div>
                  <p className="text-red-500 font-medium">{error}</p>
                  <button
                    onClick={resetScan}
                    className="mt-4 text-gray-500 underline text-sm"
                  >
                    Coba lagi
                  </button>
                </div>
              )}

              {!isScanning && !error && (
                <>
                  <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <span className="font-bold text-gray-700">
                      Hasil Deteksi ({items.length})
                    </span>
                    <button
                      onClick={addItem}
                      className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" /> Manual
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:shadow-md hover:border-blue-200 transition-all bg-white group"
                      >
                        {/* Nama & Harga */}
                        <div className="flex-1">
                          <input
                            value={item.name}
                            onChange={(e) =>
                              updateItem(item.id, "name", e.target.value)
                            }
                            className="w-full font-bold text-gray-800 outline-none bg-transparent border-b border-transparent focus:border-blue-300 transition-colors pb-0.5"
                            placeholder="Nama Barang..."
                          />
                          <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            Rp
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "price",
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-20 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-300 outline-none"
                            />
                          </div>
                        </div>

                        {/* Qty Input */}
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) =>
                              updateItem(
                                item.id,
                                "qty",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-16 bg-gray-50 border border-gray-200 rounded-lg text-center font-bold py-1.5 focus:ring-2 focus:ring-blue-100 outline-none"
                          />

                          {/* Delete Button */}
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Actions */}
                  <div className="p-4 border-t bg-gray-50 flex justify-between items-center gap-4 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                    <div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                        Total Valuasi
                      </div>
                      <div className="font-bold text-lg text-gray-800">
                        Rp {summary.totalValue.toLocaleString("id-ID")}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={closeModal}
                        className="px-4 py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-200 transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleFinalSave}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                      >
                        <Check className="h-5 w-5" /> Simpan ({summary.totalQty}
                        )
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
