const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors'); // Importa a biblioteca CORS

const { Sequelize } = require('sequelize');
require('dotenv').config();
app.use(express.json());

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

app.use(cors());

module.exports = { sequelize };

sequelize.authenticate().then(() => {
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
}).catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
});


const Paciente = require('./models/Paciente');

// Criar paciente
app.post('/pacientes', async (req, res) => {
  console.log('Dados recebidos:', req.body); // Verifique se os dados estão chegando aqui
  try {
    const paciente = await Paciente.create(req.body);
    res.status(201).json(paciente);
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    if (error.errors) {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


// Listar pacientes
app.get('/pacientes', async (req, res) => {
  const pacientes = await Paciente.findAll();
  res.json(pacientes);
});


sequelize.sync().then(() => {
  console.log('Tabelas sincronizadas');
});





app.use(express.json());

app.get('/', (req, res) => {
  res.send('API do Hospital Municipal');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
