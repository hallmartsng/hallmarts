import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Vendor } from "../models/vendor.models";

export interface AuthRequest extends Request {
  userId?: string;
}

export const vendorAuthenticateMiddleWare = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      res.status(401).json({ message: "User is not logged in." });
      return;
    }

    const token = header.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized: Token missing" });
      return;
    }

    const secret = process.env["JWT_SECRET"];
    if (!secret) {
      res
        .status(500)
        .json({ message: "Server error: JWT secret not configured" });
      return;
    }

    const decoded = jwt.verify(token, secret) as {
      vendorId: string;
      role: string;
    };
    if (!decoded || !decoded.vendorId) {
      res.status(401).json({ message: "Unauthorized: Invalid token payload" });
      return;
    }

    const vendor = await Vendor.findById(decoded.vendorId).select("-password");

    if (!vendor) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    req.vendorId = decoded.vendorId;
    next(); // ✅ Only reach next() after all checks
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
