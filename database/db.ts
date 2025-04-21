import mongoose  from "mongoose";

const connectDB = async() => {
try {
    const uri = process.env.MONGO_URI
    await mongoose.connect(uri)
} catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
}
}

export default connectDB
