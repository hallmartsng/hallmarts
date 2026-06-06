import { ApiResponse } from "@/types";
import { api } from "../api";
import { VendorProfileUpdateRequest } from "@/types/vendor.types";

export const vendorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVendorProfile: builder.query<
      ApiResponse<VendorProfileUpdateRequest>,
      void
    >({
      query: () => ({
        url: "/vendor/profile/",
        method: "GET",
      }),
      providesTags: ["Vendor"],
    }),
    getVendorPublicProfile: builder.query<
      ApiResponse<VendorProfileUpdateRequest>,
      string
    >({
      query: (vendorId) => ({
        url: `/vendor/profile/${vendorId}/public/`,
        method: "GET",
      }),
      providesTags: ["Vendor"],
    }),
    // 🔹 upload Product Images
    updateVendorProfile: builder.mutation<
      ApiResponse<VendorProfileUpdateRequest>,
      {
        formData: VendorProfileUpdateRequest;
      }
    >({
      query: ({ formData }) => ({
        url: `/vendor/profile/update/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Vendor"],
    }),
    uploadStoreLogo: builder.mutation<
      ApiResponse<VendorProfileUpdateRequest>,
      {
        uploadedLogo: FormData;
      }
    >({
      query: ({ uploadedLogo }) => ({
        url: `/vendor/profile/store-logo/upload/`,
        method: "POST",
        body: uploadedLogo,
      }),
      invalidatesTags: ["Vendor"],
    }),
  }),
});

export const {
  useGetVendorProfileQuery,
  useGetVendorPublicProfileQuery,
  useUploadStoreLogoMutation,
  useUpdateVendorProfileMutation,
} = vendorApi;
