import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useSelector } from 'react-redux';
import Title from '../../components/Title';
import { selectUserList } from '../../redux/slices/adminSlice';

interface UserRoleProps {
  role: string;
}

const UserRole: React.FC<UserRoleProps> = (props) => {
  return (
    <Box
      sx={{
        width: '60%',
        m: '0 auto',
        p: '5px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: props.role === 'ADMIN' ? '#b772ff' : '#e0e0e0',
        borderRadius: '4px',
      }}
    >
      {props.role === 'ADMIN' && <AdminPanelSettingsOutlined />}
      {props.role === 'USER' && <LockOpenOutlined />}

      <Typography color="#141414" sx={{ ml: '5px' }}>
        {props.role.toLowerCase()}
      </Typography>
    </Box>
  );
};

const AdminUser: React.FC = () => {
  const userList = useSelector(selectUserList);

  const columns = [
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
      headerName: 'Role',
      flex: 1,
      renderCell: (params: { role: string }) => {
        return <UserRole role={params.role} />;
      },
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: (params: { status: boolean }) => {
        return (
          <Box
            sx={{
              width: '60%',
              m: '0 auto',
              p: '5px',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: params.status ? '#87d068' : '#f50',
              borderRadius: '4px',
            }}
          >
            <Typography color="#141414" sx={{ ml: '5px' }}>
              {params.status ? 'Active' : 'Blocked'}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Title title="Quản lý người dùng" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#a4a9fc',
            borderBottom: 'none',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: '#a4a9fc',
          },
        }}
      >
        <DataGrid rows={userList} columns={columns} />
      </Box>
    </Box>
  );
};

export default AdminUser;
