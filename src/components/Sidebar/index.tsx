import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitBtn } from '../../pages/LoginPage/styled';
import {
  selectIsAuthenticated,
  selectUser,
  signOut,
} from '../../redux/slices/authSlice';

export interface SidebarItemProps {
  id: number;
  title: string;
  path: string;
  active: number;
  setActive: (id: number) => void;
}

const SidebarItem = [
  {
    id: 1,
    title: 'Người dùng',
    path: '/admin',
  },
  {
    id: 2,
    title: 'Phòng trọ',
    path: '/admin/apart',
  },
  {
    id: 3,
    title: 'Phòng trọ mới',
    path: '/admin/new-apart',
  },
  {
    id: 4,
    title: 'Báo cáo vi phạm',
    path: '/admin/comment-report',
  },
  {
    id: 5,
    title: 'Tags',
    path: '/admin/tag',
  },
];

const Item: React.FC<SidebarItemProps> = (props) => {
  return (
    <Link
      to={props.path}
      style={{
        textDecoration: 'none',
        color: props.active === props.id ? '#fff' : '#000',
      }}
    >
      <Box
        sx={{
          backgroundColor: props.active === props.id ? '#b772ff' : '#e0e0e0',
          '&:hover': {
            backgroundColor: '#b772ff',
          },
          borderRadius: 3,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
        }}
        onClick={() => props.setActive(props.id)}
      >
        <Typography fontWeight="bold">{props.title}</Typography>
      </Box>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [active, setActive] = useState<number>(1);
  const user = useSelector(selectUser);
  const isAuth = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        height: '100vh',
        backgroundColor: '#e0e0e0',
      }}
    >
      <Stack
        height={300}
        alignItems="center"
        justifyContent="center"
        spacing={3}
        mx={1}
      >
        <Link to="/" style={{ textAlign: 'center' }}>
          <img src="/logo.png" alt="Logo" width="30%" />
        </Link>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
            }}
          />
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: 24,
            }}
          >
            {user?.name}
          </Typography>
        </Stack>
      </Stack>

      <Stack p="0 20px" spacing={2}>
        {SidebarItem.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            title={item.title}
            path={item.path}
            active={active}
            setActive={setActive}
          />
        ))}
      </Stack>

      {isAuth && (
        <SubmitBtn
          sx={{
            width: '80%',
            m: 'auto auto 20px',
            fontSize: 16,
          }}
          onClick={() => {
            localStorage.removeItem('accessToken');
            dispatch(signOut());
            navigate('/login');
          }}
        >
          Đăng xuất
        </SubmitBtn>
      )}
    </Stack>
  );
};

export default Sidebar;
