

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        name: {
            type: DataTypes.STRING,
            notNull: false
        },
        email: {
            type: DataTypes.STRING,
            unque: true,
            required: true
        },
        password: {
            type: DataTypes.STRING
        }
    });

    User.associate = (models) =>{

    }
    
    return User;
}