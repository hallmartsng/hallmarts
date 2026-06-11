import { ApiResponse } from "@/types";
import { api } from "../api";
import { userApi } from "../user/user.api";
import { CommentResponse } from "@/types/comment.types";

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<
      ApiResponse<CommentResponse>,
      {
        payload: CommentResponse;
      }
    >({
      query: ({ payload }) => ({
        url: "/store/comment",
        method: "POST",
        body: payload,
      }),

      invalidatesTags: ["Comment"],
    }),
    getComments: builder.query<ApiResponse<CommentResponse[]>, string>({
      query: (productId) => ({
        url: `/store/comment/${productId}`,
        method: "GET",
      }),
      providesTags: ["Comment"],
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentsQuery } = commentApi;
