import { Router } from "express";
import {
  getHomepageProducts,
  getProduct,
} from "../../controllers/store/products.controllers";

const router = Router();

router.get("/", getHomepageProducts);
router.get("/:productId", getProduct);

export default router;
