import mongoose from 'mongoose';
// import User from './User.js';
// import env from 'dotenv';
// env.config();
// const MONGO_URI = process.env.MONGO_URI;

const SubSchema = new mongoose.Schema({
    name: { type: String, required: true},
    startdate: { type: Date, required: true},
    nextbilldate: { type: Date, required: true},
    amount: { type: Number, required: true},
    billcycle: { type: String, required: true},
    active: { type: Boolean, default: true},    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
}, { timestamps: true })

const Subscription = mongoose.model("Subscription", SubSchema);

export default Subscription;