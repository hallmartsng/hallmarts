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
    // 🔹 upload Product Images
  }),
});

export const { useGetVendorOrdersQuery } = userOrderApi;
