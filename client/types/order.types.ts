export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}
export interface OrderRequest {
  _id: string;
  date: string;

  paymentStatus: "pending" | "paid";
  orderStatus: "processing" | "accepted" | "delivered";
  discount?: number;
  quantity: number;
  totalPrice: number;
  updatedAt: string;
  items: OrderItem[];

  shippingAddress: {
    address: string;
    campus?: string;
    email: string;
    name: string;
    phone: string;
  };
  user?: {
    name: string;
    campus: string;
    email: string;
    address: string;
    fname: string;
  };
}
