import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    isConfirmed: {
        type: Boolean,
        default: false
    }, 
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }, 
    forgetCode: {
        type: String,
    },
    profileImage: {
        url: {
            type: String,
            default: "https://res.cloudinary.com/djwocx1ej/image/upload/v1728496662/default-avatar-icon-of-social-media-user-vector_txpkqf.jpg"
        },
        id: {
            type: String,
            default: "default-avatar-icon-of-social-media-user-vector_txpkqf"
        }
    },
    coverImages: [{
        url: { type: String },
        id: { type: String }
    }]
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
