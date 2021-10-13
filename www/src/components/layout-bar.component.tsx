import { Container, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem } from '@components/mui.components';
import { indigo } from '@mui/material/colors';
import PokerLogo from '@assets/png/001-poker.png';
import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/Person';
import React from 'react';

const LayoutBarComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position='fixed' sx={{ background: '#FFF', color: 'text.primary' }} elevation={0}>
      <Container maxWidth='xl'>
        <Toolbar>
          <img src={PokerLogo} alt='Poker logo' style={{ height: '45px', marginRight: '10px' }} />
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Planning Poker
          </Typography>
          <IconButton
            size='large'
            color='inherit'
            onClick={handleMenu}
          >
            <Avatar sx={{ bgcolor: indigo[500] }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={!!anchorEl} keepMounted onClose={() => setAnchorEl(null)}>
            <MenuItem>Jhoy</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LayoutBarComponent;