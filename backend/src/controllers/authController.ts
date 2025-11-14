import { Request, Response } from 'express';
import User from '../models/User';
import { sign } from '../utils/jwt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already' });
  const user = await User.create({ email, password, name });
  const token = sign({ id: user._id });
  res.json({ token, user: { email: user.email, name: user.name } });
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid' });
  // @ts-ignore
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ message: 'Invalid' });
  const token = sign({ id: user._id });
  res.json({ token, user: { email: user.email, name: user.name } });
}

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: 'If account exists, reset link will be sent' });
  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60);
  await user.save();

  // Try to send email if SMTP configured
  try {
    if (process.env.SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset?token=${token}`;
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: 'Password reset',
        text: `Reset your password: ${resetLink}`
      });
    }
  } catch (e) {
    console.error('Failed to send email', e);
  }

  // For testing we return the token
  res.json({ message: 'Reset token created', resetToken: token });
}

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;
  const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: new Date() } });
  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  user.password = password;
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();
  res.json({ message: 'Password reset success' });
}
