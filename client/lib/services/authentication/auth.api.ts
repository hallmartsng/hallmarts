import { ApiResponse } from "@/types";
import { api } from "../api";
import { RegistrationRequest } from "@/types/auth.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    vendorRegistration: builder.mutation<
      ApiResponse<RegistrationRequest>,
      RegistrationRequest
    >({
      query: (body) => ({
        url: "/vendor/auth/register",
        method: "POST",
        body,
      }),
    }),
    userRegistration: builder.mutation<
      ApiResponse<RegistrationRequest>,
      RegistrationRequest
    >({
      query: (body) => ({
        url: "/user/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useVendorRegistrationMutation, useUserRegistrationMutation } =
  authApi;
