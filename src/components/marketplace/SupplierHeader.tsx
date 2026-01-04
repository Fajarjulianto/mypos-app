import Image from "next/image";
import {
  MapPin,
  Building2,
  Calendar,
  Star,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  Heart,
  Image as ImageIcon,
} from "lucide-react";
import { Supplier } from "@/types/supplier";

interface SupplierHeaderProps {
  supplier: Supplier;
  onContact: () => void;
  onFollow: () => void;
}

export const SupplierHeader = ({
  supplier,
  onContact,
  onFollow,
}: SupplierHeaderProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* 1. Cover Image Area */}
      <div className="relative h-48 md:h-64 bg-gray-100">
        {supplier.coverImage ? (
          <Image
            src={supplier.coverImage}
            alt="Cover"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ImageIcon size={64} opacity={0.5} />
          </div>
        )}
      </div>

      {/* 2. Profile Info Section */}
      <div className="px-6 pb-6 relative">
        {/* Avatar (Overlapping) */}
        <div className="absolute -top-16 left-6 md:left-8">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden relative">
            {supplier.avatarImage ? (
              <Image
                src={supplier.avatarImage}
                alt={supplier.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-3xl">
                {supplier.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Content Wrapper (Push down content to respect avatar) */}
        <div className="pt-20 md:pt-4 md:pl-40 flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Left: Identity & Metadata */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">
                {supplier.name}
              </h1>
              {supplier.isVerified && (
                <CheckCircle2
                  className="text-blue-500 fill-blue-50"
                  size={20}
                />
              )}
              {supplier.isEscrowProtected && (
                <span className="flex items-center gap-1 text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full border border-gray-200">
                  <ShieldCheck size={14} className="text-gray-500" />
                  Escrow Protected
                </span>
              )}
            </div>

            {/* Meta Details */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                {supplier.location}
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 size={16} />
                {supplier.businessType}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                Member since {supplier.joinedYear}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                <Star size={18} fill="currentColor" />
                <span className="font-bold text-gray-900 ml-1.5 text-base">
                  {supplier.rating}
                </span>
              </div>
              <span className="text-gray-400 text-sm">
                ({supplier.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Right: Actions Buttons */}
          <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
            <button
              onClick={onFollow}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Heart size={18} />
              Follow
            </button>
            <button
              onClick={onContact}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
            >
              <MessageCircle size={18} />
              Contact Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
