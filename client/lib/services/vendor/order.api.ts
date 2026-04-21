import { ApiResponse } from "@/types";
import { api } from "../api";
import { OrderRequest } from "@/types/order.types";

export const userOrderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVendorOrders: builder.query<ApiResponse<OrderRequest[]>, void>({
      query: () => ({
        url: "/vendor/orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    getVendorCustomer: builder.query<ApiResponse<OrderRequest[]>, void>({
      query: () => ({
        url: "/vendor/customers",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
  }),
});

export const { useGetVendorOrdersQuery, useGetVendorCustomerQuery } =
  userOrderApi;
