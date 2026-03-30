export function paymentSuccessTemplate({
  amount,
  project,
}: {
  amount: number;
  project: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Payment Confirmed ✅</h2>
      <p>Your payment of <strong>₦${amount}</strong> for <strong>${project}</strong> was successful.</p>
      <p>Thank you for your business!</p>
    </div>
  `;
}
