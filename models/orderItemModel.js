const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
        order_id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        qty: {
            type: DataTypes.DECIMAL(16,4)
        },
        price: {
            type: DataTypes.DECIMAL(16,4)
            
        }
    })

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(sequelize.define("Order"), {
            foreignKey: "order_id",
            as : 'orders'
        });
        OrderItem.belongsTo(sequelize.define("Product"),{
            foreignKey: 'product_id',
            as: 'products'
        });
    }
    return OrderItem;
}