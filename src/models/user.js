import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true // Đảm bảo email không bị trùng
    },
    password: { 
        type: String, 
        required: true 
    },
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    gender: {
        type: Boolean,
        default: false // false: Male, true: Female
    },
    image: String,
    roleId: String,
    positionId: String
}, { 
    // Tự động tạo createdAt và updatedAt giống như Sequelize
    timestamps: true 
});

const User = mongoose.model('User', userSchema);
export default User;