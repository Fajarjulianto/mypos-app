import React from "react";
import { Mail, Phone, Globe, Send } from "lucide-react";
import { ContactInfo } from "@/types/supplier";

interface ContactTabProps {
  contact: ContactInfo;
}

export const ContactTab = ({ contact }: ContactTabProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm animate-in fade-in duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Contact Information
      </h3>

      <div className="space-y-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-full">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{contact.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-full">
            <Phone size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-900">{contact.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-full">
            <Globe size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Website</p>
            <p className="font-medium text-gray-900">{contact.website}</p>
          </div>
        </div>
      </div>

      <button className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 flex items-center justify-center gap-2">
        <Send size={20} />
        Send Inquiry
      </button>
    </div>
  );
};
