const dotenv = require('dotenv');
dotenv.config();
module.exports = {

    HOST : "localhost",
    USER: "root",
    PASSWORD: '',
    DB: 'node_ecommerce_db',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}