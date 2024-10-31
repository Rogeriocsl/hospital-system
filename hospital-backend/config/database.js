const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega as variáveis do .env

const sequelize = new Sequelize(
  process.env.DB_NAME, // hospital_municipal
  process.env.DB_USER, // root
  process.env.DB_PASSWORD, // 123456
  {
    host: process.env.DB_HOST, // localhost
    dialect: 'mysql', // Especifica o MySQL
    port: process.env.DB_PORT || 3312, // Porta padrão ou porta definida no .env
    logging: false, // Desabilita logs de SQL para mais clareza, opcional
  }
);

module.exports = sequelize;
