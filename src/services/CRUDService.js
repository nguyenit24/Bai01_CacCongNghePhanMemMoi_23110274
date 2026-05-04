import bcrypt from 'bcryptjs';
import User from '../models/user'; // Import Model Mongoose bạn đã định nghĩa

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    try {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId
        });
        return 'OK create a new user successfully';
    } catch (e) {
        throw e;
    }
}

let getAllUser = async () => {
    try {
        // .lean() giúp lấy data nhẹ hơn, tương đương raw: true của Sequelize
        return await User.find().lean();
    } catch (e) {
        throw e;
    }
}

let getUserInfoById = async (userId) => {
    try {
        let user = await User.findById(userId).lean();
        return user ? user : {};
    } catch (e) {
        throw e;
    }
}

let updateUser = async (data) => {
    try {
        // MongoDB dùng _id, và Mongoose dùng findByIdAndUpdate cho gọn
        const userId = data.id || data._id;
        await User.findByIdAndUpdate(userId, {
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address
        });
        return await User.find().lean();
    } catch (e) {
        throw e;
    }
}

let deleteUserById = async (userId) => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (e) {
        throw e;
    }
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUser,
    deleteUserById
}