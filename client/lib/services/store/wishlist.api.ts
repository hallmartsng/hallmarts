import { ApiResponse } from "@/types";
import { api } from "../api";
import { WishListResponse } from "@/types/wishlist.types";

export const checkoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleWishlist: builder.mutation<
      ApiResponse<WishListResponse>,
      { productId: string }
    >({
      query: (productId) => ({
        url: "/wishlist/toggle-wishlist",
        method: "PATCH",
        body: productId,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useToggleWishlistMutation } = checkoutApi;
