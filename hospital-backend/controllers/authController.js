const User = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao registrar o usuário', details: error });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: 'Admin registrado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao registrar o Admin', details: error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const payload = { id: user.id, name: user.name, nivelAcesso: user.nivelAcesso }; // Inclui o nível de acesso
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login bem-sucedido',
      token, // Certifique-se de que o token está sendo retornado corretamente
      user: { id: user.id, name: user.name, nivelAcesso: user.nivelAcesso } // Retorna o usuário também
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no processo de login', details: error });
  }
};

