import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [crm, setCrm] = useState('');
  const [cargo, setCargo] = useState('');
  const [setor, setSetor] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      await api.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        nome,
        sobrenome,
        email,
        senha,
        telefone,
        cpf,
        rg,
        crm,
        cargo,
        setor,
        especialidade,
      });
      navigate('/login'); // Redireciona para a página de login
    } catch (err) {
      console.error('Erro ao registrar:', err);
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
          Registro de Usuário
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
            label="CPF"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
          <TextField
            label="RG"
            variant="outlined"
            fullWidth
            margin="normal"
            value={rg}
            onChange={(e) => setRg(e.target.value)}
            required
          />
          <TextField
            label="CRM"
            variant="outlined"
            fullWidth
            margin="normal"
            value={crm}
            onChange={(e) => setCrm(e.target.value)}
          />
          <TextField
            label="Cargo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            required
          />
          <TextField
            label="Setor (ex: Centro Cirúrgico)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
            required
          />
          <TextField
            label="Especialidade"
            variant="outlined"
            fullWidth
            margin="normal"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
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

export default Register;
