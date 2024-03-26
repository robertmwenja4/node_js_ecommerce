const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define("Size", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        short_name: {
            type: DataTypes.STRING
        }
    });

    Size.associate = (models) => {
        Size.hasMany(sequelize.define("Product"),{
            foreignKey: 'size_id',
            as: 'product_size'
        });
    }
    return Size;
}