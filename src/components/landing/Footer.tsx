import { Cpu, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer>
      {/* CTA Section */}
      <div className="bg-blue-600 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Transformasi Bisnis Anda?
          </h2>
          <p className="text-blue-100 mb-10 text-lg">
            Mulai gratis hari ini dan rasakan kemudahan mengelola inventori
            dengan AI. Tanpa kartu kredit, tanpa komitmen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="px-6 py-4 rounded-xl text-gray-900 outline-none focus:ring-2 focus:ring-white/50 w-full bg-white/10 placeholder:text-blue-200 border border-white/20 backdrop-blur-sm"
            />
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all whitespace-nowrap">
              Coba Gratis
            </button>
          </div>
          <p className="mt-4 text-sm text-blue-200 opacity-80">
            Gratis 14 hari trial. Tidak perlu kartu kredit.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#0F172A] pt-20 pb-10 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Civika</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Sistem POS berintegrasi AI untuk bisnis modern Indonesia.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-colors">
                <Linkedin className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {[
            {
              title: "Produk",
              links: ["Fitur", "Harga", "Integrasi", "Changelog"],
            },
            {
              title: "Perusahaan",
              links: ["Tentang Kami", "Karir", "Blog", "Kontak"],
            },
            {
              title: "Dukungan",
              links: ["Pusat Bantuan", "Dokumentasi", "Status", "FAQ"],
            },
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-white mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>2025 Civika. Hak cipta dilindungi.</p>
          <p>Dibuat dengan teknologi terdepan di Indonesia</p>
        </div>
      </div>
    </footer>
  );
};
