import { Request, Response } from "express";
import { Vendor } from "../../models/vendor.models";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
export const getVendorProfile = async (req: Request, res: Response) => {
  const userId = req.userId;

  const vendorProfile = await Vendor.findById({ _id: userId });

  return res.status(200).json({
    message: "Vendor profile found",
    data: vendorProfile,
    success: true,
  });
};
