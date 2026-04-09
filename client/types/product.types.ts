import { ImagePreview } from ".";

export interface ProductRequest {
  _id?: string;
  vendor?: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  visible?: boolean;
  status: "approved" | "pending" | "rejected";
  categories: string[];
  images?: ImagePreview[] | null;
  createdAt?: string;
}
