import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user.model';
import { generateAuthTokens } from '../../utils/generateAuthToken';
// import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  //   const hash = await bcrypt.hash('Admin123!', 10);
  //   console.log(hash);
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email }).select('+password');

    console.log('user: ', user?.role);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    console.log('password: ', password);

    // 2️⃣ Compare password
    const isMatch = await user.comparePassword(password);
    console.log('isMatch: ', isMatch);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // 3️⃣ Generate tokens
    const { accessToken, refreshAccessToken } = generateAuthTokens(
      user._id.toString(),
      user.role
    );

    user.refreshToken = refreshAccessToken;
    await user.save();

    // 5️⃣ Send refresh token as httpOnly cookie (recommended)
    res.cookie('refreshToken', refreshAccessToken, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: process.env['NODE_ENV'] === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 6️⃣ Send response
    return res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Login failed',
      error,
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token provided',
      });
    }

    // 1️⃣ Verify refresh token
    const decoded = jwt.verify(
      token,
      process.env['JWT_REFRESH_SECRET'] as string
    ) as { userId: string };

    // 2️⃣ Find user
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }

    const { accessToken, refreshAccessToken } = generateAuthTokens(
      user._id.toString(),
      user.role
    );
    user.refreshToken = refreshAccessToken;
    await user.save();

    res.cookie('refreshToken', refreshAccessToken, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Refresh token expired or invalid',
    });
  }
};
