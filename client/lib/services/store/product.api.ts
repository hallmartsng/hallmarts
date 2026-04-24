import { ApiResponse } from "@/types";
import { api } from "../api";
import { ProductDetailRequest, ProductRequest } from "@/types/product.types";

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
  }),
});

export const { useGetProductByIdQuery, useGetVendorProductsQuery } =
  productsApi;
