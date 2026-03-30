export const otpEmailTemplate = (otp :string, purpose:string = "Verification") => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>🔐 ${purpose} Code</h2>
    <p>Hello,</p>
    <p>Your One-Time Password (OTP) for ${purpose.toLowerCase()} is:</p>
    <h1 style="color: #007bff;">${otp}</h1>
    <p>This code is valid for <strong>10 minutes</strong>.</p>
    <p>If you didn’t request this, please ignore this email.</p>
    <br/>
    <p>— The Booking Team</p>
  </div>
`;
