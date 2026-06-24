import { Router } from "express";
import {
  getAllCategories,
  getCategorySummary,
} from "../../controllers/store/categories.controllers";

const router = Router();

router.get("/", getAllCategories);
router.get("/summary", getCategorySummary);

export default router;
