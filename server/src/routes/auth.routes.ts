import { Router } from "express";
import { getRefreshAccessToken } from "../controllers/auth.controllers";

const router = Router();

router.post("/refresh", getRefreshAccessToken);
