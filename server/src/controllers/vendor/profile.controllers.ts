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

  console.log("userId: ", userId);

  const vendorProfile = await Vendor.findById({ _id: userId });

  console.log("vendorProfile: ", vendorProfile);

  return res.status(200).json({
    message: "Vendor profile found",
    data: vendorProfile,
    success: true,
  });
};

export const updateVendorProfile = async (req: Request, res: Response) => {
  const id = req.userId;
  try {
    const updates = req.body;

    //1️⃣ Update project
    const updatedVendorProfile = await Vendor.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedVendorProfile) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedVendorProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update project",
      error,
    });
  }
};
