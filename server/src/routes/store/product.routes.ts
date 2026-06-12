import { Router } from "express";
import {
  getFilteredproducts,
  getHomepageProducts,
  getProduct,
  getVendorProducts,
} from "../../controllers/store/products.controllers";

const router = Router();

router.get("/", getHomepageProducts);
router.get("/:productId", getProduct);
router.get("/vendor/:vendorId", getVendorProducts);
router.post("/filter", getFilteredproducts);

export default router;
