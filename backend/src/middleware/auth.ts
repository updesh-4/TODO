import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { verify } from '../utils/jwt';

export interface AuthedRequest extends Request { user?: any }

export const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'No token' });
    const token = auth.replace('Bearer ', '');
    // @ts-ignore
    const payload: any = verify(token);
    // @ts-ignore
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
