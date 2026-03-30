export type ImagePreview = {
  file: File;
  url: string;
};

export interface ProductRequest {
  title: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
  images: ImagePreview[];
}
