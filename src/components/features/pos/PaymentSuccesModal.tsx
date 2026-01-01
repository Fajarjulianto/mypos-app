import React, { useRef } from "react";
import { Check, Printer, ArrowRight } from "lucide-react";
import type { TransactionRecord } from "@/types/sales";
import { useReactToPrint } from "react-to-print";
import { Receipt } from "./Receipt";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData: TransactionRecord | null;
}

export const PaymentSuccessModal = ({
  isOpen,
  onClose,
  transactionData,
}: PaymentSuccessModalProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  // Hook untuk print spesifik komponen Receipt
  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: `Struk-${transactionData?.id || "Transaksi"}`,
  });

  if (!isOpen || !transactionData) return null;

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);

  return (
    <>
      {/* --- KOMPONEN STRUK TERSEMBUNYI (Hanya untuk Print) --- */}
      <div className="hidden">
        <Receipt ref={receiptRef} data={transactionData} />
      </div>

      {/* --- MODAL UI (Tampil di Layar) --- */}
      <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-400 via-purple-500 to-blue-600" />

          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
              <Check className="h-8 w-8 stroke-3" />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
            Pembayaran Berhasil!
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Transaksi sukses disimpan.
          </p>

          {/* Ringkasan Singkat (Bukan Struk Asli) */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-8 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total</span>
              <span className="font-bold text-gray-900">
                {formatRupiah(transactionData.total)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Kembali</span>
              <span className="font-bold text-green-600">
                {formatRupiah(transactionData.change)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handlePrint && handlePrint()}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              <Printer className="h-5 w-5" />
              Cetak Struk
            </button>

            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 rounded-xl font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
            >
              <span>Transaksi Baru</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
