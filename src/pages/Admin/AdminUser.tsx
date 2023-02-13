import {
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAPI } from '../../api/admin';
import AppLoading from '../../components/AppLoading';
import Title from '../../components/Title';
import {
  endLoading,
  selectLoading,
  selectUserList,
  setUsers,
  startLoading,
} from '../../redux/slices/adminSlice';
import moment from 'moment';
import { Visibility } from '@mui/icons-material';
import UserInfo from '../../components/UserInfo';
import { User } from '../../redux/slices/authSlice';
import { a11yProps } from '../ApartManagement';
import { DataGridBox } from './styled';

interface UserRoleProps {
  role: string;
}

interface UserStatusProps {
  status: boolean;
}

const UserRole: React.FC<UserRoleProps> = ({ role }) => {
  return (
    <Box
      sx={{
        width: '75%',
        m: '0 auto',
        p: '5px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: role === 'SELLER' ? '#b772ff' : '#2db7f5',
        borderRadius: '4px',
      }}
    >
      <Typography sx={{ ml: '5px', fontWeight: 700, color: '#fff' }}>
        {role === 'SELLER' ? 'Chủ trọ' : 'Người dùng'}
      </Typography>
    </Box>
  );
};

const UserStatus: React.FC<UserStatusProps> = ({ status }) => {
  return (
    <Box
      sx={{
        width: '75%',
        m: '0 auto',
        p: '5px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: status ? '#87d068' : '#f50',
        borderRadius: '4px',
      }}
    >
      <Typography sx={{ ml: '5px', fontWeight: 700, color: '#fff' }}>
        {status ? 'Hoạt động' : 'Bị khóa'}
      </Typography>
    </Box>
  );
};

const tabStyle = {
  textTransform: 'none',
  fontWeight: 600,
  fontSize: 20,
};

const AdminUser: React.FC = () => {
  const userList = useSelector(selectUserList);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [value, setValue] = useState<number>(0);
  const columns = [
    {
      field: 'id',
      headerName: 'STT',
      renderCell: (params: any) => params.api.getRowIndex(params.row.id) + 1,
    },
    {
      field: 'name',
      headerName: 'Tên',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'SĐT',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Vai trò',
      flex: 1,
      renderCell: (params: any) => {
        return <UserRole role={params?.row?.role} />;
      },
    },
    {
      field: 'created_at',
      headerName: 'Thời gian tham gia',
      flex: 1,
      renderCell: (params: any) =>
        moment(params?.row?.created_at).format('DD/MM/YYYY'),
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: (params: any) => {
        return <UserStatus status={params?.row?.status} />;
      },
    },
    {
      field: 'action',
      headerName: 'Hành động',
      flex: 1,
      renderCell: (params: any) => (
        <Tooltip title="Xem thông tin">
          <IconButton
            onClick={() => {
              setUser(params?.row);
              handleOpen();
            }}
          >
            <SvgIcon component={Visibility} color="primary" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getUsers = async (data: any) => {
    dispatch(startLoading());
    try {
      const res = await getAllUsersAPI(data);
      console.log(res);
      dispatch(setUsers(res.data));
    } catch (error: any) {
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    getUsers({ searchValue: '' });
  }, []);

  if (loading) return <AppLoading />;

  return (
    <Box m="20px">
      <Title title="Quản lý người dùng" />
      <Stack pt={1} alignItems="flex-start">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab sx={tabStyle} label="Tất cả" {...a11yProps(0)} />
          <Tab sx={tabStyle} label="Chủ trọ" {...a11yProps(1)} />
          <Tab sx={tabStyle} label="Người dùng" {...a11yProps(2)} />
        </Tabs>
      </Stack>
      <DataGridBox>
        <DataGrid
          rows={
            value === 0
              ? userList
              : value === 1
              ? userList.filter((user) => user.role === 'SELLER')
              : userList.filter((user) => user.role === 'USER')
          }
          columns={columns}
        />
      </DataGridBox>

      <UserInfo user={user} open={open} handleClose={handleClose} />
    </Box>
  );
};

export default AdminUser;
