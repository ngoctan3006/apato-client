import { CssBaseline } from '@mui/material';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Router from './router/Router';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router />
      <ToastContainer position="top-right" autoClose={3000} limit={5} />
    </>
  );
};

export default App;
