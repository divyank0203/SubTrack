// import express from 'express';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();
const JWT_SECRET = process.env.JWT_SECRET;
// import User from '../models/User.js';

const authMiddle = (req, res, next) => {
    try{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided"
        })
    }
    // token format = "Bearer <token>"
    const token = authHeader.split(' ')[1]; // get the token string
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info to request object
    
    next();
}
catch(error){
    return res.status(401).json({
        success: false,
        message: "Invalid Token"
    });
}
}

// We get token from - req.cookie.access_token;


export default authMiddle;