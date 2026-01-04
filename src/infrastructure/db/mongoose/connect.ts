import mongoose from "mongoose";

export const connectToMongoDB = async (): Promise<void> => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined");
    }

    try {
        await mongoose.connect(mongoUri, {
            autoIndex: false,          // ✅ important for production
            serverSelectionTimeoutMS: 5000
        });

        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection failed", error);
        process.exit(1);
    }
};
