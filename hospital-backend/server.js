require('dotenv').config(); // Carrega as variáveis de ambiente no início

const express = require('express');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();

// Middleware para parsear JSON
app.use(express.json());
// No servidor

app.use(cors({
  origin: 'http://192.168.1.152:3000'  // Origem permitida
}));

// Inicializa o Passport
app.use(passport.initialize());

// Sincronizar o banco de dados
sequelize.sync({ force: true })
  .then(() => console.log('Banco de dados criado e tabelas sincronizadas com sucesso!'))
  .catch(error => console.error('Erro ao sincronizar tabelas:', error));

app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error("Erro:", err.message);
  res.status(500).send("Erro interno no servidor.");
});


// Rotas de autenticação
app.use('/auth', authRoutes);

// Rota protegida de exemplo
app.get('/api/protegida', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ mensagem: 'Acesso autorizado à rota protegida!', usuario: req.user });
});

app.post('/auth/register', async (req, res) => {
  try {
      // Suponha que haja uma operação de criação de usuário
      const novoUsuario = await Usuario.create({
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha
      });
      res.status(201).json(novoUsuario);
  } catch (error) {
      console.error("Erro ao registrar usuário:", error.message);
      res.status(500).json({ error: "Erro interno do servidor" });
  }
});


// Inicializa o servidor
const PORT = process.env.PORT || 5000; // Usa a porta definida no .env ou 5000 como padrão
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
