import { ImagePreview } from ".";

export interface ProductRequest {
  _id?: string;
  vendor?: string;
  title: string;
  description: string;
  features?: string[];
  brand?: string;
  campus?: string;
  colors?: string[];
  sizes?: string[];
  price: number;
  stock: number;
  visible?: boolean;
  status: "approved" | "pending" | "rejected";
  categories: string[];
  images?: ImagePreview[] | null;
  createdAt?: string;
}

export interface ProductDetailRequest {
  _id?: string;
  vendor: {
    _id: string;
    fname: string;
    campus: string;
    department: string;
    store_name: string;
  };
  title: string;
  description: string;
  features?: string[];
  brand?: string;
  colors?: string[];
  sizes?: string[];
  price: number;
  stock: number;
  categories: string[];
  images?: ImagePreview[] | null;
  createdAt?: string;
  discount: number;
}

export interface ProductFiltersTypes {
  search?: string;
  campus?: string;
  visible?: boolean;
  isVerified?: boolean;

  productType?: string;

  categories?: string[];
  colors?: string[];
  sizes?: string[];

  isBid?: boolean;
  isSwap?: boolean;

  minPrice?: number;
  maxPrice?: number;

  sortBy?: string;
  sortOrder?: "asc" | "desc";

  skip?: number;
  limit?: number;

  extraConditions?: Record<string, any>;
}
