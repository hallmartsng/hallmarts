import { ApiResponse } from "@/types";
import { api } from "../api";
import { CheckOutType } from "@/types/checkout.types";

export const checkoutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation<
      ApiResponse<{
        paymentReference: string;
        amount: number;
      }>,
      {
        payload: CheckOutType;
      }
    >({
      query: ({ payload }) => ({
        url: "/store/checkout/",
        method: "POST",
        body: payload,
      }),
    }),
    paymentWebhook: builder.mutation<
      ApiResponse<{
        message: string;
        success: boolean;
      }>,
      {
        payload: { reference: string; status: number };
      }
    >({
      query: ({ payload }) => ({
        url: "/store/checkout/payments/webhook",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCheckoutMutation, usePaymentWebhookMutation } = checkoutApi;
