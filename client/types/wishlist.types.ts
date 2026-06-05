import { ProductDetailRequest } from "./product.types";

export interface WishListResponse {
  product: ProductDetailRequest;
  wishlisted: boolean;
}
