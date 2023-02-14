import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getMeAPI } from '../api/auth';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { endLoading, signIn, startLoading } from '../redux/slices/authSlice';

const Layout: React.FC = () => {
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
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
