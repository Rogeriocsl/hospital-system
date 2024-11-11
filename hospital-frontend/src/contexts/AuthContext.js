import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.usuario); // Aqui você deve definir o usuário a partir do storedUser
      api.defaults.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const loggedUser = response.data; // Isso deve conter o token e o usuário

      // Armazena o token e os dados do usuário
      localStorage.setItem('user', JSON.stringify(loggedUser)); // Armazena o objeto completo
      api.defaults.headers.Authorization = `Bearer ${loggedUser.token}`; // Atualiza o cabeçalho de autorização
      setUser(loggedUser.usuario); // Aqui você deve definir o usuário corretamente
      return loggedUser; // Retorna o usuário para que o Login.js possa usá-lo
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error('Erro ao fazer login, verifique suas credenciais.');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
