import express from 'express'
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
//


// const User = require('./models/User');
import User from './models/User.js';

const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();


env.config();
const PORT = process.env.PORT;
// const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



