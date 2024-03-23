

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
        }
    });

    Order.associate = (models) =>{

    }
    return Order;
}