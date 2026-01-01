import { ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="pt-20 pb-16 bg-linear-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Badges */}
        <div className="flex justify-center gap-3 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            <ShieldCheck className="h-3.5 w-3.5" /> Aman dengan Escrow
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
            <Sparkles className="h-3.5 w-3.5" /> Terintegrasi AI
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          POS berintegrasi <span className="text-blue-600">AI</span> untuk{" "}
          <br className="hidden md:block" />
          inventori lebih cepat dan <br className="hidden md:block" />
          keputusan lebih cerdas.
        </h1>

        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Multi scan rak barang, analitik keuangan otomatis, escrow supplier,
          dan rekomendasi AI—semua dalam satu dashboard.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <button className="px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all hover:scale-105">
            Coba Gratis Sekarang
          </button>
          <button className="px-8 py-4 text-base font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
            Request Demo
          </button>
        </div>

        {/* Dashboard Image Mockup */}
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20"></div>
          <Image
            src="/dashboard-mockup.png"
            width={1300}
            height={90}
            alt="Civika Dashboard"
            className="relative rounded-2xl shadow-2xl border border-gray-200 bg-white"
          />
        </div>
      </div>
    </section>
  );
};
