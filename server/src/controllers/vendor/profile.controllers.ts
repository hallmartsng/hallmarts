import { Request, Response } from "express";
import bcrypt from "bcrypt";

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

  const { password, retry_password, ...otherUpdates } = req.body;

  try {
    const updates: any = { ...otherUpdates };

    // 🔐 If password update requested
    if (password || retry_password) {
      if (!password || !retry_password) {
        return res.status(400).json({
          success: false,
          message: "Both password fields are required",
        });
      }

      const vendor = await Vendor.findOne({ _id: id }).select("+password");
      if (!vendor) {
        return res.status(401).json({ message: "Vendor not found" });
      }

      // const isMatch = await vendor.comparePassword(password);
      const isMatch = await bcrypt.compare(password, vendor.password);
      console.log("vendor.password: ", vendor.password);
      console.log("isMatch: ", isMatch);

      // hash password
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }
      const hashedPassword = await bcrypt.hash(retry_password, 10);

      vendor.password = hashedPassword;
      console.log("retry_password: ", retry_password);
      console.log("hashedPassword: ", hashedPassword);

      await vendor.save();

      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
        data: vendor,
      });
    }

    const updatedVendorProfile = await Vendor.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password"); // don't return password

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
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update vendor profile",
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
