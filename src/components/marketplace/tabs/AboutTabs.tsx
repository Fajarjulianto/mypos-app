import React from "react";
import { Award } from "lucide-react";
import { CompanyInfo } from "@/types/supplier";

interface AboutTabProps {
  info: CompanyInfo;
}

export const AboutTab = ({ info }: AboutTabProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 animate-in fade-in duration-300">
      {/* Left: Overview */}
      <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Company Overview
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">{info.overview}</p>

        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Business Type</p>
            <p className="font-semibold text-gray-900">{info.businessType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Employees</p>
            <p className="font-semibold text-gray-900">{info.employees}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Annual Revenue</p>
            <p className="font-semibold text-gray-900">{info.annualRevenue}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Member Since</p>
            <p className="font-semibold text-gray-900">{info.memberSince}</p>
          </div>
        </div>
      </div>

      {/* Right: Certifications */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-fit">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Certifications</h3>
        <div className="flex flex-wrap gap-2">
          {info.certifications.map((cert, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
            >
              <Award size={14} />
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
