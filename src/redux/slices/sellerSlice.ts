import { Post } from './postSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SellerState {
  pendingPost: Post[];
  acceptedPost: Post[];
  loading: boolean;
}

const initialState: SellerState = {
  pendingPost: [],
  acceptedPost: [],
  loading: true,
};

export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    setPendingPost: (state, action: PayloadAction<Post[]>) => {
      state.pendingPost = action.payload;
    },
    setAcceptedPost: (state, action: PayloadAction<Post[]>) => {
      state.acceptedPost = action.payload;
    },
    addPendingPost: (state, action: PayloadAction<Post>) => {
      state.pendingPost.unshift(action.payload);
    },
  },
});

export const selectSellerLoading = (state: { seller: SellerState }) =>
  state.seller.loading;
export const selectPendingPost = (state: { seller: SellerState }) =>
  state.seller.pendingPost;
export const selectAcceptedPost = (state: { seller: SellerState }) =>
  state.seller.acceptedPost;

export const {
  startLoading,
  endLoading,
  setPendingPost,
  setAcceptedPost,
  addPendingPost,
} = sellerSlice.actions;

export default sellerSlice.reducer;
