import { Router } from "express";
import { getUserOrders } from "../../controllers/users/order.controllers";
import { userAuthenticateMiddleWare } from "../../middlewares/authenticate.middleware";

const router = Router();

router.get("/", userAuthenticateMiddleWare, getUserOrders);

export default router;
