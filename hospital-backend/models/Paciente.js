const { DataTypes } = require('sequelize');
const sequelize = require('../server').sequelize;

const Paciente = sequelize.define('Paciente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('nome', value.trim().toUpperCase());
    }
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [11, 11], // Garante que o CPF tenha exatamente 11 dígitos
      is: /^[0-9]{11}$/, // Garante que o CPF contenha apenas números
      isCpfValid(value) {
        // Função para validar CPF (opcional: implemente uma lógica para validar CPFs válidos)
        if (!validarCpf(value)) {
          throw new Error('CPF inválido');
        }
      }
    }
  },
  dataNascimento: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isBefore: new Date().toISOString(), // Garante que a data de nascimento não seja no futuro
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true // Garante que o valor seja um email válido
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [10, 11], // Número de telefone pode ter 10 ou 11 dígitos
      is: /^[0-9]{10,11}$/ // Garante que o telefone contenha apenas números
    }
  }
}, {
  hooks: {
    beforeSave: (paciente) => {
      // Remover máscara de CPF antes de salvar
      paciente.cpf = paciente.cpf.replace(/\D/g, '');
    }
  }
});

function validarCpf(cpf) {
  // Implementação de validação de CPF real (opcional)
  // Retorne true se o CPF for válido, false se for inválido
  return true; // Simples placeholder
}

module.exports = Paciente;
