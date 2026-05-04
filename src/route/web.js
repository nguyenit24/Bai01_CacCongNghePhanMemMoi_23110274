import express from "express"; // gọi Express
import homeController from "../controller/homeController"; // gọi controller

let router = express.Router(); // khởi tạo Route

let initWebRoutes = (app) => {
    // cách 1: viết trực tiếp function xử lý tại route
    router.get('/', (req, res) => {
        return res.send('Nguyễn Hữu Trung');
    });

    // cách 2: gọi hàm từ controller (khuyên dùng để code sạch hơn)
    router.get('/home', homeController.getHomePage); // url cho trang chủ
    router.get('/about', homeController.getAboutPage); // url cho trang about
    
    // Các route cho CRUD
    router.get('/crud', homeController.getCRUD); // url hiển thị form tạo
    router.post('/post-crud', homeController.postCRUD); // url nhận data tạo mới
    router.get('/get-crud', homeController.getFindAllCrud); // url lấy danh sách
    router.get('/edit-crud', homeController.getEditCRUD); // url sửa
    router.post('/put-crud', homeController.putCRUD); // url cập nhật
    router.get('/delete-crud', homeController.deleteCRUD); // url xóa

    return app.use("/", router); // định nghĩa url mặc định bắt đầu bằng /
}

module.exports = initWebRoutes;