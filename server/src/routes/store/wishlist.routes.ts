import { Router } from "express";
import { toggleWishlist } from "../../controllers/store/wishlist.controllers";

const router = Router();

router.post("/toggle-wishlist", toggleWishlist);

export default router;
