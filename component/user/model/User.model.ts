import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "pending", "rejected"],
        default: "pending"
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    prifle_picture: {
        type: String,
    },
     deleted_at: {
        type: Date,
        required: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },


}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User