import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log('Login bem-sucedido');
    } catch (error) {
      console.error('Erro ao fazer login', error);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: {
          xs: '100vh', // Para telas extra pequenas
          sm: '80vh',  // Para telas pequenas
          md: '70vh',  // Para telas médias
          lg: '60vh',  // Para telas grandes
          xl: '50vh',  // Para telas extra grandes
        },
        padding: {
          xs: '16px', // Padding em telas pequenas
          md: '24px', // Padding em telas médias e maiores
        },
      }}
      component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 8,
          padding: 2,
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Entrar
          </Button>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            Não tem uma conta? <Link to="/register">Registre-se</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
