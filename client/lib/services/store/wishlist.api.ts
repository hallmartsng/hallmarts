import { ApiResponse } from "@/types";
import { api } from "../api";
import { WishListResponse } from "@/types/wishlist.types";
import { userApi } from "../user/user.api";
import { ProductRequest } from "@/types/product.types";

export const checkoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleWishlist: builder.mutation<
      ApiResponse<WishListResponse>,
      { productId: string }
    >({
      query: (body) => ({
        url: "/wishlist/toggle-wishlist",
        method: "PATCH",
        body,
      }),

      async onQueryStarted({ productId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData("getUserProfile", undefined, (draft) => {
            if (!draft?.data?.wishList) return;

            const index = draft.data.wishList.indexOf(productId);

            if (index > -1) {
              draft.data.wishList.splice(index, 1);
            } else {
              draft.data.wishList.push(productId);
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: ["User"],
    }),
    getWishlist: builder.query<ApiResponse<ProductRequest[]>, void>({
      query: () => ({
        url: "/wishlist",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useToggleWishlistMutation, useGetWishlistQuery } = checkoutApi;
