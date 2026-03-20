import express from 'express';
// import mongoose from 'mongoose';
const router = express.Router();
import authMiddle from '../middleware/authMiddleware.js';
import { createSub, getSubs, updateSub, deleteSub, getSummary } from '../controllers/subControllers.js';
// import User from '../models/User.js';
import Sub from '../models/Sub.js';

//Create a subscription
router.post('/', authMiddle, createSub)

// Get all subscriptions
router.get('/', authMiddle, getSubs)

//Update a subscription
router.put('/:id', authMiddle, updateSub)


//delete a subscription
router.delete('/:id', authMiddle, deleteSub)

//Summary
router.get('/summary', authMiddle, getSummary)

export default router;