import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  role: string;
  status: boolean;
}

export interface AdminState {
  users: User[];
}

const initialState = {
  users: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
});

export const selectUserList = (state: { admin: AdminState }) =>
  state.admin.users;

export default adminSlice.reducer;
