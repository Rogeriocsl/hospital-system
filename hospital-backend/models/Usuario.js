const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/database');

class Usuario extends Model {
  static async hashSenha(senha) {
    return await bcrypt.hash(senha, 10); // Hashing da senha
  }

  async validarSenha(senha) {
    return await bcrypt.compare(senha, this.senha); // Comparação da senha em texto simples com o hash
  }

  gerarToken() {
    return jwt.sign({ id: this.id, email: this.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}

Usuario.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nivelAcesso: {
    type: DataTypes.INTEGER, // Certifique-se de que o tipo está correto
    allowNull: false, // Se necessário
  },
}, {
  sequelize,
  modelName: 'Usuario',
});

module.exports = Usuario;
