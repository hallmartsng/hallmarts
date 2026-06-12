import { ApiResponse } from "@/types";
import { api } from "../api";
import {
  ProductDetailRequest,
  ProductFiltersTypes,
  ProductRequest,
} from "@/types/product.types";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get single product
    getProductById: builder.query<ApiResponse<ProductDetailRequest>, string>({
      query: (productId) => `/store/products/${productId}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
    // 🔹 Get all vendor products
    getVendorProducts: builder.query<ApiResponse<ProductRequest[]>, string>({
      query: (vendorId) => `/store/products/vendor/${vendorId}`,
      providesTags: [{ type: "Product", id: "LIST" }],
    }),

    // Search and filter products
    filterProducts: builder.query<
      ApiResponse<ProductRequest[]>,
      ProductFiltersTypes
    >({
      query: (filters) => ({
        url: "store/products/filter",
        method: "POST",
        body: filters,
      }),
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetVendorProductsQuery,
  useFilterProductsQuery,
  useLazyFilterProductsQuery,
} = productsApi;
