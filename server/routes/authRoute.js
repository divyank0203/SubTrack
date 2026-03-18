import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();



//Register
router.post('/register', async (req, res, next) => {
    try{
        const {fullname, email, password } = req.body;
        if(!fullname || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            })
        }
        const existingUser = await User.findOne({ email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const NewUser = await User.create({
            fullname, email, password: hashedPassword
        })
        return res.status(201).json({
            success: true,
            message: "User created successfully",
        })
    }
    catch(error){
        console.error("Error during registration: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error during registration",
        })
    }
})

export default router;