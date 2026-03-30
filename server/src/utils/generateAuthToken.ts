import jwt from 'jsonwebtoken';

export const generateAuthTokens = (userId: string, role: string) => {
  const accessToken = jwt.sign({ userId, role }, process.env['JWT_SECRET']!, {
    expiresIn: '1hr',
  }); // short-lived
  const refreshAccessToken = jwt.sign(
    { userId },
    process.env['JWT_REFRESH_SECRET']!,
    { expiresIn: '7d' }
  ); // long-lived
  return { accessToken, refreshAccessToken };
};
