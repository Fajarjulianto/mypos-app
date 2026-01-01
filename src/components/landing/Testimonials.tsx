import { Star } from "lucide-react";
import Image from "next/image";

export const Testimonials = () => {
  return (
    <section
      id="testimoni"
      className="py-24 bg-gray-50 border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Dipercaya Ribuan Bisnis
          </h2>
          <p className="mt-4 text-gray-600">
            Dengarkan cerita sukses dari pemilik bisnis yang sudah menggunakan
            Civika
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              text: '"Civika mengubah cara kami mengelola stok. Dulu stock opname butuh 2 hari, sekarang cuma 2 jam. AI scan-nya luar biasa akurat!"',
              name: "Budi Santoso",
              role: "Pemilik Toko Elektronik",
              img: "https://i.pravatar.cc/150?u=budi",
            },
            {
              text: '"Fitur escrow memberikan rasa aman saat bertransaksi dengan supplier baru. Tidak perlu khawatir lagi soal penipuan."',
              name: "Siti Rahayu",
              role: "Manager Minimarket",
              img: "https://i.pravatar.cc/150?u=siti",
            },
            {
              text: '"Dashboard AI-nya sangat membantu. Sekarang kami tahu persis kapan harus restock dan produk mana yang paling laku."',
              name: "Hendra Wijaya",
              role: "Supervisor Gudang",
              img: "https://i.pravatar.cc/150?u=hendra",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star
                    key={s}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                {item.text}
              </p>
              <div className="flex items-center gap-4">
                <Image
                  width={30}
                  height={30}
                  src={item.img}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
