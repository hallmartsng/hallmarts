import { ApiResponse } from "@/types";
import { api } from "../api";
import { ProductRequest } from "@/types/product.types";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Get all vendor products
    getProducts: builder.query<ApiResponse<ProductRequest[]>, void>({
      query: () => "/vendor/product",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Product" as const,
                id: _id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    // 🔹 Get single product
    getProductById: builder.query<ApiResponse<ProductRequest>, string>({
      query: (productId) => `/vendor/products/${productId}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    // 🔹 Create product
    createProduct: builder.mutation<
      ApiResponse<ProductRequest>,
      ProductRequest
    >({
      query: (body) => ({
        url: "/vendor/product/",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            productsApi.util.updateQueryData(
              "getProducts",
              undefined,
              (draft) => {
                // Insert newly created product at the top
                draft.data.unshift(data.data);
              },
            ),
          );
        } catch {
          // no-op: creation failed, nothing to update
        }
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    // 🔹 upload Product Images
    uploadProductImages: builder.mutation<
      ApiResponse<ProductRequest>,
      {
        productId: string | null;
        uploadedImages: FormData;
      }
    >({
      query: ({ productId, uploadedImages }) => ({
        url: `/vendor/product/${productId}/upload/`,
        method: "POST",
        body: uploadedImages,
      }),
      invalidatesTags: ["Product"],
    }),
    // 🔹 Update product
    updateProduct: builder.mutation<
      ApiResponse<ProductRequest>,
      {
        productId: string;
        body: ProductRequest;
      }
    >({
      query: ({ productId, ...body }) => ({
        url: `/vendor/product/${productId}/update`,
        method: "PATCH",
        body,
      }),

      async onQueryStarted(
        { productId, ...patch },
        { dispatch, queryFulfilled },
      ) {
        // 🟡 Optimistically update cached products list
        const patchResult = dispatch(
          productsApi.util.updateQueryData(
            "getProducts",
            undefined,
            (draft) => {
              const product = draft.data.find((p) => p._id === productId);
              if (product) {
                Object.assign(product, patch);
              }
            },
          ),
        );

        try {
          // 🟢 Wait for server response
          await queryFulfilled;
        } catch {
          // 🔴 Rollback if request fails
          patchResult.undo();
        }
      },

      // invalidatesTags: (_r, _e, { productId }) => [
      //   { type: "Product", id: productId },
      // ],
    }),

    // 🔹 Delete product
    deleteProduct: builder.mutation<ApiResponse<ProductRequest>, string>({
      query: (productId) => ({
        url: `/vendor/product/${productId}/delete`,
        method: "DELETE",
      }),

      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApi.util.updateQueryData(
            "getProducts",
            undefined,
            (draft) => {
              draft.data = draft.data.filter((p) => p._id !== productId);
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUploadProductImagesMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
