import { ImagePreview } from ".";

export interface ProfileRequest {
  regNo?: string;
  email?: string;
  phone?: string;
  campus?: string;
  password?: string;
  retry_password?: string;
  fname?: string;
  department?: string;
}

export interface VendorProfileUpdateRequest extends ProfileRequest {
  store_logo?: ImagePreview;
  store_name?: string;
  store_description?: string;
}
