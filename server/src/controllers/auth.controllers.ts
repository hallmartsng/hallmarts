import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAuthTokens } from "../utils/generateAuthToken";

// Refresh toekn user
export async function getRefreshAccessToken(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token provided" });

  try {
    // ✅ Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env["JWT_REFRESH_SECRET"] as string,
    ) as { userId: string; role: string };

    // ✅ Issue new access token
    const { accessToken, refreshAccessToken } = generateAuthTokens(
      decoded.userId,
      decoded.role,
    );

    return res.json({
      accessToken: accessToken,
      refreshToken: refreshAccessToken,
    });
  } catch (error) {
    return res.status(403).json({ message: error });
  }
}
