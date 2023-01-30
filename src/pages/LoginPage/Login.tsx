import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { purple } from '@mui/material/colors';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginAPI, signupAPI } from '../../api/auth';
import BgLogin from '../../assets/imgs/bglogin.jpg';
import Logo from '../../assets/imgs/logo.png';
import {
  endLoading,
  selectAuthLoading,
  signIn,
  startLoading,
} from '../../redux/slices/authSlice';
import { EMAIL_REGEX } from '../../utils/utils';
import { CustomButton, Input, Label, SubmitBtn } from './styled';

const Login: React.FC = () => {
  const loading = useSelector(selectAuthLoading);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const loginHandler = async (data: any) => {
    dispatch(startLoading());
    try {
      const res = await loginAPI(data?.email, data?.password);
      if (res) {
        console.log(res);
        localStorage.setItem('accessToken', res.data.access_token);
        dispatch(signIn(res.data.user_info));
        toast.success('Đăng nhập thành công!');
        navigate('/');
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(endLoading());
    }
  };

  const registerHandler = async (data: any) => {
    dispatch(startLoading());
    try {
      const res = await signupAPI({
        name: data?.name,
        email: data?.email,
        password: data?.password,
        role: data?.seller || undefined,
      });
      if (res) {
        console.log(res);
        localStorage.setItem('accessToken', res.data.access_token);
        dispatch(signIn(res.data.user_info));
        toast.success('Đăng ký thành công!');
        navigate('/');
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(endLoading());
    }
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${BgLogin})`,
      }}
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Box
        sx={{
          width: '500px',
          bgcolor: '#fff',
          borderRadius: '30px',
          boxShadow: '0px 8px 50px rgba(150, 140, 169, 0.1)',
          padding: '20px 60px 60px 60px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <Link to="/">
            <img width={100} src={Logo} alt="" />
          </Link>
        </Box>
        <form
          onSubmit={
            isSignUp
              ? handleSubmit(registerHandler)
              : handleSubmit(loginHandler)
          }
        >
          <Typography fontSize={30} fontWeight={600}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Typography fontSize={14} sx={{ marginBottom: '20px' }}>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <CustomButton
              onClick={() => {
                reset();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </CustomButton>
          </Typography>

          <Label>Email Address</Label>
          <Input
            size="small"
            error={!!errors.email}
            type="email"
            {...register('email', {
              required: true,
              pattern: EMAIL_REGEX,
            })}
            fullWidth
            helperText={
              errors.email?.type === 'required' && 'Email is required'
            }
          />

          <Label>Password</Label>
          <Input
            size="small"
            {...register('password', { required: true, minLength: 8 })}
            fullWidth
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={
              errors.password?.type === 'required'
                ? 'Password is required'
                : errors.password?.type === 'minLength' &&
                  'Password must be at least 8 characters'
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isSignUp && (
            <>
              <Label>Full Name</Label>
              <Input
                size="small"
                type="text"
                error={!!errors.name}
                {...register('name', { required: true })}
                fullWidth
                helperText={
                  errors.name?.type === 'required' && 'Full name is required'
                }
              />

              <Label>Address</Label>
              <Input
                size="small"
                type="text"
                error={!!errors.address}
                {...register('address', { required: true })}
                fullWidth
                helperText={
                  errors.address?.type === 'required' && 'Address is required'
                }
              />

              <Label>Phone Number</Label>
              <Input
                size="small"
                type="text"
                error={!!errors.phone}
                {...register('phone', { required: true })}
                fullWidth
                helperText={
                  errors.phone?.type === 'required' &&
                  'Phone number is required'
                }
              />

              <Label sx={{ display: 'inline-block' }}>
                Are you a landlord?
              </Label>
              <Checkbox
                {...register('seller')}
                size="small"
                sx={{
                  color: purple[600],
                  '&.Mui-checked': {
                    color: purple[400],
                  },
                }}
              />
            </>
          )}
          <SubmitBtn
            loading={loading}
            loadingIndicator="Loading..."
            type="submit"
            variant="contained"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </SubmitBtn>
          {!isSignUp && (
            <CustomButton
              sx={{
                marginTop: '20px',
              }}
            >
              Forgot your password?
            </CustomButton>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default Login;
