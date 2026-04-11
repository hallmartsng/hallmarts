import { Router } from "express";
import { userAuthenticateMiddleWare } from "../../middlewares/authenticate.middleware";
import {
  getUserProfile,
  updateUserProfile,
} from "../../controllers/users/profile.controllers";

const router = Router();

router.get("/", userAuthenticateMiddleWare, getUserProfile);
router.post("/update", userAuthenticateMiddleWare, updateUserProfile);

export default router;
