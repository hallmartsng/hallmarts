'use client';

import { Supervisor } from '@/types/supervisors.types';
import { api } from '../api';
import { ApiResponse } from '@/types/api.types';

export const supervisorsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSupervisors: builder.query<
      ApiResponse<Supervisor[]>,
      {
        search?: string;
      }
    >({
      query: (params) => ({
        url: '/supervisors',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'Supervisors' as const,
                _id,
              })),
              { type: 'Supervisors', id: 'LIST' },
            ]
          : [{ type: 'Supervisors', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllSupervisorsQuery } = supervisorsApi;
