export function newProjectConfirmedTemplate({
  amount,
  project,
  clientName,
}: {
  amount: number;
  project: string;
  clientName: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif;">
        <h2>Project Confirmed ✅</h2>
        <p>Dear <strong>${clientName}</strong>,</p>
        <p>Your project <strong>${project}</strong> has been confirmed with a budget of <strong>₦${amount.toLocaleString()}</strong>.</p>
        <p>Thank you for choosing Space Dezyn! We look forward to bringing your vision to life.</p>
    </div>
  `;
}
