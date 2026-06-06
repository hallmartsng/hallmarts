import { Router } from "express";
import {
  getVendorProfile,
  getVendorPublicProfile,
  storeLogoUpload,
  updateVendorProfile,
  updateVendorStoreLogo,
} from "../../controllers/vendor/profile.controllers";
import { vendorAuthenticateMiddleWare } from "../../middlewares/authenticate.middleware";

const router = Router();

router.get("/", vendorAuthenticateMiddleWare, getVendorProfile);
router.get("/:id/public", getVendorPublicProfile);
router.post("/update", vendorAuthenticateMiddleWare, updateVendorProfile);

router.post(
  "/store-logo/upload/",
  vendorAuthenticateMiddleWare,
  storeLogoUpload.single("logo"),
  updateVendorStoreLogo,
);

export default router;
