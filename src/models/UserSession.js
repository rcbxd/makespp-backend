const sequelize = require("../util/db");
const { DataTypes, Sequelize } = require("sequelize");

const UserSession = sequelize.define("UserSession", {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
    },
    userID: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, { freezeTableName: true });

module.exports = UserSession;
