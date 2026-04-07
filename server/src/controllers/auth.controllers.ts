import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAuthTokens } from "../utils/generateAuthToken";

// Refresh toekn user
export const getRefreshAccessToken = async (req: Request, res: Response) => {
  console.log("req.body: ", req.body);

  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token provided" });

  try {
    // ✅ Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env["JWT_REFRESH_SECRET"] as string,
    ) as { vendorId: string; role: string };

    // ✅ Issue new access token
    const { accessToken, refreshAccessToken } = generateAuthTokens(
      decoded.vendorId,
      decoded.role,
    );

    return res.json({
      data: {
        accessToken: accessToken,
        refreshToken: refreshAccessToken,
      },
    });
  } catch (error) {
    return res.status(403).json({ message: error });
    // return res
    //   .status(403)
    //   .json({ message: "Invalid or expired refresh token" });
  }
};
