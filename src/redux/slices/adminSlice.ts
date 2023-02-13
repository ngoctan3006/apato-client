import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from './postSlice';

export interface User {
  id: number;
  name: string | null;
  email: string;
  phone: string | null;
  address: string | null;
  role: string;
  status: boolean;
}

export interface Report {
  id: number;
  apatoId: number;
  comment: string;
  commentBy: string;
  rate: number;
  reportBy: string;
  checked: boolean;
}

export interface AdminState {
  users: User[];
  reports: Report[];
  loading: boolean;
  posts: Post[];
  pendingPosts: Post[];
}

const initialState = {
  loading: false,
  users: [],
  reports: [],
  posts: [],
  pendingPosts: [],
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    startLoading(state: AdminState) {
      state.loading = true;
    },
    endLoading(state: AdminState) {
      state.loading = false;
    },
    setUsers: (state: AdminState, action) => {
      state.users = action.payload;
    },
    getReports: (state: AdminState, action) => {
      state.reports = action.payload;
    },
    getAllPosts: (state: AdminState, action) => {
      state.posts = action.payload;
    },
    getPendingPosts: (state: AdminState, action) => {
      state.pendingPosts = action.payload;
    },
    deletePost: (state: AdminState, action) => {
      state.posts = state.posts.filter(
        (post: Post) => post.id !== action.payload
      );
    },
    approve: (state: AdminState, action) => {
      state.pendingPosts = state.pendingPosts.filter(
        (post: Post) => post.id !== action.payload
      );
    },
    reject: (state: AdminState, action) => {
      state.pendingPosts = state.pendingPosts.map((post: Post) =>
        post.id === action.payload ? { ...post, status: -1 } : post
      );
    },
  },
});

export const selectLoading = (state: { admin: AdminState }) =>
  state.admin.loading;
export const selectUserList = (state: { admin: AdminState }) =>
  state.admin.users;
export const selectReportList = (state: { admin: AdminState }) =>
  state.admin.reports;
export const selectPostList = (state: { admin: AdminState }) =>
  state.admin.posts;
export const selectPendingPostList = (state: { admin: AdminState }) =>
  state.admin.pendingPosts;

export const {
  startLoading,
  endLoading,
  setUsers,
  getReports,
  getAllPosts,
  getPendingPosts,
  deletePost,
  approve,
  reject,
} = adminSlice.actions;

export default adminSlice.reducer;
