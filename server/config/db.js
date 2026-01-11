import mongoose from 'mongoose';
import env from 'dotenv';
//const env = require('dotenv');
env.config();
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async function (){
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDB;