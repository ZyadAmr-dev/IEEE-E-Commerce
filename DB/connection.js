import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

export const connectDB = async() => {
    return await mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log("connected to atlas successfully"))
    .catch((err) => console.log("error in connection with atlas: ", err))
}