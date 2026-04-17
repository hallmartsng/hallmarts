import { ImagePreview } from ".";

export interface CartItemType {
  productId: string;
  vendorId: string;
  name: string;
  price: number;
  quantity: number;
  imgUrl: ImagePreview[];
}

export interface CartStateType {
  items: CartItemType[];
  totalItems: number;
  subtotal: number;
}
