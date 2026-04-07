import { Request, Response } from "express";
import * as crypto from "crypto";
import bcrypt from "bcrypt";
import { Vendor } from "../../models/vendor.models";
import { generateOTP } from "../../utils/generateOTP";
import Otp from "../../models/otp.models";
import { generateAuthTokens } from "../../utils/generateAuthToken";

// register a new vendor
export const vendorRegistration = async (req: Request, res: Response) => {
  try {
    const { regNo, email, password, terms, campus, phone, countryCode } =
      req.body;

    console.log(password);

    const role = "vendor";

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Vendor.findOne({
      role: role,
      $or: [{ email }, { regNo }],
    });
    if (existingUser) {
      console.log("existing user: ", existingUser);

      return res.status(400).json({ message: "User already exist." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const vendor = await Vendor.create({
      regNo,
      role,
      email,
      campus,
      password: hashPassword,
      terms,
      phone,
      countryCode,
    });

    const otp = generateOTP();

    // Hash OTP before saving (for security)
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    const otpPurpose =
      role === "vendor"
        ? "vendor_registration"
        : role === "admin"
          ? "admin_registration"
          : "user_registration";
    await Otp.create({
      email: vendor.email,
      otp: hashedOtp,
      expiresAt,
      purpose: otpPurpose,
    });

    // Send OTP to user (email/SMS)
    // await sendOtpEmail(
    //   email,
    //   otp,
    //   `${
    //     role === "vendor" ? "Vendor" : role === "admin" ? "Admin" : "User"
    //   } account creation`,
    // );
    const { accessToken, refreshAccessToken } = generateAuthTokens(
      vendor.id,
      vendor.role,
    );
    return res.status(201).json({
      message: "User created successfully!",
      accessToken: accessToken,
      refreshToken: refreshAccessToken,
      vendor: { id: String(vendor._id), email, role },
    });
  } catch (error) {
    return res.status(500).json({ message: `Server error: ${error}` });
  }
};

// login vendor
export const vendorLogin = async (req: Request, res: Response) => {
  try {
    const { regNo, password } = req.body as { regNo: string; password: string };

    if (!regNo || !password) {
      return res.status(400).json({ message: "regNo and password required" });
    }

    const vendor = await Vendor.findOne({ regNo }).select("+password");

    if (!vendor) {
      return res.status(401).json({ message: "Vendor not found" });
    }

    // / 2️⃣ Compare password
    const isMatch = await vendor.comparePassword(password);
    console.log("isMatch: ", isMatch);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshAccessToken } = generateAuthTokens(
      vendor.id,
      vendor.role,
    );
    const userObj = vendor.toObject();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: passwordHash, ...safeUser } = userObj;
    return res.json({
      message: "User logged in successfully!",
      user: safeUser,
      accessToken: accessToken,
      refreshToken: refreshAccessToken,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error });
  }
};

// Google auth
// export async function googleAuth(req: Request, res: Response) {
//   try {
//     const { email, name, image } = req.body;
//     console.log("Google body: ", req.body);
//     // Split full name
//     let first_name = "";
//     let last_name = "";

//     if (name) {
//       const parts = name.trim().split(" ");
//       first_name = parts.shift(); // First element
//       last_name = parts.join(" "); // Remaining elements (handles middle names)
//     }
//     let user = await User.findOne({ email });
//     if (!user) {
//       user = await User.create({ email, first_name, last_name, image });
//     }
//     const { accessToken, refreshAccessToken } = generateAuthTokens(user.id);
//     return res.json({
//       message: "Sign In successful",
//       user,
//       accessToken: accessToken,
//       refreshToken: refreshAccessToken,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: `Server error: ${error}` });
//   }
// }

// Refresh toekn user
// export async function getRefreshAccessToken(req: Request, res: Response) {
//   const { refreshToken } = req.body;

//   if (!refreshToken)
//     return res.status(401).json({ message: "No refresh token provided" });

//   try {
//     // ✅ Verify refresh token
//     const decoded = jwt.verify(
//       refreshToken,
//       process.env["JWT_REFRESH_SECRET"] as string,
//     ) as { userId: string };

//     // ✅ Issue new access token
//     const { accessToken, refreshAccessToken } = generateAuthTokens(
//       decoded.userId,
//     );

//     return res.json({
//       accessToken: accessToken,
//       refreshToken: refreshAccessToken,
//     });
//   } catch (error) {
//     return res.status(403).json({ message: error });
//   }
// }

// Generate Auth OTP
// export const sendOtp = async (req: Request, res: Response) => {
//   const { email, purpose } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) return res.status(404).json({ message: "User not found" });

//   // Generate OTP
//   const otp = generateOTP();

//   // Hash OTP before saving (for security)
//   const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

//   const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

//   await Otp.create({
//     email: user.email,
//     otp: hashedOtp,
//     expiresAt,
//     purpose: purpose,
//   });

//   // Send OTP to user (email/SMS)
//   await sendOtpEmail(user.email, otp, "Password Reset");

//   return res
//     .status(201)
//     .json({ message: `OTP sent to ${user.email}`, status: 200 });
// };

// Verify OTP
// export const verifyOtp = async (req: Request, res: Response) => {
//   const { email, otp } = req.body;

//   console.log(email, otp);

//   const user = await User.findOne({ email });
//   const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

//   console.log("user: ", user);
//   console.log("hashedOtp: ", hashedOtp);
//   if (!user) return res.status(404).json({ message: "User not found" });

//   const otpRecords = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);

//   const getOTP = otpRecords[0];
//   if (!getOTP) {
//     return res.status(404).json({ message: "OTP not found." });
//   }

//   if (getOTP.otp !== hashedOtp) {
//     return res.status(400).json({ message: "OTP is invalid." });
//   }

//   if (getOTP.expiresAt.getTime() < Date.now()) {
//     await Otp.deleteMany({ email });
//     return res.status(400).json({ message: "OTP has expired." });
//   }

//   user.isVerified = true;
//   await user.save();

//   await Otp.deleteMany({ email });

//   return res.status(200).json({
//     message: "OTP verified successfully",
//     status: 200,
//   });
// };

// Update password
// export const upDatePassword = async (req: Request, res: Response) => {
//   try {
//     const { password, email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Hash new password
//     const passwordHash = await bcrypt.hash(password, 10);

//     user.passwordHash = passwordHash;

//     // IMPORTANT: Save changes
//     await user.save();

//     return res.status(200).json({
//       message: "Password updated successfully",
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Password update error:", error);
//     return res.status(500).json({ message: "Error updating password" });
//   }
// };
