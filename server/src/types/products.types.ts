export type ProductFiltersTypes = {
  productType?: string;
  categories?: string[];
  colors?: string[];
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  isBid?: boolean;
  isSwap?: boolean;
  visible?: boolean;
  isVerified?: boolean;
  search?: string; // text search on title/description/metaData
  sortBy?: "price" | "createdAt" | "clicks" | "rating";
  sortOrder?: "asc" | "desc";
  limit?: number;
  skip?: number;
  costPrice?: number; // what the vendor pays
  discount?: number; // percentage discount, e.g., 10 for 10%
  sellingPrice?: number;

  // Extra dynamic Mongo conditions (for deals, stock, trending, margins)
  extraConditions?: Record<string, any>;
};
