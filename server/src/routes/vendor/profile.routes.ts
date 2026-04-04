import { Router } from "express";
import { getVendorProfile } from "../../controllers/vendor/profile.controllers";
import { vendorAuthenticateMiddleWare } from "../../middlewares/authenticate.middleware";

const router = Router();

router.get("/", vendorAuthenticateMiddleWare, getVendorProfile);

export default router;
