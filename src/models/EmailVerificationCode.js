const sequelize = require("../util/db");
const { DataTypes, Sequelize } = require("sequelize");

const EmailVerificationCode = sequelize.define("EmailVerificationCode", {
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
    skillCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
    }
}, { freezeTableName: true });

module.exports = EmailVerificationCode;
