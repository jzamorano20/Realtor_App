const { Sequelize } = require('sequelize');
require('dotenv').config();
const PORT = process.env.PORT;
const connection = !PORT ? new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: '127.0.0.1',
    dialect: 'mysql'
  }
) : new Sequelize(process.env.JAWS_DB_URL);
module.exports = connection;