import React, { useState } from "react";
import { Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { AiSuggestion } from "@/types/ai";

interface AiSuggestionCardProps {
  suggestion: AiSuggestion;
  onAccept?: () => void;
}

export const AiSuggestionCard = ({
  suggestion,
  onAccept,
}: AiSuggestionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // 1. Container Luar: Mengatur Border Gradient Bergerak
    <div className="relative p-0.5 rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      {/* Background Animasi (The Moving Border) */}
      <div className="absolute inset-0 bg-linear-to-r from-pink-500 via-purple-500 to-orange-500 animate-border-flow bg-size-[200%_200%]" />

      {/* 2. Container Dalam: Background Putih */}
      <div className="relative bg-white rounded-[14px] overflow-hidden">
        {/* --- HEADER SECTION (Always Visible) --- */}
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-4 flex-1">
            {/* Icon Sparkle Animated */}
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full blur-md opacity-50 animate-sparkle-pulse" />
              <Sparkles
                className="text-orange-500 relative z-10 animate-sparkle-pulse"
                size={24}
                fill="currentColor"
              />
            </div>

            {/* Summary Text */}
            <div className="flex-1">
              {/* Label Kecil */}
              {!isOpen && (
                <span className="block text-[10px] font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-orange-500 uppercase tracking-wider mb-0.5">
                  AI Insight
                </span>
              )}
              <p
                className={`text-sm font-medium text-gray-800 ${
                  isOpen ? "font-bold" : ""
                }`}
              >
                {suggestion.summary}
              </p>
            </div>
          </div>

          {/* Toggle Button (Arrow) */}
          <button
            className={`ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
              ${
                isOpen
                  ? "bg-gray-100 text-gray-600 rotate-180"
                  : "bg-linear-to-r from-orange-500 to-pink-500 text-white hover:shadow-md hover:scale-105"
              }`}
          >
            {/* Menggunakan ChevronDown untuk indikasi expand, atau ArrowRight sesuai selera */}
            <ChevronDown size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* --- DETAILS SECTION (Expandable) --- */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-6 pt-0">
            <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent mb-4" />

            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-orange-500 rounded-full" />
              Paling sering ditanyakan:
            </h4>

            <ul className="space-y-3 mb-6">
              {suggestion.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>

            {/* Bottom Action Button (Seperti di foto aitanya.jpeg) */}
            {suggestion.actionLabel && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept?.();
                }}
                className="w-full py-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors group/btn"
              >
                <span className="text-lg">⚡</span>
                {suggestion.actionLabel}
                <ArrowRight
                  size={16}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
