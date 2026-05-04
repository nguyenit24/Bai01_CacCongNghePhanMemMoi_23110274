import bcrypt from 'bcryptjs'; // import thư viện mã hóa
import db from '../models/index'; // import database

const salt = bcrypt.genSaltSync(10); // thuật toán hash password

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })
            resolve('OK create a new user successfully');
        } catch (e) {
            reject(e);
        }
    })
}

// Hàm bổ trợ để hash mật khẩu (bạn cần viết thêm hàm này bên dưới)
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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true, // Trả về dữ liệu JS thuần, không bao gồm các thuộc tính thừa của Sequelize
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            });

            if (user) {
                resolve(user);
            } else {
                resolve([]); // Trả về mảng rỗng nếu không tìm thấy
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            });

            if (user) {
                // Cập nhật các trường dữ liệu
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save(); // Lưu thay đổi vào Database

                // Sau khi cập nhật, lấy lại danh sách mới để hiển thị
                let allusers = await db.User.findAll();
                resolve(allusers);
            } else {
                resolve(); // Trả về rỗng nếu không tìm thấy user để update
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Tìm user dựa trên ID truyền vào
            let user = await db.User.findOne({
                where: { id: userId }
            })

            // Nếu tìm thấy user thì thực hiện xóa
            if (user) {
                await user.destroy();
            }

            resolve(); // Tương đương với lệnh return để báo kết thúc xử lý
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUserById: deleteUserById
}