import { StoreCategoryIconsTypes } from "@/components/store/StoreCategoryIcons";

export interface CategoryRequest {
  _id: string;
  title: string;
  icon: StoreCategoryIconsTypes;
  createdAt: string;
  updatedAt: string;
}

export interface CategorySummaryRequest {
  _id: string;
  title: string;
  icon: StoreCategoryIconsTypes;
  productCount: number;
}
