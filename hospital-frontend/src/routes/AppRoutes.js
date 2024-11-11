import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register'; // Importe o componente Register
import RegisterAdmin from '../pages/RegisterAdmin';
import Dashboard from '../pages/Dashboard';
import PatientList from '../pages/PatientList';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/register-admin" element={<RegisterAdmin />} />
    {/* Rota de Registro */}
   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  {/* <Route path="/patients" element={<ProtectedRoute><PatientList /></ProtectedRoute>} /> */}
  {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
);

export default AppRoutes;
