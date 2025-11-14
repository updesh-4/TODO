import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'secret';
export const sign = (payload: any) => jwt.sign(payload, SECRET, { expiresIn: '7d' });
export const verify = (token: string) => jwt.verify(token, SECRET);
