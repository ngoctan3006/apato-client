import { Logout, PersonOutline, PostAdd } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/imgs/logo.png';
import useAuth from '../../hook/useAuth';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        backgroundColor: '#fff',
      }}
      position="fixed"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            <Link to="/">
              <img width={70} src={Logo} alt="" />
            </Link>
          </Box>

          <Stack flexGrow={1} ml={10}>
            <Typography variant="h6" component="div">
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: '#000',
                }}
              >
                Apartment List
              </Link>
            </Typography>

            {user?.role === 'SELLER' && (
              <Typography variant="h6" component="div">
                <Link
                  to="/"
                  style={{
                    textDecoration: 'none',
                    color: '#000',
                  }}
                >
                  Apartment Management
                </Link>
              </Typography>
            )}
          </Stack>

          <Box>
            {user ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    fontWeight={600}
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    Welcome, {user?.name?.split(' ').slice(-1)[0]}
                  </Typography>
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>
                      {user?.name?.slice(0, 2).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem>
                    <Stack direction="row" alignItems="center">
                      <Avatar sx={{ bgcolor: deepPurple[500] }}>
                        {user?.name?.slice(0, 2).toUpperCase()}
                      </Avatar>
                      <Stack>
                        <Typography fontWeight={600} color="#292929">
                          {user?.name}
                        </Typography>
                        <Typography fontSize={13} color="#757575">
                          {user?.email}
                        </Typography>
                      </Stack>
                    </Stack>
                  </MenuItem>
                  <Divider variant="middle" />

                  <MenuItem>
                    <Link
                      to="/profile"
                      style={{
                        textDecoration: 'none',
                      }}
                    >
                      <Stack direction="row" alignItems="center">
                        <ListItemIcon>
                          <PersonOutline />
                        </ListItemIcon>
                        <Typography color="#757575">Profile</Typography>
                      </Stack>
                    </Link>
                  </MenuItem>
                  <Divider variant="middle" />

                  {user?.role === 'SELLER' && (
                    <>
                      <MenuItem>
                        <Link
                          to="/post-apart"
                          style={{
                            textDecoration: 'none',
                          }}
                        >
                          <Stack direction="row" alignItems="center">
                            <ListItemIcon>
                              <PostAdd />
                            </ListItemIcon>
                            <Typography color="#757575">Create post</Typography>
                          </Stack>
                        </Link>
                      </MenuItem>
                      <Divider variant="middle" />
                    </>
                  )}

                  <MenuItem onClick={() => signOut()}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <Typography color="#757575">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                variant="contained"
                color="secondary"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
