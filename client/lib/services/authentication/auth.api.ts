import { ApiResponse } from "@/types";
import { api } from "../api";
import { RegistrationRequest } from "@/types/auth.types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      ApiResponse<RegistrationRequest>,
      RegistrationRequest
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
