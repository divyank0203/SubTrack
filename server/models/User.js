import mongoose from 'mongoose';
import env from 'dotenv';

env.config();
const MONGO_URI = process.env.MONGO_URI;

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: false },
    email: { type: String, unique: true},
    password: { type: String, required: true, minlength: 6, select: false },
    createdAt: { type: Date, default: Date.now }

})

const User = mongoose.model("User", UserSchema);


export default User;