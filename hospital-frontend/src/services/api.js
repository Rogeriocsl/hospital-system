import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Usa a URL correta para o backend
});

export default api;
