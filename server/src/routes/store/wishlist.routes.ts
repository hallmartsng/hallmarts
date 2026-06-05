import { Router } from "express";
import {
  getWishlist,
  toggleWishlist,
} from "../../controllers/store/wishlist.controllers";
import { userAuthenticateMiddleWare } from "../../middlewares/authenticate.middleware";

const router = Router();

router.get("/", userAuthenticateMiddleWare, getWishlist);
router.patch("/toggle-wishlist", userAuthenticateMiddleWare, toggleWishlist);

export default router;
