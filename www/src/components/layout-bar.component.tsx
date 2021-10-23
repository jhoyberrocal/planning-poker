import {
  Container,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  TextField, RouterLink,
} from '@components/mui.components';
import React from 'react';
import PokerLogo from '@assets/png/001-poker.png';
import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/Person';
import { indigo } from '@mui/material/colors';
import { StoreState } from '@redux/store';
import { connect, useDispatch } from 'react-redux';
import { setUsername } from '@redux/modules/user/user.actions';
import { Link } from 'react-router-dom';

type LayoutBarProps = {
  name: string;
};

const LayoutBarComponent: React.FC<LayoutBarProps> = ({ name }: LayoutBarProps) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(event.target.value));
  };

  return (
    <AppBar position='fixed' sx={{ background: '#FFF', color: 'text.primary' }} elevation={0}>
      <Container maxWidth='xl'>
        <Toolbar>
          <img src={PokerLogo} alt='Poker logo' style={{ height: '45px', marginRight: '10px' }} />
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <RouterLink component={Link} to='/' underline='none'>
              Planning Poker
            </RouterLink>
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
            <MenuItem>Hi! {name}</MenuItem>
            <MenuItem>
              <TextField
                label='Change name'
                placeholder='Introduce your name'
                variant='outlined'
                value={name}
                onChange={changeName}
              />
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state: StoreState): LayoutBarProps => {
  const { name } = state.User;
  return { name: name as string };
};

export default connect(mapStateToProps)(LayoutBarComponent);
