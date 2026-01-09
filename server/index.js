const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

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



