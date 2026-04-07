import { ImagePreview } from ".";

export interface ProductRequest {
  _id?: string;
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
