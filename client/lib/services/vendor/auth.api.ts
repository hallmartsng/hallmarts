import { ApiResponse } from "@/types";
import { api } from "../api";
import {
  OTPResponse,
  RegistrationRequest,
  ResetPasswordResponse,
} from "@/types/auth.types";

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

    sendVendorOTP: builder.mutation<
      ApiResponse<OTPResponse>,
      { email: string }
    >({
      query: (body) => ({
        url: "/vendor/auth/send-opt",
        method: "POST",
        body,
      }),
    }),
    verifyVendorOTP: builder.mutation<
      ApiResponse<OTPResponse>,
      { email: string; otp: string }
    >({
      query: (body) => ({
        url: "/vendor/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
    resetVendorPassword: builder.mutation<
      ApiResponse<ResetPasswordResponse>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/vendor/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useVendorRegistrationMutation,
  useSendVendorOTPMutation,
  useVerifyVendorOTPMutation,
  useResetVendorPasswordMutation,
} = authApi;
