const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define("Color", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hex_pattern: {
            type: DataTypes.STRING
        }
    });

    Color.associate = (models) => {
        Color.hasMany(sequelize.define("Product"),{
            foreignKey: 'color_id',
            as: 'product_color'
        });
    }
    return Color;
}