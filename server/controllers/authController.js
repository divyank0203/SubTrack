import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();
const JWT_SECRET = process.env.JWT_SECRET;


const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Enter all required fields"
            })
        }
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name, email, password: hashedPassword
        })
        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        })
    }
    catch(error){
        console.error("Error during registration: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Enter all required fields"
            })
        }
        const existingUser = await User.findOne({ email }).select('+password');
        if(!existingUser){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const validpassword = await bcrypt.compare(password, existingUser.password);
        if(!validpassword){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const token = jwt.sign({
            id: existingUser._id,
            email: existingUser.email
        }, JWT_SECRET,
    {
            expiresIn: '1h'
    })
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        })
    }
    catch(error){
        console.error("Error during login: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export { registerUser, loginUser };