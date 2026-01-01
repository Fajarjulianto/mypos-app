import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Gratis",
    period: "selamanya",
    desc: "Untuk bisnis kecil yang baru memulai",
    features: [
      "1 outlet",
      "500 SKU produk",
      "AI scan dasar",
      "Laporan bulanan",
      "Support email",
    ],
    button: "Mulai Gratis",
    popular: false,
  },
  {
    name: "Growth",
    price: "Rp 299.000",
    period: "/bulan",
    desc: "Untuk bisnis yang berkembang pesat",
    features: [
      "5 outlet",
      "Unlimited SKU",
      "AI scan premium",
      "Escrow supplier",
      "Laporan real-time",
      "AI recommendations",
      "Support prioritas",
    ],
    button: "Mulai 14 Hari Gratis",
    popular: true,
  },
  {
    name: "Scale",
    price: "Rp 999.000",
    period: "/bulan",
    desc: "Untuk enterprise dengan kebutuhan khusus",
    features: [
      "Unlimited outlet",
      "Unlimited SKU",
      "AI scan enterprise",
      "Escrow premium",
      "API access",
      "Dedicated support",
      "SLA 99.9%",
    ],
    button: "Hubungi Sales",
    popular: false,
  },
];

export const Pricing = () => {
  return (
    <section id="harga" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Harga Transparan</h2>
          <p className="mt-4 text-gray-600">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-2xl bg-white border ${
                plan.popular
                  ? "border-blue-600 shadow-2xl scale-105 z-10"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Paling Populer
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-500">{plan.period}</span>
                </div>
                <p className="mt-4 text-sm text-gray-500">{plan.desc}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <Check
                      className={`w-5 h-5 ${
                        plan.popular ? "text-blue-600" : "text-green-500"
                      }`}
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                    : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
