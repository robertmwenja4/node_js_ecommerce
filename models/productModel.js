

module.exports = (sequelize, DataTypes) =>{
    const Product = sequelize.define('Product',{
        name: {
            type: DataTypes.STRING,
            notNull: false
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        sku: {
            type: DataTypes.STRING,
            unique:true
        },
        description: {
            type: DataTypes.TEXT
        },
        discount_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        material: {
            type: DataTypes.STRING
        },
        size_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(16,4),
            allowNull: false
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    Product.associate = (models) =>{
        
    }

    return Product;
}