import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticateMiddleWare = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      res.status(401).json({ message: 'User is not logged in.' });
      return;
    }

    const token = header.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized: Token missing' });
      return;
    }

    const secret = process.env['JWT_SECRET'];
    if (!secret) {
      res
        .status(500)
        .json({ message: 'Server error: JWT secret not configured' });
      return;
    }

    const decoded = jwt.verify(token, secret) as {
      userId: string;
      role: string;
    };
    if (!decoded || !decoded.userId) {
      res.status(401).json({ message: 'Unauthorized: Invalid token payload' });
      return;
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
      });
      return;
    }
    req.userId = decoded.userId;
    next(); // ✅ Only reach next() after all checks
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

export default authenticateMiddleWare;
