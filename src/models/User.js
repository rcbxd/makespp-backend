const sequelize = require("../util/db");
const { DataTypes, Sequelize } = require("sequelize");

const User = sequelize.define("User", {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        default: "",
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        default: "",
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        default: "",
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
}, { freezeTableName: true });

module.exports = User;
