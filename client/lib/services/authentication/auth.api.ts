import { ApiResponse } from "@/types";
import { api } from "../api";
import { VendorRegistrationRequest } from "@/types/auth.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    vendorRegistration: builder.mutation<
      ApiResponse<VendorRegistrationRequest>,
      VendorRegistrationRequest
    >({
      query: (body) => ({
        url: "/vendor/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useVendorRegistrationMutation } = authApi;
