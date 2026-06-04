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
    sendOTP: builder.mutation<ApiResponse<OTPResponse>, { email: string }>({
      query: (body) => ({
        url: "/auth/send-opt",
        method: "POST",
        body,
      }),
    }),
    verifyOTP: builder.mutation<
      ApiResponse<OTPResponse>,
      { email: string; otp: string }
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<
      ApiResponse<ResetPasswordResponse>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useVendorRegistrationMutation,
  useUserRegistrationMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
} = authApi;
