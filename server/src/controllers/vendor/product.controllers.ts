import { Request, Response } from "express";
import multer from "multer";
import { productMediaStorage } from "../../utils/cloudinaryMediaStorage";
import Product from "../../models/products.models";
import { Vendor } from "../../models/vendor.models";

/**
 * GET /products
 * Vendor: get own products
 */

export const productImagesUpload = multer({ storage: productMediaStorage });

export const getVendorProducts = async (req: Request, res: Response) => {
  const vendorId = req.userId;

  const products = await Product.find({ vendor: vendorId }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    data: products,
  });
};

/**
 * GET /products/:id
 */
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const vendorId = req.userId;

  const product = await Product.findOne({
    _id: id,
    vendor: vendorId,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: product,
    message: "product found",
  });
};

/**
 * POST /products
 */
export const createProduct = async (req: Request, res: Response) => {
  const vendorId = req.userId;

  const vendor = await Vendor.findById(vendorId);

  if (!vendor) {
    return res.status(403).json({
      success: false,
      message: "Session expired, re-login your account",
    });
  }

  const product = await Product.create({
    ...req.body,
    vendor: vendorId,
    campus: vendor.campus,
  });

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

/**
 * PATCH /products/:id
 */
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const vendorId = req.userId;

  const product = await Product.findOneAndUpdate(
    { _id: id, vendor: vendorId },
    req.body.body,
    { new: true, runValidators: true },
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found or unauthorized",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

/**
 * DELETE /products/:id
 */
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const vendorId = req.userId;

  const product = await Product.findOneAndDelete({
    _id: id,
    vendor: vendorId,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found or unauthorized",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: { deleted: true },
  });
};

// ✅ Upload booking Images
export async function uploadProductImages(req: Request, res: Response) {
  const productId = req.params["id"];
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const images = files.map((file) => {
      return {
        url: file.path,
        public_id: file.filename,
      };
    });
    // Optionally store image URLs in product record
    await Product.findByIdAndUpdate(productId, {
      $push: { images: { $each: images } },
    });

    return res
      .status(200)
      .json({ message: "Images uploaded successfully", images, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Image upload failed", error });
  }
}
