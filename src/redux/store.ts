import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import postReducer from './slices/postSlice';
import sellerReducer from './slices/sellerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    post: postReducer,
    seller: sellerReducer,
  },
});
