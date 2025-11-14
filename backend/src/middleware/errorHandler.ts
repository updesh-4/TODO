import { Request, Response, NextFunction } from 'express';
import Log from '../models/Log';

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
  try {
    await Log.create({
      message: err.message,
      stack: err.stack,
      route: req.originalUrl,
      method: req.method,
      status: err.status || 500
    });
  } catch (e) {
    console.error('Failed to log error', e);
  }
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal error' });
}
