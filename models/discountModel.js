const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define("Discount", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        discount_percent: {
            type: DataTypes.DECIMAL(16,4),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive']
        }
    });

    Discount.associate = (models) => {
        Discount.hasMany(sequelize.define('Product',{
            foreignKey: 'discount_id',
            as: 'product_discount'
        }))
    }
    return Discount;
}