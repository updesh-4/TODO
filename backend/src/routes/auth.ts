import { Router } from 'express';
import { signup, login, forgotPassword, resetPassword } from '../controllers/authController';
const r = Router();
r.post('/signup', signup);
r.post('/login', login);
r.post('/forgot', forgotPassword);
r.post('/reset', resetPassword);
export default r;
