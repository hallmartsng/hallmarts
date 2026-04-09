import { ImagePreview } from "@/types";

interface CartItem {
  productId: string;
  vendorId: string;
  name: string;
  price: number;
  quantity: number;
  imgUrl: ImagePreview[];
}
interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}
export const getCartLocalStorageItem = () => {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem("hallmarts_user_cart");
  return cart ? JSON.parse(cart) : undefined;
};

export const setCartLocalStorageItem = (cart: CartState) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("hallmarts_user_cart", JSON.stringify(cart));
};
