import { Router } from "express";
import { vendorAuthenticateMiddleWare } from "../../middlewares/authenticate.middleware";
import { getVendorCustomers } from "../../controllers/vendor/customer.controllers";

const router = Router();

router.get("/", vendorAuthenticateMiddleWare, getVendorCustomers);

export default router;
