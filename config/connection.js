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
) : new Sequelize("mysql://x2h2xa2ceclb7uj7:u8lsk6by4jahdc02@exbodcemtop76rnz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/emunqlq3i5hs5iph");
module.exports = connection;