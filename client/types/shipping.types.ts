export interface ShippingAddressRequest {
  user: string;
  //   campus: mongoose.Types.ObjectId;
  campus: string;
  name: string;
  regNo?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  address?: string;
}
