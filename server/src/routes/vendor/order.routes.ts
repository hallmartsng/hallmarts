import { Router } from "express";
import { vendorAuthenticateMiddleWare } from "../../middlewares/authenticate.middleware";
import { getVendorOrders } from "../../controllers/vendor/order.controllers";

const router = Router();

router.get("/", vendorAuthenticateMiddleWare, getVendorOrders);

export default router;
