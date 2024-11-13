import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, IconButton, Avatar, Box, Badge, Popover } from '@mui/material';
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  CalendarToday as CalendarTodayIcon,
  MedicalServices as MedicalServicesIcon,
  LocalPharmacy as LocalPharmacyIcon,
  Science as ScienceIcon,
  MonetizationOn as MonetizationOnIcon,
} from '@mui/icons-material';

const Sidebar = ({ open, toggleSidebar, user }) => {
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Novo paciente cadastrado", description: "Há 5 minutos", link: "/patients/new" },
    { id: 2, title: "Relatório diário disponível", description: "Hoje às 9h", link: "/reports/daily" },
    { id: 3, title: "Consulta marcada", description: "Amanhã às 14h", link: "/appointments" },
  ]);

  const handleNotificationClick = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleNotificationItemClick = (id, link) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
    if (link) {
      window.location.href = link;
    }
    handleNotificationClose();
  };

  const isNotificationOpen = Boolean(notificationsAnchorEl);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          width: 350,
          background: '#004c8c',
          color: 'white',
        },
      }}
    >
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: '#004c8c' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
            <CloseIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight:'bold' }}>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      {/* User Profile Section */}
      <Box sx={{ padding: 2, textAlign: 'center', background: 'linear-gradient(to bottom, #0288d1, #004c8c)', position: 'relative' }}>
        <Avatar sx={{ width: 112, height: 112, margin: '0 auto' }} alt={user?.nome} src={user?.fotoUrl} />
        <Typography variant="h6">{user ? user.nome : 'Usuário'}</Typography>
        <Typography variant="body2">{user ? user.funcao : 'Função'}</Typography>
        <IconButton
          color="inherit"
          onClick={handleNotificationClick}
          sx={{ position: 'absolute', right: 10, top: 10 }}
        >
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Box>

      <Popover
        open={isNotificationOpen}
        anchorEl={notificationsAnchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List sx={{ width: 300 }}>
          {notifications.map(({ id, title, description, link }) => (
            <ListItem button key={id} onClick={() => handleNotificationItemClick(id, link)}>
              <ListItemText primary={title} secondary={description} />
            </ListItem>
          ))}
          {notifications.length === 0 && (
            <Typography variant="body2" color="textSecondary" align="center" sx={{ padding: 2 }}>
              Sem novas notificações
            </Typography>
          )}
        </List>
      </Popover>

      <List >
        {[
          { text: 'Home', icon: <HomeIcon />, link: '/home' },
          { text: 'Pacientes', icon: <PeopleIcon />, link: '/patients' },
          { text: 'Agenda', icon: <CalendarTodayIcon />, link: '/agenda' },
          { text: 'Prontuários', icon: <MedicalServicesIcon />, link: '/records' },
          { text: 'Farmácia', icon: <LocalPharmacyIcon />, link: '/pharmacy' },
          { text: 'Laboratório', icon: <ScienceIcon />, link: '/lab' },
          { text: 'Financeiro', icon: <MonetizationOnIcon />, link: '/finance' },
          { text: 'Relatórios', icon: <AssessmentIcon />, link: '/reports' },
          { text: 'Configurações', icon: <SettingsIcon />, link: '/settings' },
        ].map(({ text, icon, link }, index) => (
          <ListItem button key={index} onClick={() => window.location.href = link}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText  sx={{fontWeight:'bold', fontSize: 15}} primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
