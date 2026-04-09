import { Router } from "express";
import { getHomepageProducts } from "../../controllers/store/products.controllers";

const router = Router();

router.get("/", getHomepageProducts);

export default router;
