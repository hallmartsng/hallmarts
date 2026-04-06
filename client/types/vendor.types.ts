import { ImagePreview } from ".";

export interface CreateVendorRequest {
  regNo?: string;
  email?: string;
  phone?: string;
  campus?: string;
  password?: string;
  retry_password?: string;
}

export interface VendorProfileUpdateRequest extends CreateVendorRequest {
  store_logo?: ImagePreview;
  store_name?: string;
  store_description?: string;
  fname?: string;

  // retry_password: string;
}
