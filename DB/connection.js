import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
            serverSelectionTimeoutMS: 20000
        });
        console.log("Connected to Atlas successfully");
    } catch (err) {
        console.log("Error in connection with Atlas:", err);
    }
};
