const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { login, register } = require('../controllers/authController');


// Rota para registro de usuários
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(senha, 10); // Criptografa a senha
    const newUser = await User.create({ nome, email, senha: hashedPassword });
    res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar o usuário' });
  }
});
  
router.post('/login', login);

module.exports = router;
