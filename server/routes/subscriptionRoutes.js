import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import authMiddle from '../middleware/authMiddleware';
import User from '../models/User.js';
import Sub from '../models/Sub.js';

router.post('/addsub', authMiddle, async (req, res) => {
    try{
        const { name, startdate, nextbilldate, amount, billcycle, active } = req.body;
        if(!name || !startdate || !nextbilldate || !amount || !billcycle){
            return res.status(400).json({
                success: false,
                message: "Please provide all required information"
            })
        }
        const userId = req.user.id;
        const newSub = await Sub.create({
            name, startdate, nextbilldate, amount, billcycle, active, user: userId
        });
        return res.status(201).json({
            success: true,
            message: "Subscription added successfully",
            sub: newSub
        })
    }
    catch(error){
        console.error("Error adding subscription: ", error);
        return res.status(500).json({
            success: false, 
            message: "Server error while adding subscription"
        })
    }
})