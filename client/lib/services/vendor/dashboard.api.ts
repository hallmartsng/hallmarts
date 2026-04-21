import { ApiResponse } from "@/types";
import { api } from "../api";
import { VendorDashboardAnalyticsResponse } from "@/types/dashboardAnalytics.types";

export const vendorDashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getVendorDashboardAnalytics: builder.query<
      ApiResponse<VendorDashboardAnalyticsResponse>,
      void
    >({
      query: () => ({
        url: "/vendor/dashboard",
        method: "GET",
      }),
      providesTags: ["Orders", "Product", "User"],
    }),
  }),
});

export const { useGetVendorDashboardAnalyticsQuery } = vendorDashboardApi;
