import { ScanBarcode, TrendingUp, ShieldCheck, Lightbulb } from "lucide-react";

const features = [
  {
    icon: ScanBarcode,
    title: "AI Multi Scan Rak Barang",
    desc: "Scan seluruh rak sekaligus dengan kamera. AI kami mengenali produk, menghitung stok, dan memperbarui inventori secara otomatis.",
  },
  {
    icon: TrendingUp,
    title: "AI Finance",
    desc: "Analitik keuangan cerdas yang memberikan insight real-time tentang arus kas, margin keuntungan, dan prediksi penjualan.",
  },
  {
    icon: ShieldCheck,
    title: "REKBER Escrow ke Supplier",
    desc: "Pembayaran aman dengan sistem escrow. Dana ditahan sampai barang diterima dengan kondisi baik.",
  },
  {
    icon: Lightbulb,
    title: "Suggestion AI pada Dashboard",
    desc: "Rekomendasi cerdas untuk restock, promo, dan optimasi bisnis. AI menganalisis pola penjualan dan memberikan saran.",
  },
];

export const Features = () => {
  return (
    <section id="fitur" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Fitur Unggulan</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Teknologi AI terdepan yang dirancang khusus untuk kebutuhan bisnis
            retail Indonesia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all group bg-white"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
