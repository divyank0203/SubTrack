import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser } from '../controllers/authController.js';
import env from 'dotenv';
env.config();
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();



//Register
router.post('/register', registerUser);


//Login
router.post('/login', loginUser);
               

export default router;