import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Typography, Box, Button, Grid, Paper, Container, Select, MenuItem, Tooltip, AppBar, Toolbar, IconButton, TextField, Grid2, Card, CardContent, CardMedia } from '@mui/material';
import { BarChart, LineChart, PieChart, Pie, Legend, Cell, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, ResponsiveContainer, Bar, Line } from 'recharts';
import GroupIcon from '@mui/icons-material/Group';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TaskIcon from '@mui/icons-material/Task';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../components/Sidebar';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimerIcon from '@mui/icons-material/Timer';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import back from '../assets/images/back.jpg';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [timeFrame, setTimeFrame] = useState('lastMonth');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const notificationsCount = 7;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);




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
    totalPatients: { label: "Total de Pacientes", value: 300 },
    activePatients: { label: "Pacientes Ativos", value: 150 },
    newPatients: { label: "Novos Pacientes", value: 20 },
    patientsInTreatment: { label: "Pacientes em Tratamento", value: 120 },
    attendanceRate: { label: "Taxa de Atendimento", value: "90%" },
    averageWaitingTime: { label: "Tempo Médio de Espera", value: "15 minutos" },
    dischargesToday: { label: "Altas Hoje", value: 10 },
    patientSatisfaction: { label: "Satisfação do Paciente", value: "85%" },
  };

  const colorMapping = {
    totalPatients: 'linear-gradient(to bottom, #0288d1, #01579b)', // azul escuro
    activePatients: 'linear-gradient(to bottom, #388e3c, #1b5e20)', // verde escuro
    newPatients: 'linear-gradient(to bottom, #4caf50, #2e7d32)', // verde mais escuro
    patientsInTreatment: 'linear-gradient(to bottom, #0277bd, #004c8c)', // azul profundo
    attendanceRate: 'linear-gradient(to bottom, #fbc02d, #f57f17)', // amarelo escuro
    averageWaitingTime: 'linear-gradient(to bottom, #757575, #424242)', // cinza escuro
    dischargesToday: 'linear-gradient(to bottom, #7b1fa2, #4a0072)', // roxo escuro
    patientSatisfaction: 'linear-gradient(to bottom, #2e7d32, #1b5e20)', // verde escuro (para satisfação)
  };

  const activityDatas = [
    { icon: <ShowChartIcon sx={{ color: '#673ab7', fontSize: 40 }} />, title: "Relatórios Gerados", value: 45, info: "No último mês" },
    { icon: <TimerIcon sx={{ color: '#009688', fontSize: 40 }} />, title: "Tempo Médio no Sistema", value: "15 min", info: "Tempo médio diário" },
    { icon: <ErrorOutlineIcon sx={{ color: '#f44336', fontSize: 40 }} />, title: "Problemas Reportados", value: 12, info: "Últimos 7 dias" },
  ];


  const ageDistribution = [
    { name: 'Pediátricos', value: 100 },
    { name: 'Adultos', value: 120 },
    { name: 'Geriátricos', value: 80 },
  ];

  const handleTimeFrameChange = (event) => setTimeFrame(event.target.value);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Grid2
      container

      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${back})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
      }}
    >


      <Container
        maxWidth={false}
        disableGutters
        sx={{
          flexGrow: 1, // Permite que o container cresça dentro do Grid
          display: 'flex',
          flexDirection: 'column',
          padding: '120px 60px 60px 60px'

        }}
      >

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

        <Paper elevation={4} sx={{ display: 'inline-flex', padding: 2, alignSelf: 'flex-end', borderRadius: 3, }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>

            <Box>
              <Typography sx={{ fontWeight: 'bold' }} variant="h6">Selecionar Período</Typography>
              <Select
                sx={{ fontWeight: 600 }}
                value={timeFrame}
                onChange={handleTimeFrameChange}
                displayEmpty
                fullWidth
              >
                <MenuItem sx={{ fontWeight: 600 }} value="lastWeek">Última Semana</MenuItem>
                <MenuItem sx={{ fontWeight: 600 }} value="lastMonth">Último Mês</MenuItem>
                <MenuItem sx={{ fontWeight: 600 }} value="lastQuarter">Último Trimestre</MenuItem>
              </Select>
            </Box>


            <Box>
              <Typography sx={{ fontWeight: 'bold' }} variant="h6">Selecionar Intervalo de Datas</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <DatePicker
                    sx={{ fontWeight: 600 }}
                    label="Data Inicial"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    inputFormat="DD/MM/YYYY" // Formato de data brasileiro
                    renderInput={(params) => (
                      <TextField sx={{ fontWeight: 600 }} {...params} /> // Ajusta a largura
                    )}
                  />
                  <DatePicker
                    sx={{ fontWeight: 600 }}
                    label="Data Final"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => (
                      <TextField sx={{ fontWeight: 600 }} {...params} /> // Ajusta a largura
                    )}
                  />
                </Box>
              </LocalizationProvider>
            </Box>
          </Box>

        </Paper>

        <Box sx={{ marginTop: 4 }}>
          <Typography sx={{ fontWeight: 600, textAlign: 'center', marginBottom: 2 }} variant="h2">
            Resumo de Pacientes
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {Object.entries(patientMetrics).map(([key, metric]) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <Card
                  elevation={3}
                  sx={{
                    textAlign: 'center',
                    background: colorMapping[key] || 'linear-gradient(to bottom, #e0e0e0, #bdbdbd)', // Cor padrão caso a métrica não tenha cor definida
                    borderRadius: 4,
                    color: 'white',
                    padding: 2,
                    transition: 'transform 0.1s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardContent>
                    {/* Ícone de paciente */}
                    <PersonIcon sx={{ fontSize: 40, marginBottom: 1, opacity: 0.7 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="body1">
                      {metric.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>



        {/* Resumo das Atividades */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center', marginBottom: 3 }}>
            Resumo das Atividades
          </Typography>
          <Grid container spacing={3}>
            {activityDatas.map(({ icon, title, value, info }, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    padding: 3,
                    textAlign: 'center',
                    background: 'linear-gradient(to bottom, #f5f7fa, #c3cfe2)',
                    borderRadius: 2,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Tooltip title={info} arrow>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 1 }}>
                      {icon}
                    </Box>
                  </Tooltip>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {title}
                  </Typography>
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                    {value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8 }}>
                    {info}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Resumo de Atividades */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center', marginBottom: 3 }}>
            Resumo de Atividades
          </Typography>
          <Grid container spacing={3} justifyContent="center">

            {/* Gráfico de Atividade Diária */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={4}
                sx={{
                  padding: 2,
                  borderRadius: 3,
                  background: 'linear-gradient(to bottom, #0288d1, #004c8c)',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Atividade Diária
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <RechartsTooltip />
                    <Bar dataKey="newUsers" fill="#80deea" name="Novos Usuários" />
                    <Bar dataKey="reports" fill="#ff8a80" name="Relatórios" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Gráfico de Tendência de Desempenho */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={4}
                sx={{
                  padding: 2,
                  borderRadius: 3,
                  background: 'linear-gradient(to bottom, #388e3c, #1b5e20)',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Tendência de Desempenho
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="performance" stroke="#a5d6a7" name="Desempenho" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Gráfico de Distribuição de Pacientes por Idade */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={4}
                sx={{
                  padding: 2,
                  borderRadius: 3,
                  background: 'linear-gradient(to bottom, #7b1fa2, #4a0072)',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Distribuição de Pacientes por Idade
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={ageDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {ageDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index % 2 === 0 ? '#ce93d8' : '#ab47bc'}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
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
    </Grid2>
  );
};

export default Dashboard;

