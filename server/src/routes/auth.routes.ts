import { Router } from "express";
import { getRefreshAccessToken } from "../controllers/auth.controllers";

const router = Router();

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh authentication tokens
 *     description: Generates a new access token and refresh token using a valid refresh token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Valid JWT refresh token
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Newly issued access token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken:
 *                   type: string
 *                   description: Newly issued refresh token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: No refresh token provided
 *         content:
 *           application/json:
 *             example:
 *               message: No refresh token provided
 *       403:
 *         description: Invalid or expired refresh token
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid refresh token
 */
router.post("/refresh", getRefreshAccessToken);

export default router;
