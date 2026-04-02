import { ApiResponse } from "@/types";
import { api } from "../api";
import { VendorRegistrationRequest } from "@/types/auth.types";
import { VendorProfileUpdateRequest } from "@/types/vendor.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVendorProfile: builder.query<
      ApiResponse<VendorProfileUpdateRequest>,
      void
    >({
      query: () => ({
        url: "/vendor/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetVendorProfileQuery } = authApi;
