import { Schema, model } from 'mongoose';

const logSchema = new Schema({
  message: String,
  stack: String,
  route: String,
  method: String,
  status: Number,
  meta: Schema.Types.Mixed
}, { timestamps: true });

export default model('Log', logSchema);
