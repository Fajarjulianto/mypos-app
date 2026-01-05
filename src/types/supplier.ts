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
  companyInfo: CompanyInfo;
  contactInfo: ContactInfo;
  products: Product[];
  reviews: Review[];
  reviewStats: ReviewStats;
}

export interface ContactInfo {
  email: string;
  phone: string;
  website: string;
}

export interface CompanyInfo {
  overview: string;
  businessType: string;
  employees: string;
  annualRevenue: string;
  memberSince: number;
  certifications: string[];
}

export interface ReviewStats {
  average: number;
  total: number;
  distribution: { [key: number]: number }; // e.g. { 5: 70, 4: 20, ... } percent
}

export interface Review {
  id: string;
  user: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  minOrder: number;
  image?: string;
}
