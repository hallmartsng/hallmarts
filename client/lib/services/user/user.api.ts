import { ApiResponse } from "@/types";
import { api } from "../api";
import { ProfileRequest } from "@/types/vendor.types";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<ApiResponse<ProfileRequest>, void>({
      query: () => ({
        url: "/user/profile/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    // 🔹 upload Product Images
    updateUserProfile: builder.mutation<
      ApiResponse<ProfileRequest>,
      {
        formData: ProfileRequest;
      }
    >({
      query: ({ formData }) => ({
        url: `/user/profile/update/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApi;
