import express from 'express'
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
//


// const User = require('./models/User');
import User from './models/User.js';

import connectDB from './config/db.js';

env.config();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB()
.then(()=> {
    app.on("error", (error) => {
        console.error("Error Connecting to MongoDB: ", error);
        throw error;
    })
})
.then(() => {
    app.listen(PORT || 8000, () => {
        console.log(`Server is running on port ${PORT || 8000}`);
    })
})
.catch( (error) => {
    console.error("Error starting the server: ", error);
})



// const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



