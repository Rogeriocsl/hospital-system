const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');


// Rota para registro de usuários
router.post('/register', async (req, res) => {
  const { nome, email, senha,  } = req.body;

  try {
    const hashedPassword = await Usuario.hashSenha(senha); // Certifique-se de que a senha está sendo hashada
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hashedPassword, // Armazena a senha como hash
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.post('/register-admin', async (req, res) => {
  const { nome, email, senha, nivelAcesso } = req.body;

  // Verifique se nivelAcesso foi fornecido
  if (nivelAcesso === undefined) {
    return res.status(400).json({ error: "nivelAcesso é obrigatório" });
  }

  try {
    const hashedPassword = await Usuario.hashSenha(senha); // Certifique-se de que a senha está sendo hashada
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hashedPassword,
      nivelAcesso,
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

  
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  // Verifica se email e senha foram fornecidos
  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    
    // Verifica se o usuário foi encontrado
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
    }

    // Chama a função de validação da senha
    const isMatch = await usuario.validarSenha(senha); 
    if (!isMatch) {
      return res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
    }

    const token = usuario.gerarToken();
    res.json({ token, usuario });
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    res.status(500).json({ error: "Erro interno do servidor", detalhes: error.message });
  }
});


module.exports = router;
