import { Router } from "express";
import {
  userLogin,
  userRegistration,
} from "../../controllers/users/auth.controllers";

const router = Router();

router.post("/register", userRegistration);
router.post("/login", userLogin);

export default router;
