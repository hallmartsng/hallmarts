import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config";
import { AuthRequestType } from "../middlewares/authenticate.middleware";
import { Vendor } from "../models/vendor.models";

// export const productMediaStorage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req: AuthRequest, file) => {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       throw new Error("product not found");
//     }

//     console.log("File in productMediaStorage:", file);

//     const vendorId = product.vendor.toString();

//     return {
//       folder: `products/${vendorId}/${product._id}/originals`,
//       resource_type: "auto",
//       // allowed_formats: ["jpg", "jpeg", "png"],
//       public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
//     };
//   },
// });

// export const userProfileMediaStorage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req: AuthRequest, file) => {
//     const userId = req.userId;

//     const user = await User.findById(userId);
//     if (!user) {
//       throw new Error("User not found");
//     }

//     return {
//       folder: `users/${userId}/profile`,
//       resource_type: "auto",
//       allowed_formats: ["jpg", "jpeg", "png", "webp"],
//       public_id: `profile-${Date.now()}-${file.originalname.split(".")[0]}`,
//     };
//   },
// });
export const storeLogoStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req: AuthRequestType, file) => {
    const vendorId = req.userId;

    const vendor = await Vendor.findById({ _id: vendorId });
    if (!vendor) {
      throw new Error("User not found");
    }

    return {
      folder: `vendors/${vendor._id}/logo`,
      resource_type: "auto",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});
