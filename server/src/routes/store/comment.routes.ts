import { Router } from "express";
import {
  createComment,
  getComments,
} from "../../controllers/store/comment.controllers";
import { userAuthenticateMiddleWare } from "../../middlewares/authenticate.middleware";

const router = Router();

router.post("/", userAuthenticateMiddleWare, createComment);
router.get("/:productId", getComments);

export default router;
