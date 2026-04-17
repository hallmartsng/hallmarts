import { Router } from "express";
import { checkout } from "../../controllers/store/checkout.controllers";
import { userAuthenticateMiddleWare } from "../../middlewares/authenticate.middleware";
import { paymentWebhook } from "../../webhooks/payment.webhook";

const router = Router();

router.post("/", userAuthenticateMiddleWare, checkout);
router.post("/payments/webhook", paymentWebhook);

export default router;
