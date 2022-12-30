import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logInAPI, signUpAPI } from '../../api/service';
import BgLogin from '../../assets/imgs/bglogin.jpg';
import Logo from '../../assets/imgs/logo1.png';
import useAuth from '../../hook/useAuth';
import { EMAIL_REGEX } from '../../utils/utils';
import {
  CustomButton,
  Input,
  Label,
  SubmitBtn,
} from './components/CustomComponent';

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const loginHandler = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await logInAPI(data?.email, data?.password);
      setIsLoading(false);
      console.log({ res });
      const resData = res.data;
      if (res.status === 201) {
        signIn({
          user: {
            ...resData?.user_info,
            // id: resData?.user_info?.email,
            token: resData?.access_token,
          },
        });
        toast.success('Login successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate('/');
      }
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      toast.error(e?.response?.data?.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const registerHandler = async (data: any) => {
    let role: string | undefined = undefined;
    if (data?.seller) {
      role = 'SELLER';
    }
    try {
      setIsLoading(true);
      const res = await signUpAPI({
        name: data?.name,
        email: data?.email,
        password: data?.password,
        address: data?.address,
        phone: data?.phone,
        role: role,
      });
      setIsLoading(false);
      const resData = res.data;
      if (res.status === 201) {
        signIn({
          user: {
            ...resData?.user_info,
            // id: resData?.user_info?.email,
            token: resData?.access_token,
          },
        });
        toast.success('Sign up successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        navigate('/');
      }
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      toast.error(e?.response?.data?.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${BgLogin})`,
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
            </>
          )}
          <SubmitBtn
            loading={isLoading}
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
