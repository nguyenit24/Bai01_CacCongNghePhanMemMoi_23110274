import db from '../models/index'; // import database
import CRUDService from '../services/CRUDService'; // import service

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); // lấy dữ liệu trực tiếp từ model
        return res.render('homepage.ejs', {
            data: JSON.stringify(data) // trả dữ liệu về view dưới dạng chuỗi JSON
        });
    } catch (e) {
        console.log(e);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body); // gọi service xử lý logic lưu
    console.log(message);
    return res.send('Post crud to server');
}

let getFindAllCrud = async (req, res) => {
    let data = await CRUDService.getAllUser(); // gọi service lấy dữ liệu
    return res.render('users/findAllUser.ejs', {
        datalist: data // truyền biến datalist sang file EJS
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id; // lấy id từ URL (?id=...)
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('users/editUser.ejs', {
            data: userData
        });
    } else {
        return res.send('Không lấy được id');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body; // lấy dữ liệu từ form sửa
    let data1 = await CRUDService.updateUser(data); // gọi service update
    return res.render('users/findAllUser.ejs', {
        datalist: data1 // sau khi update xong thì hiển thị lại danh sách mới
    });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id; // lấy id cần xóa từ URL
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Deleted!!!!!!!!!!!!!');
    } else {
        return res.send('Not find user');
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getFindAllCrud: getFindAllCrud,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}