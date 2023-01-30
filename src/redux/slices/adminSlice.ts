import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const selectUserList = (state: { admin: AdminState }) =>
  state.admin.users;

export const { setUsers } = adminSlice.actions;

export default adminSlice.reducer;
