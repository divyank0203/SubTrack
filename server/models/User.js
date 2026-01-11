import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import env from 'dotenv';

env.config();
const MONGO_URI = process.env.MONGO_URI;

const UserSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: false },
    email: { type: String, unique: true},
    password: { type: String, required: true, minlength: 6, select: false },
    createdAt: { type: Date, default: Date.now }

}, 
{ timestamps: true });


// Pre-save hook to hash password before saving
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", UserSchema);


export default User;