import Paystack from "@paystack/inline-js";

interface StorePaymentProps {
  reference: string;
  email: string;
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
  setPendingPayment,
}: StorePaymentProps) => {
  const handler = new Paystack();

  handler.newTransaction({
    key: process.env["NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY"]!,
    email: email,
    amount: amount * 100,
    reference: reference,

    onSuccess: (transaction) => {
      alert(`onSuccess:  ${transaction}`);
      return {
        transaction,
      };
    },
    onLoad: (response) => {
      alert(`onLoad:  ${response}`);
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
      alert(`Error:  ${error}`);
      console.log("Error: ", error.message);
      return { error };
    },
  });
};
