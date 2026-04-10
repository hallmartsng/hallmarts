import { Router } from "express";
import {
  getShippingAddress,
  updateShippingAddress,
} from "../../controllers/shipping/shipping.controllers";
import { userAuthenticateMiddleWare } from "../../middlewares/authenticate.middleware";

const router = Router();

router.get("/", userAuthenticateMiddleWare, getShippingAddress);
router.post("/", userAuthenticateMiddleWare, updateShippingAddress);

export default router;
