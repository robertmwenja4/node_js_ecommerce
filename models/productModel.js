

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
        Product.hasMany(sequelize.define("OrderItem"),{
            foreignKey: 'product_id',
            as: 'order_items'
        });
        Product.belongsTo(sequelize.define("Discount", {
            foreignKey: 'discount_id',
            as: 'discount'
        }));
        Product.belongsTo(sequelize.define("Color", {
            foreignKey: 'color_id',
            as: 'color'
        }));
        Product.belongsTo(sequelize.define("Size", {
            foreignKey: 'size_id',
            as: 'size'
        }));
    }

    return Product;
}