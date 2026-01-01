import React from "react";
import { Store } from "lucide-react";
import type { TransactionRecord } from "@/types/sales";

interface ReceiptProps {
  data: TransactionRecord;
  storeInfo?: {
    name: string;
    address: string;
    phone: string;
    footerMessage: string;
  };
}

export const Receipt = React.forwardRef<HTMLDivElement, ReceiptProps>(
  ({ data, storeInfo }, ref) => {
    const store = storeInfo || {
      name: "Civika POS Store",
      address: "Jl. Jendral Sudirman No. 10, Jakarta Pusat",
      phone: "0812-3456-7890",
      footerMessage: "Terimakasih Telah Berbelanja",
    };

    const formatRupiah = (val: number) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(val);

    const formatDate = (date: Date) =>
      new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
    const formatTime = (date: Date) =>
      new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(date);

    // Fallback jika items kosong (untuk preview)
    const items = data.items?.length > 0 ? data.items : [];
    const totalQty = items.reduce((acc, item) => acc + item.qty, 0);

    return (
      // Container Utama:
      // 1. w-[80mm]: Lebar standar printer kasir thermal
      // 2. p-4: Memberikan padding agar TIDAK mepet (sekitar 1cm kiri-kanan)
      // 3. font-mono: Font ala mesin kasir
      <div
        ref={ref}
        className="w-[80mm] bg-white text-black font-mono text-[11px] leading-relaxed p-4 mx-auto shadow-sm print:shadow-none print:w-[80mm] print:p-2"
      >
        {/* 1. HEADER TOKO (Centered) */}
        <div className="flex flex-col items-center text-center mb-3">
          {/* Icon Toko */}
          <div className="mb-2">
            <Store className="h-10 w-10 text-black stroke-[1.5]" />
          </div>
          <h1 className="text-sm font-bold uppercase tracking-wider mb-1">
            {store.name}
          </h1>
          <p className="px-2 leading-tight text-[10px] mb-1">{store.address}</p>
          <p className="text-[10px]">Telp: {store.phone}</p>
        </div>

        {/* Garis Putus-putus Tebal */}
        <div className="border-t-[1.5px] border-dashed border-gray-800 my-2"></div>

        {/* 2. META DATA (Tanggal & Customer) */}
        <div className="flex justify-between items-start text-[10px]">
          <div>
            <p>{formatDate(new Date(data.date))}</p>
            <p>{formatTime(new Date(data.date))}</p>
            <p className="mt-1 font-semibold">No: {data.id.slice(-6)}</p>
          </div>
          <div className="text-right">
            <p>Kasir: Admin</p>
            <p className="uppercase">{data.customerName || "Umum"}</p>
          </div>
        </div>

        <div className="border-t-[1.5px] border-dashed border-gray-800 my-2"></div>

        {/* 3. LIST ITEM */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col">
              {/* Baris 1: Nomor & Nama Produk (Bold) */}
              <span className="font-bold text-[11px] mb-0.5">
                {index + 1}. {item.name}
              </span>

              {/* Baris 2: Qty x Harga ......... Total */}
              <div className="flex justify-between pl-4 text-[10px]">
                <span className="text-gray-600">
                  {item.qty} {item.unit || "pcs"} x{" "}
                  {parseInt(item.price.toString()).toLocaleString("id-ID")}
                </span>
                <span className="font-medium text-black">
                  {formatRupiah(item.total)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-[1.5px] border-dashed border-gray-800 my-2 mt-3"></div>

        {/* 4. TOTAL & PEMBAYARAN */}
        <div className="space-y-1 text-[11px]">
          <div className="flex justify-between text-[10px] text-gray-600 mb-1">
            <span>Total QTY</span>
            <span>{totalQty}</span>
          </div>

          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>{formatRupiah(data.total)}</span>
          </div>

          {/* Total Besar */}
          <div className="flex justify-between font-bold text-sm mt-1">
            <span>TOTAL</span>
            <span>{formatRupiah(data.total)}</span>
          </div>

          <div className="flex justify-between mt-2 pt-1 border-t border-dotted border-gray-400">
            <span>Bayar ({data.paymentMethod})</span>
            <span>{formatRupiah(data.amountPaid)}</span>
          </div>

          <div className="flex justify-between">
            <span>Kembali</span>
            <span>{formatRupiah(data.change)}</span>
          </div>
        </div>

        <div className="border-t-[1.5px] border-dashed border-gray-800 my-3"></div>

        {/* 5. FOOTER */}
        <div className="text-center">
          <p className="font-bold mb-1">{store.footerMessage}</p>
          <p className="text-[9px] text-gray-500">
            Barang yang sudah dibeli tidak dapat ditukar/dikembalikan
          </p>
          <p className="mt-3 text-[9px] font-mono break-all">
            {/* Contoh ID unik untuk tracking struk online */}
            Ref: {data.id}
          </p>
        </div>
      </div>
    );
  }
);

Receipt.displayName = "Receipt";
