import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import env from 'dotenv';

env.config();
const MONGO_URI = process.env.MONGO_URI;

const UserSchema = new mongoose.Schema({
    fullname: { type: String},
    email: { type: String, unique: true, required: [true, 'Email is required'], lowercase: true, match: [/\S+@\S+\.\S+/, 'is invalid'] },
    password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
    //createdAt: { type: Date, default: Date.now }

}, 
{ timestamps: true });




const User = mongoose.model("User", UserSchema);


export default User;