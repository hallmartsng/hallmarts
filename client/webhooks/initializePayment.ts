import payStackInline from "@/config/payStackConfig";

interface StorePaymentProps {
  reference: string;
  email: string;
  accessToken: string;
  amount: number;
  setPendingPayment?: ({
    reference,
    amount,
  }: {
    reference: string;
    amount: number;
  }) => void;
}

export const initializePayment = async ({
  email,
  reference,
  amount,
  accessToken,
  setPendingPayment,
}: StorePaymentProps) => {
  const response: {
    id?: string;
    reference?: string;
    message?: string;
    status?: number;
  } = {};
  payStackInline.newTransaction({
    key: "pk_test_cdc660c60db4315e7288d11ffaf37b61fb85adfd",
    email: email,
    amount: amount * 100,
    reference: reference,

    onSuccess: async (transaction) => {
      const { id, reference, message } = transaction;

      const res = await fetch(
        `${process.env["NEXT_PUBLIC_API_BASE_URL"]}/store/checkout/payments/webhook`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            id,
            reference,
            message,
          }),
        },
      );

      const response = await res.json();

      console.log("response from API:", response);

      return response;
    },
    onLoad: (response) => {
      console.log("onLoad: ", response);
      return {
        response,
      };
    },
    onCancel: () => {
      if (setPendingPayment) {
        return setPendingPayment({
          reference: reference,
          amount: amount,
        });
      }
    },
    onError: (error) => {
      console.log("error: ", error);
      console.log("Error: ", error.message);
      response.message = error.message;
      response.status = 500;
      return response;
    },
  });
};
