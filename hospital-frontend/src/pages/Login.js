import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Grid2, Snackbar } from '@mui/material';
import back from '../assets/images/back.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const loggedUser = await login(email, password);
      console.log('Usuário logado:', loggedUser); // Verifique o retorno do login
  
      // Verifica o nível de acesso e redireciona
      if (loggedUser.usuario && loggedUser.usuario.nivelAcesso === 1) {
        console.log('Redirecionando para a dashboard');
        navigate('/dashboard');
      } else {
        console.log('Redirecionando para a página principal');
        navigate('/main');
      }
    } catch (error) {
      setError('Erro ao fazer login');
      console.error('Erro ao fazer login', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Grid2
      container
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${back})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        margin: 0,
        padding: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          margin: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              disabled={loading}
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </Button>
            <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
              Não tem uma conta? <Link to="/register">Registre-se</Link>
            </Typography>
          </form>
        </Box>
      </Container>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError('')}
        message={error}
      />
    </Grid2>
  );
};

export default Login;
