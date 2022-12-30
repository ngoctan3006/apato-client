import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './router/Router';

const App: React.FC = () => {
  return (
    <>
      {/* <RouterProvider router={router}/> */}
      <Router />
      <ToastContainer />
    </>
  );
};

export default App;
