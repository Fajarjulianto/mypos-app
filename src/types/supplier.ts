export interface SupplierStats {
  responseTime: string;
  responseRate: number;
  onTimeDelivery: number;
  certifications: number;
}

export interface Supplier {
  id: string;
  name: string;
  isVerified: boolean;
  isEscrowProtected: boolean;
  location: string;
  businessType: string;
  joinedYear: number;
  rating: number;
  reviewCount: number;
  coverImage?: string;
  avatarImage?: string;
  stats: SupplierStats;
}
