import { ApiResponse } from '@/types/api.types';
import { api } from '../api';
import { Finance, FinanceLineChart } from '@/types/finance.types';

export const financeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFinanceAnalytics: builder.query<ApiResponse<Finance>, void>({
      query: () => '/admin/finances/analytics',
      providesTags: ['Finances'],
    }),
    getFinanceMonthlyCashFlow: builder.query<
      ApiResponse<FinanceLineChart>,
      void
    >({
      query: () => '/admin/finances/monthly-cashflow',
      providesTags: ['Finances'],
    }),
    // getFinanceExpensesByType: builder.query<
    //   ApiResponse<FinanceLineChart>,
    //   void
    // >({
    //   query: () => '/admin/finances/expenses-by-type',
    //   providesTags: ['Finances'],
    // }),
  }),
  overrideExisting: false,
});

export const {
  useGetFinanceAnalyticsQuery,
  useGetFinanceMonthlyCashFlowQuery,
  // useGetFinanceExpensesByTypeQuery,
} = financeApi;
