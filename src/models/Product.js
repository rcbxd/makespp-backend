const sequelize = require("../util/db");
const { DataTypes, Sequelize } = require("sequelize");

const Product = sequelize.define("Product", {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
    },
    skillCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    }
}, { freezeTableName: true });

module.exports = Product;
