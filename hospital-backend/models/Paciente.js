const { DataTypes } = require('sequelize');
const sequelize = require('../index').sequelize;

const Paciente = sequelize.define('Paciente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [11, 11], // Garante que o CPF tenha exatamente 11 dígitos
      is: /^[0-9]{11}$/ // Garante que o CPF contenha apenas números
    }
  },
  dataNascimento: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true // Garante que o valor seja uma data válida
    }
  }
});

module.exports = Paciente;
