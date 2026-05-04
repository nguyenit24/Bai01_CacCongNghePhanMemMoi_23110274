import { Sequelize } from 'sequelize';

// Khởi tạo instance Sequelize với các tham số từ config
const sequelize = new Sequelize('node_fulltack', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('>>> Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;