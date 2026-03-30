// Generate a 6-digit numeric OTP

export function generateOTP() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// export const sendOtp = async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ message: "User not found" });

//   // Generate OTP
//   const otp = generateOTP();

//   // Hash OTP before saving (for security)
//   const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
//   const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

//   // Save in user record (or a separate OTP collection)
//   user.otp = hashedOtp;
//   user.otpExpiry = otpExpiry;
//   await user.save();

//   // Send OTP to user (email/SMS)
//   await sendEmail(user.email, "Your Verification Code", `Your OTP is ${otp}`);

//   res.json({ message: "OTP sent successfully" });
// };