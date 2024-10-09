import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const pacienteData = { nome, cpf, dataNascimento };
    console.log(pacienteData); // Adicione esta linha
    axios.post('http://localhost:3000/pacientes', pacienteData)
      .then(response => alert('Paciente cadastrado com sucesso!'))
      .catch(error => alert('Erro ao cadastrar paciente'));
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
      <input type="date" placeholder="Data de Nascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
      <button type="submit">Cadastrar Paciente</button>
    </form>
  );
}

export default App;
