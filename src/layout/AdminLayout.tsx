import { Grid, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getMeAPI } from '../api/auth';
import Sidebar from '../components/Sidebar';
import { endLoading, signIn, startLoading } from '../redux/slices/authSlice';

const AdminLayout: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getMeAPI()
      .then((res) => {
        dispatch(startLoading());
        if (res) {
          dispatch(signIn(res.data.user_info));
        }
      })
      .finally(() => {
        dispatch(endLoading());
      });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} sm={3} md={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={8} sm={9} md={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
