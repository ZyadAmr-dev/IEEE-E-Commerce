import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isValid: {
        type: Boolean,
        default: true
    },
    agent: {
        type: String,
    },
    expiredAt: {
        type: String
    }
}, { timestamps: true });

export const Token = mongoose.model("Token", tokenSchema);
