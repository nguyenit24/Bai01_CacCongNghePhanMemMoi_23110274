import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Thay chuỗi này bằng Connection String từ MongoDB Atlas của bạn
        const uri = process.env.MONGO_URI;
        
        await mongoose.connect(uri);
        console.log('>>> Connected to MongoDB Cloud Atlas successfully!');
    } catch (error) {
        console.error('Connection error:', error);
    }
}

export default connectDB;