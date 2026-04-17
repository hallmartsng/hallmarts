import { CartItemType } from "./cart.types";

export interface CheckOutType {
  cart: CartItemType[];
  shippingAddress: {
    campus?: string;
    name: string;
    regNo?: string;
    email?: string;
    phone?: string;
    city?: string;
    state?: string;
    country?: string;
    address?: string;
  };
}
