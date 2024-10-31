import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post(`${process.env.REACT_APP_API_URL}/auth/register`, { nome, email, senha });
      navigate('/login'); // Redireciona para a página de login
    } catch (err) {
      console.error('Erro ao registrar:', err);
      setError(err.response?.data?.message || 'Erro no registro. Tente novamente.');
    }
  };
  

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe mensagem de erro */}
      </form>
    </div>
  );
};

export default Register;
