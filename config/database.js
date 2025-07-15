//importing Sequelize from the sequelize package

const { Sequelize } = require("sequelize");

const env = process.env.APP_ENV || "development";
const config = require("./config")[env];
const sequelize = new Sequelize(config);

module.exports = sequelize;
