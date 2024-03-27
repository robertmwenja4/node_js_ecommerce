

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        user_id: {
            type: DataTypes.BIGINT(20),
            allowNull: false
        },
        total_price: {
            type: DataTypes.DECIMAL(16,4),
            allowNull: false
        },
        payment_id: {
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        status: {
            type: DataTypes.ENUM,
            values: [
                'pending','processing','backordered','onhold','shipped',
                'delivered','cancelled','returned','refunded','completed'
            ]
        }
    });

    Order.associate = (models) =>{
        Order.hasMany(sequelize.define('OrderItem'), {
            foreignKey: 'order_id',
            as : 'order_items'
        });
    }
    return Order;
}