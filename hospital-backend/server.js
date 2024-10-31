const express = require('express');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(passport.initialize());

// Sincronizar o banco de dados
sequelize.sync()
  .then(() => console.log('Tabelas sincronizadas com sucesso!'))
  .catch(error => console.error('Erro ao sincronizar tabelas:', error));

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
