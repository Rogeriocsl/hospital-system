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
import MenuIcon from '@mui/icons-material/Menu'; // Ícone para Financeiro

const Sidebar = ({ open, toggleSidebar, user }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          width: 350,
          backgroundColor: '#005f99',
          color: 'white',
        },
      }}
    >
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ fontSize: 40 }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleSidebar}
            aria-label="close"
            sx={{ fontSize: 40 }} // Define o tamanho do ícone
          >
            <CloseIcon sx={{ fontSize: 40 }} /> {/* Define o tamanho específico para CloseIcon */}
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
            onClick={() => {/* Lógica para alterar a foto */ }}
          >
            <EditIcon sx={{ color: '#007acc' }} />
          </IconButton>
        </Box>
        <Typography variant="h6"
          sx={{
            typography: {
              xs: 'body2', // Menor em telas pequenas
              sm: 'body1',
              md: 'h6',
              lg: 'h5'     // Maior em telas grandes
            }
          }}
        >{user ? user.nome : 'Usuário'}</Typography>
        <Typography variant="body2"
          sx={{
            typography: {
              xs: 'body2', // Menor em telas pequenas
              sm: 'body1',
              md: 'h6',
              lg: 'h5'     // Maior em telas grandes
            }
          }}
        >{user ? user.funcao : 'Função'}</Typography>

        <IconButton color="inherit" sx={{ position: 'absolute', right: 10, top: 10 }}>
          <NotificationsIcon fontSize='large' />
        </IconButton>
      </Box>

      {/* Navigation List */}
      <List>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <HomeIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32, lg: 36 } }} /> {/* Tamanho responsivo */}
          </ListItemIcon>
          <ListItemText primary="Home"
            sx={{
              typography: {
                xs: 'body2', // Menor em telas pequenas
                sm: 'body1',
                md: 'h6',
                lg: 'h5'     // Maior em telas grandes
              }
            }}
          />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <PeopleIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32, lg: 36 } }} /> {/* Tamanho responsivo */}
          </ListItemIcon>
          <ListItemText primary="Pacientes"
            sx={{
              typography: {
                xs: 'body2', // Menor em telas pequenas
                sm: 'body1',
                md: 'h6',
                lg: 'h5'     // Maior em telas grandes
              }
            }}
          />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <CalendarTodayIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32, lg: 36 } }} /> {/* Tamanho responsivo */}
          </ListItemIcon>
          <ListItemText primary="Agenda"
            sx={{
              typography: {
                xs: 'body2', // Menor em telas pequenas
                sm: 'body1',
                md: 'h6',
                lg: 'h5'     // Maior em telas grandes
              }
            }}
          />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <MedicalServicesIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32, lg: 36 } }} /> {/* Tamanho responsivo */}
          </ListItemIcon>
          <ListItemText primary="Prontuários"
            sx={{
              typography: {
                xs: 'body2', // Menor em telas pequenas
                sm: 'body1',
                md: 'h6',
                lg: 'h5'     // Maior em telas grandes
              }
            }}
          />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <LocalPharmacyIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32, lg: 36 } }} /> {/* Tamanho responsivo */}
          </ListItemIcon>
          <ListItemText primary="Farmácia"
            sx={{
              typography: {
                xs: 'body2', // Menor em telas pequenas
                sm: 'body1',
                md: 'h6',
                lg: 'h5'     // Maior em telas grandes
              }
            }}
          />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <ScienceIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32, lg: 36 } }} /> {/* Tamanho responsivo */}
          </ListItemIcon>
          <ListItemText primary="Laboratório"
            sx={{
              typography: {
                xs: 'body2', // Menor em telas pequenas
                sm: 'body1',
                md: 'h6',
                lg: 'h5'     // Maior em telas grandes
              }
            }}
          />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <MonetizationOnIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32, lg: 36 } }} /> {/* Tamanho responsivo */}
          </ListItemIcon>
          <ListItemText primary="Financeiro"
            sx={{
              typography: {
                xs: 'body2', // Menor em telas pequenas
                sm: 'body1',
                md: 'h6',
                lg: 'h5'     // Maior em telas grandes
              }
            }}
          />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <AssessmentIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32, lg: 36 } }} /> {/* Tamanho responsivo */}
          </ListItemIcon>
          <ListItemText primary="Relatórios"
            sx={{
              typography: {
                xs: 'body2', // Menor em telas pequenas
                sm: 'body1',
                md: 'h6',
                lg: 'h5'     // Maior em telas grandes
              }
            }}
          />
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <SettingsIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32, lg: 36 } }} /> {/* Tamanho responsivo */}
          </ListItemIcon>
          <ListItemText primary="Configurações"
            sx={{
              typography: {
                xs: 'body2', // Menor em telas pequenas
                sm: 'body1',
                md: 'h6',
                lg: 'h5'     // Maior em telas grandes
              }
            }}
          />
        </ListItem>
      </List>


    </Drawer >
  );
};

export default Sidebar;
