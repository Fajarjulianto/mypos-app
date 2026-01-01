import React, { useState, useRef } from "react";
import {
  Camera,
  UploadCloud,
  X,
  Check,
  Plus,
  Trash2,
  ScanLine,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";

interface AiScanModalProps {
  onClose: () => void;
}

interface ScannedItem {
  id: number;
  name: string;
  qty: number;
  confidence: number; // Tingkat keyakinan AI (0-100)
}

export const AiScanModal = ({ onClose }: AiScanModalProps) => {
  // State
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScannedItem[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers ---

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      // Otomatis trigger scan saat gambar masuk
      simulateAiScan();
    }
  };

  const handleCameraClick = () => {
    // Di implementasi nyata, ini akan membuka akses Webcam/Kamera HP
    alert("Membuka kamera perangkat...");
  };

  const simulateAiScan = () => {
    setIsScanning(true);
    setScanResult(null);

    // Simulasi delay AI Processing
    setTimeout(() => {
      setIsScanning(false);
      // Mockup Data Hasil Scan Rak
      setScanResult([
        { id: 1, name: "Indomie Goreng", qty: 24, confidence: 98 },
        { id: 2, name: "Sedaap Soto", qty: 12, confidence: 92 },
        { id: 3, name: "ABC Kecap Manis", qty: 5, confidence: 85 },
        { id: 4, name: "Unknown Item #4", qty: 1, confidence: 45 }, // Contoh low confidence
      ]);
    }, 2500);
  };

  const handleUpdateItem = (
    id: number,
    field: keyof ScannedItem,
    value: string | number
  ) => {
    if (!scanResult) return;
    const updated = scanResult.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setScanResult(updated);
  };

  const handleDeleteItem = (id: number) => {
    if (!scanResult) return;
    setScanResult(scanResult.filter((item) => item.id !== id));
  };

  const handleAddNewRow = () => {
    if (!scanResult) return;
    const newId = Math.max(...scanResult.map((i) => i.id)) + 1;
    setScanResult([
      ...scanResult,
      { id: newId, name: "", qty: 1, confidence: 100 },
    ]);
  };

  const handleRetake = () => {
    setImage(null);
    setScanResult(null);
  };

  return (
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[90vh] md:h-[85vh]">
      {/* 1. Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
            <ScanLine className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              AI Multi-Scan Rak
            </h2>
            <p className="text-sm text-gray-500">
              Scan satu rak penuh, AI akan menghitung stok otomatis.
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* 2. LEFT PANEL: Image / Camera Area */}
        <div
          className={`
          relative flex flex-col items-center justify-center bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 transition-all duration-300
          ${scanResult ? "lg:w-1/3 h-64 lg:h-full" : "w-full h-full"}
        `}
        >
          {image ? (
            // State: Image Preview
            <div className="relative w-full h-full group">
              <Image
                fill
                src={image}
                alt="Scan"
                className="w-full h-full object-contain p-4"
              />

              {/* Overlay saat scanning */}
              {isScanning && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
                    <Loader2 className="h-10 w-10 text-blue-600 animate-spin relative z-10" />
                  </div>
                  <p className="mt-4 font-semibold text-gray-700 animate-pulse">
                    AI sedang menganalisis objek...
                  </p>
                </div>
              )}

              {/* Tombol Retake (muncul jika sudah ada hasil) */}
              {!isScanning && scanResult && (
                <div className="absolute top-4 left-4 z-20">
                  <button
                    onClick={handleRetake}
                    className="bg-white/90 backdrop-blur text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm border border-gray-200 hover:bg-white flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" /> Foto Ulang
                  </button>
                </div>
              )}
            </div>
          ) : (
            // State: Empty / Choose Input
            <div className="text-center p-8 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <ScanLine className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Mulai Scanning
              </h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-8 text-sm">
                Arahkan kamera ke rak barang atau upload foto yang sudah ada.
                Pastikan pencahayaan cukup terang.
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleCameraClick}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all"
                >
                  <Camera className="h-5 w-5" />
                  Buka Kamera
                </button>

                <div className="relative">
                  <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all">
                    <UploadCloud className="h-5 w-5" />
                    Upload File
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. RIGHT PANEL: Results List */}
        {scanResult && (
          <div className="flex-1 bg-white flex flex-col h-full animate-in slide-in-from-right duration-300">
            {/* List Header */}
            <div className="px-6 py-4 border-b border-gray-100 bg-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800">
                  Hasil Deteksi ({scanResult.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Silakan koreksi jika ada kesalahan deteksi.
                </p>
              </div>
              <button
                onClick={handleAddNewRow}
                className="text-blue-600 text-sm font-semibold hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Tambah Manual
              </button>
            </div>

            {/* Scrollable Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
              {scanResult.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-md ${
                    item.confidence < 70
                      ? "border-amber-200 bg-amber-50"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  {/* Confidence Indicator */}
                  <div
                    className={`w-1.5 h-10 rounded-full ${
                      item.confidence > 80
                        ? "bg-green-500"
                        : item.confidence > 50
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    title={`AI Confidence: ${item.confidence}%`}
                  />

                  {/* Editable Name */}
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                      Nama Produk
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        handleUpdateItem(item.id, "name", e.target.value)
                      }
                      className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none text-sm font-semibold text-gray-800 pb-1"
                      placeholder="Nama produk..."
                    />
                    {item.confidence < 70 && (
                      <span className="flex items-center gap-1 text-[10px] text-amber-600 mt-1">
                        <AlertCircle className="h-3 w-3" /> Periksa ulang (Low
                        Confidence)
                      </span>
                    )}
                  </div>

                  {/* Editable Qty */}
                  <div className="w-20">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5 text-center">
                      Qty
                    </label>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        handleUpdateItem(
                          item.id,
                          "qty",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-1.5 text-center text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none"
                    />
                  </div>

                  {/* Delete Action */}
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {scanResult.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <p>Tidak ada item terdeteksi.</p>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert("Data tersimpan ke inventori!");
                  onClose();
                }}
                className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
              >
                <Check className="h-4 w-4" />
                Simpan Semua ({scanResult.reduce((a, b) => a + b.qty, 0)} Items)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
