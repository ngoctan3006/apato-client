import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { getMeAPI } from '../api/auth';
import AppLoading from '../components/AppLoading/AppLoading';
import {
  selectIsAuthenticated,
  selectAuthLoading,
  startLoading,
  endLoading,
  signIn,
} from '../redux/slices/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getMeAPI()
      .then((res) => {
        dispatch(startLoading());
        if (res) {
          dispatch(signIn(res.data.user_info));
          if (res.data.user_info.role === 'ADMIN') navigate('/admin');
          navigate('/');
        }
      })
      .finally(() => {
        dispatch(endLoading());
      });
  }, []);

  if (loading) return <AppLoading />;
  if (!loading && !isAuthenticated) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
