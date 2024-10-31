// models/Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Garante que o e-mail seja único
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Usuario;
