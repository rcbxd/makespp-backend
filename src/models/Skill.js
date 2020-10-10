const sequelize = require("../util/db");
const { DataTypes, Sequelize } = require("sequelize");

const Skill = sequelize.define("Skill", {
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
    description: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    imageURL: {
        type: DataTypes.STRING,
        defaultValue: "",
    }
}, { freezeTableName: true });

module.exports = Skill;
