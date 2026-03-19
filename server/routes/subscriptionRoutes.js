import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import authMiddle from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Sub from '../models/Sub.js';

router.post('/', authMiddle, async (req, res) => {
    try{
        const { name, startdate, amount, billcycle } = req.body;
        if(!name || !startdate || !amount || !billcycle){
            return res.status(400).json({
                success: false,
                message: "Please provide all required information"
            })
        }
        let nextbilldate = new Date(startdate);
        if(billcycle === "Monthly"){
            nextbilldate.setMonth(nextbilldate.getMonth() + 1);
        }
        else if(billcycle === "Weekly"){
            nextbilldate.setDate(nextbilldate.getDate() + 7);
        }
        else if(billcycle === "Yearly"){
            nextbilldate.setFullYear(nextbilldate.getFullYear() + 1);
        }
        // let active = true;
        // if(nextbilldate < new Date()){
        //     active = false;
        // }
        
        const newSub = await Sub.create({
           userId: req.user.id, name, startdate, nextbilldate, amount, billcycle, active: true
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

router.get('/', authMiddle, async (req, res) => {
    try{
        const userId = req.user.id;
        const subs = await Sub.find({ userId });
        
        return res.status(200).json({
            success: true,
            Subscriptions: subs

        });
    }
    catch(error){
        console.error("Error fetching subscriptions: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching subscriptions"
        })
    }
})

export default router;