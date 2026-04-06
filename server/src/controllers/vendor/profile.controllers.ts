import { Request, Response } from "express";
import { Vendor } from "../../models/vendor.models";
import multer from "multer";
import { storeLogoStorage } from "../../utils/cloudinaryMediaStorage";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const storeLogoUpload = multer({ storage: storeLogoStorage });

export const getVendorProfile = async (req: Request, res: Response) => {
  const userId = req.userId;

  const vendorProfile = await Vendor.findById({ _id: userId });

  return res.status(200).json({
    message: "Vendor profile found",
    data: vendorProfile,
    success: true,
  });
};

export const updateVendorProfile = async (req: Request, res: Response) => {
  const id = req.userId;
  console.log("req.body: ", req.body);

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
      message: "Vendor updated successfully",
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

export const updateVendorStoreLogo = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File;
    const vendorId = req.userId;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const image = {
      url: file.path,
      public_id: file.filename,
    };

    await Vendor.findByIdAndUpdate(vendorId, {
      store_logo: image,
    });

    return res.status(200).json({
      message: "Logo uploaded successfully",
      image,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Logo upload failed", error });
  }
};
