import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, IconButton, Avatar, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Ícone para Agenda
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Ícone para Prontuários
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'; // Ícone para Farmácia
import ScienceIcon from '@mui/icons-material/Science'; // Ícone para Laboratório
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Ícone para Financeiro

const Sidebar = ({ open, toggleSidebar, user }) => {
  return (
    <Drawer 
      variant="persistent" 
      anchor="left" 
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          width: 300,
          backgroundColor: '#007acc',
          color: 'white',
        },
      }}
    >
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleSidebar} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Menu</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      {/* User Profile Section */}
      <Box sx={{ padding: 2, textAlign: 'center', backgroundColor: '#005f99', position: 'relative' }}>
        <Box 
          sx={{
            position: 'relative',
            display: 'inline-block',
            border: '4px solid white',
            borderRadius: '50%',
          }}
        >
          <Avatar 
            sx={{ width: 112, height: 112 }} 
            alt={user?.nome} 
            src={user?.fotoUrl}
          />
          <IconButton 
            color="inherit" 
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              bgcolor: 'white',
              borderRadius: '50%',
              '&:hover': {
                bgcolor: '#f0f0f0',
              },
            }}
            onClick={() => {/* Lógica para alterar a foto */}}
          >
            <EditIcon sx={{ color: '#007acc' }} />
          </IconButton>
        </Box>
        <Typography variant="h6">{user ? user.nome : 'Usuário'}</Typography>
        <Typography variant="body2">{user ? user.funcao : 'Função'}</Typography>
        
        <IconButton color="inherit" sx={{ position: 'absolute', right: 10, top: 10 }}>
          <NotificationsIcon fontSize='large' />
        </IconButton>
      </Box>

      {/* Navigation List */}
      <List>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Pacientes" />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
          <ListItemText primary="Agenda" />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon><MedicalServicesIcon /></ListItemIcon>
          <ListItemText primary="Prontuários" />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon><LocalPharmacyIcon /></ListItemIcon>
          <ListItemText primary="Farmácia" />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon><ScienceIcon /></ListItemIcon>
          <ListItemText primary="Laboratório" />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
          <ListItemText primary="Financeiro" />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon><AssessmentIcon /></ListItemIcon>
          <ListItemText primary="Relatórios" />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
