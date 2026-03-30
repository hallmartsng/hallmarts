import { ApiResponse } from '@/types/api.types';
import { api } from '../api';
import { DashboardOverview } from '@/types/dashboard.types';
export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<ApiResponse<DashboardOverview>, void>({
      query: () => '/admin/dashboard/overview',
      providesTags: ['Dashboard'],
    }),
    getMonthlyCompletedProjects: builder.query<
      ApiResponse<{ month: string[]; year: number; completed: number[] }[]>,
      { year?: number }
    >({
      query: (params) => ({
        url: '/admin/dashboard/monthly-completed-projects',
        params,
      }),
      providesTags: ['Dashboard'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDashboardOverviewQuery,
  useGetMonthlyCompletedProjectsQuery,
} = dashboardApi;
