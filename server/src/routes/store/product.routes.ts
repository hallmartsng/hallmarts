import { Router } from "express";
import {
  getHomepageProducts,
  getProduct,
  getVendorProducts,
} from "../../controllers/store/products.controllers";

const router = Router();

router.get("/", getHomepageProducts);
router.get("/:productId", getProduct);
router.get("/vendor/:vendorId", getVendorProducts);

export default router;
