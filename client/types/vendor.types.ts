export interface CreateVendorRequest {
  regNo: string;
  email: string;
  phone: string;
  campus: string;
  password: string;
  retry_password: string;
}

export interface VendorProfileUpdateRequest extends CreateVendorRequest {
  store_logo: string;
  store_name: string;
  store_description: string;
  fname: string;
  password: string;
  // retry_password: string;
}
