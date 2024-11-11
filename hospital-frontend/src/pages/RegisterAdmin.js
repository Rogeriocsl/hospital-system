import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegisterAdmin = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Verifique se os campos obrigatórios estão preenchidos
    if (!nome || !sobrenome || !email || !senha || !telefone || !nivelAcesso || !departamento) {
      setError('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }
  
    // Verificação se as senhas coincidem
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }
  
    // Validar formato de email e outros dados conforme necessário
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Padrão de email
    if (!emailPattern.test(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }
  
    try {
      await api.post(`${process.env.REACT_APP_API_URL}/auth/register-admin`, {
        nome,
        sobrenome,
        email,
        senha,
        telefone,
        nivelAcesso,
        departamento,
      });
      navigate('/login'); // Redireciona para a página de login
    } catch (err) {
      console.error('Erro ao registrar administrador:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Erro no registro. Tente novamente.');
    }
  };
  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{ backgroundImage: `url('/assets/back.jpg')`, backgroundSize: 'cover' }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Registro de Administrador
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <TextField
            label="Sobrenome"
            variant="outlined"
            fullWidth
            margin="normal"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <TextField
            label="Confirmar Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
          <TextField
            label="Telefone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
          <TextField
            label="Nível de Acesso"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nivelAcesso}
            onChange={(e) => setNivelAcesso(e.target.value)}
            required
          />
          <TextField
            label="Departamento"
            variant="outlined"
            fullWidth
            margin="normal"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Registrar
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterAdmin;
