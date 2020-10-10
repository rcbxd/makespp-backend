const dotenv = require('dotenv').config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT
const DB_SSL = process.env.DB_SSL;

const Sequelize = require('sequelize');
const sequelize = new Sequelize('messaging-app',
    DB_USER || 'postgres',
    DB_PASSWORD || 'postgres',
    {
        host: DB_HOST || 'localhost',
        port: DB_PORT || 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: DB_SSL == 'true'
        },
        logging: false,
    });

module.exports = sequelize;