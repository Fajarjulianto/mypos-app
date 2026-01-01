import {
  Clock,
  CheckCircle2,
  Zap,
  Lock,
  Store,
  ShoppingCart,
  Warehouse,
} from "lucide-react";

export const Benefits = () => {
  return (
    <section id="manfaat" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Manfaat untuk Bisnis Anda
          </h2>
          <p className="mt-4 text-gray-600">
            Tingkatkan efisiensi operasional dan buat keputusan bisnis lebih
            cerdas
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            {
              icon: Clock,
              title: "Hemat Waktu",
              desc: "Kurangi waktu stock opname hingga 80% dengan AI scan",
            },
            {
              icon: CheckCircle2,
              title: "Minim Error",
              desc: "Akurasi 99.5% dalam penghitungan dan pencatatan",
            },
            {
              icon: Zap,
              title: "Insight Cepat",
              desc: "Laporan dan analitik real-time tanpa menunggu",
            },
            {
              icon: Lock,
              title: "Pembayaran Aman",
              desc: "Proteksi escrow untuk setiap transaksi supplier",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm text-center"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Business Types */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900">
            Cocok untuk Berbagai Bisnis
          </h3>
          <p className="mt-2 text-gray-600">
            Solusi fleksibel yang dapat disesuaikan
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Store,
              title: "Retail & Toko",
              desc: "Kelola ribuan SKU dengan mudah. Cocok untuk toko elektronik, fashion.",
            },
            {
              icon: ShoppingCart,
              title: "Minimarket",
              desc: "Sistem kasir cepat dengan integrasi scanner. Ideal untuk minimarket independen.",
            },
            {
              icon: Warehouse,
              title: "Gudang & Distributor",
              desc: "Tracking inventori multi-lokasi. Sempurna untuk bisnis distribusi volume tinggi.",
            },
          ].map((biz, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all text-center"
            >
              <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center mx-auto mb-6 text-cyan-600">
                <biz.icon className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                {biz.title}
              </h4>
              <p className="text-gray-600 text-sm">{biz.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
