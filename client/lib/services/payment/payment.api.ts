'use client';

import { CreatePaymentRequest, Payment } from '@/types/payment.types';
import { api } from '../api';
import { ApiResponse } from '@/types/api.types';

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation<
      ApiResponse<CreatePaymentRequest>, // Response
      CreatePaymentRequest // Request body
    >({
      query: (body) => ({
        url: '/admin/payments',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Payments', id: 'LIST' },
        { type: 'Payments', id: 'COUNT' },
      ],
    }),
    getAllPayments: builder.query<
      ApiResponse<Payment[]>,
      {
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
      }
    >({
      query: (params) => ({
        url: '/admin/payments',
        method: 'GET',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'Payments' as const,
                _id,
              })),
              { type: 'Payments', id: 'LIST' },
            ]
          : [{ type: 'Payments', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const { useCreatePaymentMutation, useGetAllPaymentsQuery } = paymentApi;
