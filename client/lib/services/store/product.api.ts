import { ApiResponse } from "@/types";
import { api } from "../api";
import { ProductRequest } from "@/types/product.types";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get single product
    getProductById: builder.query<ApiResponse<ProductRequest>, string>({
      query: (productId) => `/store/products/${productId}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const { useGetProductByIdQuery } = productsApi;
