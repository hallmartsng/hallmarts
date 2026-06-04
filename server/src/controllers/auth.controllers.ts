import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as crypto from "crypto";
import jwt from "jsonwebtoken";
import { generateAuthTokens } from "../utils/generateAuthToken";
import { generateOTP } from "../utils/generateOTP";
import { User } from "../models/user.models";
import { sendOtpEmail } from "../utils/sendEmail";
import Otp from "../models/otp.models";

// Refresh toekn user
export const getRefreshAccessToken = async (req: Request, res: Response) => {
  console.log("req.body: ", req.body);

  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token provided" });

  try {
    // ✅ Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env["JWT_REFRESH_SECRET"] as string,
    ) as { vendorId: string; role: string };

    // ✅ Issue new access token
    const { accessToken, refreshAccessToken } = generateAuthTokens(
      decoded.vendorId,
      decoded.role,
    );

    return res.json({
      data: {
        accessToken: accessToken,
        refreshToken: refreshAccessToken,
      },
    });
  } catch (error) {
    return res.status(403).json({ message: error });
    // return res
    //   .status(403)
    //   .json({ message: "Invalid or expired refresh token" });
  }
};

// Generate Auth OTP
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email, purpose } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with email not found", success: false });
    }
    // Generate OTP
    const otp = generateOTP();

    // Hash OTP before saving (for security)
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    console.log("hashedOtp: ", hashedOtp);

    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    await Otp.create({
      email: user.email,
      otp: hashedOtp,
      expiresAt,
      purpose: purpose,
    });

    // Send OTP to user (email/SMS)
    await sendOtpEmail(user.email, otp, purpose)
      .then(() => {
        console.log("email sent to:", user.email);
      })
      .catch((emailError) => {
        console.error("Email failed ", emailError);
      });

    return res.status(201).json({
      message: `OTP sent to ${user.email}`,
      success: true,
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: `Server error: ${error}` });
  }
};

// Verify OTP
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  if (!user) return res.status(404).json({ message: "User not found" });

  const otpRecords = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);

  const getOTP = otpRecords[0];
  if (!getOTP) {
    return res.status(404).json({ message: "OTP not found." });
  }

  if (getOTP.otp !== hashedOtp) {
    return res.status(400).json({ message: "OTP is invalid." });
  }

  if (getOTP.expiresAt.getTime() < Date.now()) {
    await Otp.deleteMany({ email });
    return res.status(400).json({ message: "OTP has expired." });
  }

  if (!user.isVerified) {
    user.isVerified = true;
  }
  await user.save();

  await Otp.deleteMany({ email });

  return res.status(200).json({
    message: "OTP verified successfully",
    status: 200,
    success: true,
  });
};

// Update password
export const upDatePassword = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 10);

    user.password = passwordHash;

    // IMPORTANT: Save changes
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
      status: 200,
      success: true,
      data: { role: user.role },
    });
  } catch (error) {
    console.error("Password update error:", error);
    return res.status(500).json({ message: "Error updating password" });
  }
};
