import { Router } from "express";
import { getVendorProfile } from "../../controllers/vendor/profile.controllers";
import { authenticateMiddleWare } from "../../middlewares/authenticate.middleware";

const router = Router();

router.get("/", authenticateMiddleWare, getVendorProfile);

export default router;
