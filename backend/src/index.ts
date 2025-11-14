import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import todoRoutes from './routes/todos';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => res.send('ok'));
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
if (!process.env.MONGO_URI) console.warn('MONGO_URI not set. Set it in .env');
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app')
  .then(() => {
    app.listen(PORT, () => console.log('Server up', PORT));
  })
  .catch(err => {
    console.error('Failed to connect DB', err);
    process.exit(1);
  });
