import { ApiResponse } from "@/types";
import { api } from "../api";
import { ShippingAddressRequest } from "@/types/shipping.types";

export const shippingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserShippingAddress: builder.query<
      ApiResponse<ShippingAddressRequest>,
      string
    >({
      query: () => ({
        url: "/shipping/",
        method: "GET",
      }),
      //   providesTags: ["Vendor"],
    }),
    updateUserShippingAddress: builder.mutation<
      ApiResponse<ShippingAddressRequest>,
      {
        formData: ShippingAddressRequest;
      }
    >({
      query: ({ formData }) => ({
        url: `/shipping/`,
        method: "POST",
        body: formData,
      }),
      //   invalidatesTags: ["Vendor"],
    }),
  }),
});

export const {
  useLazyGetUserShippingAddressQuery,
  useUpdateUserShippingAddressMutation,
} = shippingApi;
