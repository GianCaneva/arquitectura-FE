import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Avatar, Box, IconButton, Toolbar, Menu, MenuItem, Typography
} from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Logo from './Logo/Deliverar.png';

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const logoutUser = useStoreActions(actions => actions.logout);

  const logout = async () => {
    await logoutUser();
    setAnchorElUser(null);
    navigate(`/login`);
  }

  return (
    <>
      <IconButton sx={{ ml: 2 }} onClick={e => setAnchorElUser(e.currentTarget)}>
        <Avatar alt="user" src="https://pickaface.net/gallery/avatar/katsukidjess52b86e6c514c7.png" />
      </IconButton>
      <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={() => setAnchorElUser(null)}>
        <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  )
}

const Navbar = () => {
  const loggedUser = useStoreState(state => state.loggedUser);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img src={Logo} alt="logo" width="200px" />
        </Box>
        <Box sx={{ alignItems: 'center', flexDirection: 'row' }}>
          {loggedUser && loggedUser}
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
