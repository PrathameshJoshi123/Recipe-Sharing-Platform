const mongoose = require('mongoose')
const path = require('path');
const dotenv = require('dotenv');

// Set the path to the .env file
const envPath = path.resolve(__dirname, '../.env');

// Load environment variables from .env file
dotenv.config({ path: envPath });

const connectDb = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log("Database connected successfully", conn.connection.host)
    } catch(err){
        console.log("Error in connecting to the database", err)
    }
}

module.exports = {connectDb}