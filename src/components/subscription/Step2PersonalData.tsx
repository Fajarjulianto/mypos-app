import React, { useState } from "react";
import { Eye, EyeOff, ShieldCheck, User, Mail, Phone } from "lucide-react";
import { SubscriptionFormData } from "@/types/subscription";

interface Step2Props {
  formData: SubscriptionFormData;
  // FIX: Menggunakan Generic <K> agar value otomatis menyesuaikan tipe field-nya
  // Jika field 'email' (string), maka value HARUS string.
  // Jika field 'isPolicyAccepted' (boolean), maka value HARUS boolean.
  updateData: <K extends keyof SubscriptionFormData>(
    field: K,
    value: SubscriptionFormData[K]
  ) => void;
  onBack: () => void;
  onNext: () => void;
}

export const Step2PersonalData = ({
  formData,
  updateData,
  onBack,
  onNext,
}: Step2Props) => {
  const [showPassword, setShowPassword] = useState(false);

  // Validasi sederhana (Type safe check)
  const isValid =
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.whatsapp.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.isPolicyAccepted &&
    formData.isCaptchaVerified;

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-8 duration-500">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Lengkapi Data Diri
      </h2>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Nama Lengkap
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={formData.fullName}
              // TypeScript tahu 'fullName' butuh string, e.target.value adalah string -> AMAN
              onChange={(e) => updateData("fullName", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              placeholder="Masukkan nama lengkap"
            />
          </div>
        </div>

        {/* Email & Whatsapp Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateData("email", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="nama@email.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              No. WhatsApp
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => updateData("whatsapp", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="0812..."
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => updateData("password", e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Buat password aman"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Kode Referral (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Kode Referral{" "}
            <span className="text-gray-400 font-normal">(Opsional)</span>
          </label>
          <input
            type="text"
            value={formData.referralCode || ""}
            onChange={(e) => updateData("referralCode", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none border-dashed bg-gray-50"
            placeholder="Punya kode promo?"
          />
        </div>

        {/* Custom Mock Captcha */}
        <div
          className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center gap-3 select-none cursor-pointer hover:bg-gray-100 transition-colors"
          // TypeScript tahu 'isCaptchaVerified' butuh boolean -> AMAN
          onClick={() =>
            updateData("isCaptchaVerified", !formData.isCaptchaVerified)
          }
        >
          <div
            className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-colors ${
              formData.isCaptchaVerified
                ? "bg-green-600 border-green-600"
                : "bg-white border-gray-400"
            }`}
          >
            {formData.isCaptchaVerified && (
              <ShieldCheck size={16} className="text-white" />
            )}
          </div>
          <span className="text-sm font-medium text-gray-700">
            Saya bukan robot (Mock Captcha)
          </span>
        </div>

        {/* Policy Checkbox */}
        <div className="flex items-start gap-3">
          <div
            className={`mt-1 w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer shrink-0 ${
              formData.isPolicyAccepted
                ? "bg-green-600 border-green-600"
                : "bg-white border-gray-300"
            }`}
            // TypeScript tahu 'isPolicyAccepted' butuh boolean -> AMAN
            onClick={() =>
              updateData("isPolicyAccepted", !formData.isPolicyAccepted)
            }
          >
            {formData.isPolicyAccepted && (
              <ShieldCheck size={14} className="text-white" />
            )}
          </div>
          <p className="text-sm text-gray-600 leading-snug">
            Saya menyetujui{" "}
            <span className="text-green-600 font-semibold cursor-pointer hover:underline">
              Syarat & Ketentuan
            </span>{" "}
            serta{" "}
            <span className="text-green-600 font-semibold cursor-pointer hover:underline">
              Kebijakan Privasi
            </span>{" "}
            yang berlaku.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={onBack}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
        >
          Kembali
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-600/20 transition-all"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
};
