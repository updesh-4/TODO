import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  email: string;
  password: string;
  name?: string;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  resetToken: String,
  resetTokenExpiry: Date
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  // @ts-ignore
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidate: string) {
  // @ts-ignore
  return bcrypt.compare(candidate, this.password);
}

export default model<IUser & { comparePassword?: (p: string) => Promise<boolean> }>('User', userSchema);
