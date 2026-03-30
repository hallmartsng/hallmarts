'use client';
import { CreateExpenseRequest, Expense } from '@/types/expenses.types';
import { api } from '../api';
import { ApiResponse } from '@/types/api.types';

export const expensesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createExpense: builder.mutation<
      ApiResponse<CreateExpenseRequest>, // Response
      CreateExpenseRequest // Request body
    >({
      query: (body) => ({
        url: '/admin/expenses',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Expenses', id: 'LIST' },
        { type: 'Expenses', id: 'COUNT' },
      ],
    }),
    getAllExpenses: builder.query<
      ApiResponse<Expense[]>,
      {
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
      }
    >({
      query: (params) => ({
        url: '/admin/expenses',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'Expenses' as const,
                _id,
              })),
              { type: 'Expenses', id: 'LIST' },
            ]
          : [{ type: 'Expenses', id: 'LIST' }],
    }),
    getAllApprovedExpenses: builder.query<ApiResponse<Expense[]>, void>({
      query: () => ({
        url: '/admin/expenses/approved',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'Expenses' as const,
                _id,
              })),
              { type: 'Expenses', id: 'LIST' },
            ]
          : [{ type: 'Expenses', id: 'LIST' }],
    }),
    getAllExpensesByType: builder.query<
      ApiResponse<{ _id: string; total: number }[]>,
      void
    >({
      query: () => ({
        url: '/admin/expenses/expenses-by-type',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'Expenses' as const,
                _id,
              })),
              { type: 'Expenses', id: 'LIST' },
            ]
          : [{ type: 'Expenses', id: 'LIST' }],
    }),
    updateExpenseStatus: builder.mutation<
      ApiResponse<Expense>,
      { id: string; status: 'pending' | 'approved' | 'declined' }
    >({
      query: ({ id, status }) => ({
        url: `/admin/expenses/${id}/update-expense-status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Expenses', id },
        { type: 'Expenses', id: 'LIST' },
        { type: 'Expenses', id: 'COUNT' },
        { type: 'Finances', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateExpenseMutation,
  useGetAllExpensesQuery,
  useGetAllExpensesByTypeQuery,
  useGetAllApprovedExpensesQuery,
  useUpdateExpenseStatusMutation,
} = expensesApi;
