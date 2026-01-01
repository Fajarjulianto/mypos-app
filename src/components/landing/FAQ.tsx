import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    q: "Apa itu Civika POS AI?",
    a: "Civika POS AI adalah sistem Point of Sale modern yang terintegrasi dengan teknologi Artificial Intelligence. Kami menggabungkan fitur kasir tradisional dengan kemampuan AI.",
  },
  {
    q: "Bagaimana cara kerja AI Multi Scan Rak Barang?",
    a: "Cukup arahkan kamera perangkat Anda ke rak barang. AI akan memindai semua item sekaligus dan mencocokkannya dengan database.",
  },
  {
    q: "Apa itu fitur Escrow dan bagaimana cara kerjanya?",
    a: "Escrow adalah rekening bersama. Dana pembayaran Anda ke supplier akan ditahan di Civika dan baru diteruskan setelah Anda konfirmasi terima barang.",
  },
  {
    q: "Apakah Civika bisa digunakan offline?",
    a: "Ya, Civika memiliki mode offline. Data akan tersimpan lokal dan tersinkronisasi otomatis saat internet kembali terhubung.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Pertanyaan Umum</h2>
          <p className="mt-4 text-gray-600">
            Temukan jawaban untuk pertanyaan yang sering diajukan
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.q}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {openIndex === idx && (
                <div className="p-6 pt-0 bg-white border-t border-gray-100 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
