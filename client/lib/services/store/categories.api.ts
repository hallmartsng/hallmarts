import { ApiResponse } from "@/types";
import { api } from "../api";
import {
  CategoryRequest,
  CategorySummaryRequest,
} from "@/types/categories.type";

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<CategoryRequest[]>, void>({
      query: () => ({
        url: "/store/categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    getCategorySummary: builder.query<
      ApiResponse<CategorySummaryRequest[]>,
      void
    >({
      query: () => ({
        url: "/store/categories/summary",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategorySummaryQuery } =
  categoriesApi;
