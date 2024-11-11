import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Typography, Box, Button, Grid, Paper, Container, Select, MenuItem, Tooltip, AppBar, Toolbar, IconButton } from '@mui/material';
import { BarChart, LineChart, PieChart, Pie, Legend, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, ResponsiveContainer, Bar, Line } from 'recharts';
import GroupIcon from '@mui/icons-material/Group';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TaskIcon from '@mui/icons-material/Task';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [timeFrame, setTimeFrame] = useState('lastMonth');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const notificationsCount = 7;

  // Dummy data for demonstration purposes
  const activityData = [
    { name: 'Seg', newUsers: 5, reports: 8 },
    { name: 'Ter', newUsers: 8, reports: 12 },
    { name: 'Qua', newUsers: 6, reports: 9 },
    { name: 'Qui', newUsers: 10, reports: 11 },
    { name: 'Sex', newUsers: 12, reports: 15 },
    { name: 'Sáb', newUsers: 15, reports: 18 },
    { name: 'Dom', newUsers: 7, reports: 10 },
  ];

  const performanceData = [
    { name: 'Jan', performance: 70 },
    { name: 'Feb', performance: 80 },
    { name: 'Mar', performance: 75 },
    { name: 'Apr', performance: 85 },
    { name: 'May', performance: 90 },
    { name: 'Jun', performance: 88 },
  ];

  const patientMetrics = {
    totalPatients: 300,
    activePatients: 150,
    newPatients: 20,
    patientsInTreatment: 120,
    treatmentCompletionRate: 85,
    averageSatisfactionRating: 4.5,
    attendanceRate: 90,
    averageWaitingTime: 15,
  };

  const ageDistribution = [
    { name: 'Pediátricos', value: 100 },
    { name: 'Adultos', value: 120 },
    { name: 'Geriátricos', value: 80 },
  ];

  const handleTimeFrameChange = (event) => setTimeFrame(event.target.value);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4, paddingBottom: 4 }}>

      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleSidebar} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} user={user} notificationsCount={notificationsCount} />



      {/* Welcome Message */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h4">Bem-vindo(a), {user ? user.nome : 'Usuário'}!</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Seu painel administrativo com métricas e atalhos importantes.
        </Typography>
      </Box>

      {/* Time Frame Filter */}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6">Selecionar Período</Typography>
        <Select value={timeFrame} onChange={handleTimeFrameChange} displayEmpty>
          <MenuItem value="lastWeek">Última Semana</MenuItem>
          <MenuItem value="lastMonth">Último Mês</MenuItem>
          <MenuItem value="lastQuarter">Último Trimestre</MenuItem>
        </Select>
      </Box>

      {/* Patient Metrics Overview */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5">Resumo de Pacientes</Typography>
        <Grid container spacing={3}>
          {Object.entries(patientMetrics).map(([key, value]) => (
            <Grid key={key} item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', backgroundColor: '#e8f5e9' }}>
                <Typography variant="h6">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Typography>
                <Typography variant="h4" color="primary">
                  {typeof value === 'number' ? value : `${value}%`}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Age Distribution Pie Chart */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5">Distribuição de Pacientes por Idade</Typography>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={ageDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {ageDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3f51b5' : '#f50057'} />
                ))}
              </Pie>
              <RechartsTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      {/* Activity Summary */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5">Resumo das Atividades</Typography>
        <Grid container spacing={3}>
          {[
            { icon: <GroupIcon />, title: "Usuários Ativos", value: 150, info: "Última atualização há 5 minutos" },
            { icon: <AccessTimeIcon />, title: "Novos Cadastros", value: 30, info: "Nesta semana" },
            { icon: <ShowChartIcon />, title: "Relatórios Gerados", value: 45, info: "No último mês" }
          ].map(({ icon, title, value, info }, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
                <Tooltip title={info}>{icon}</Tooltip>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h4" color="primary">{value}</Typography>
                <Typography variant="body2" color="textSecondary">{info}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Activity Charts */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5">Gráficos de Atividade</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Atividade Diária</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="newUsers" fill="#3f51b5" name="Novos Usuários" />
                  <Bar dataKey="reports" fill="#f50057" name="Relatórios" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Tendência de Desempenho</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="performance" stroke="#3f51b5" name="Desempenho" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Notifications and Pending Tasks */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5">Notificações</Typography>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="body1" color="error">🚨 Alta demanda de atendimento hoje!</Typography>
          <Typography variant="body1" color="warning">🛑 Revisar pacientes com tratamentos prolongados.</Typography>
          <Typography variant="body1">✅ Novos pacientes cadastrados: 2</Typography>
          <Typography variant="body1">🔄 Atualização de relatórios concluída.</Typography>
        </Paper>
      </Box>

      {/* Pending Tasks Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5">Tarefas Pendentes</Typography>
        <Paper elevation={3} sx={{ padding: 2 }}>
          {["Revisar agendamentos", "Confirmar disponibilidade de equipe", "Atualizar sistema"].map((task, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
              <TaskIcon color="primary" sx={{ marginRight: 1 }} />
              <Typography variant="body1">{task}</Typography>
              <Button variant="contained" color="primary" sx={{ marginLeft: 'auto' }}>
                Concluir
              </Button>
            </Box>
          ))}
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;

