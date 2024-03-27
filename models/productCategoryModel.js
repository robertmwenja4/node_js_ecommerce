

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }
    });
    Category.associate = (models) => {

    }
    return Category;
}