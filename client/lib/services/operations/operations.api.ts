import { api } from '../api';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const operationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOperations: builder.query<Post[], void>({
      query: () => 'operations',
      providesTags: ['Operations'],
    }),

    getOperationById: builder.query<Post, number>({
      query: (id) => `operations/${id}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllOperationsQuery, useGetOperationByIdQuery } =
  operationsApi;
