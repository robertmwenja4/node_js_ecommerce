const dbConfig = require('../config/dbConfig.js')
const {Sequelize, DataTypes} = require('sequelize');


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            dialect: dbConfig.pool.dialect,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(()=>{
    console.log('Connected .....');
})
.catch(err => {
    console.log(`Error is: ${err}`);
});

const db = {};


db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, DataTypes);
db.products = require('./productModel.js')(sequelize, DataTypes);
db.orders = require('./orderModel.js')(sequelize, DataTypes);
db.order_items = require('./orderItemModel.js')(sequelize, DataTypes);
db.discounts = require('./discountModel.js')(sequelize, DataTypes);
db.colors = require('./colorModel.js')(sequelize, DataTypes);
db.sizes = require('./sizeModel.js')(sequelize, DataTypes);

//Sync
db.sequelize.sync({ force: false})
.then(()=>{
    console.log('Yes sync Done');
}).catch(err=>console.log(err))


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;