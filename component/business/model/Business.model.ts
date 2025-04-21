import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    business_name: {
        type: String,
        required:false
    },
    Business_logo: {
        type: String,
        required:false
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    is_super_admin: {
        type: Boolean,
        required: false,
        default: false
    },
    business_email: {
        type: String,
        required: false
    },
    business_phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    deleted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }, deleted_at: {
        type: Date,
        required: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },


},{timestamps:true})

const User = mongoose.model("User",userSchema)
export default User