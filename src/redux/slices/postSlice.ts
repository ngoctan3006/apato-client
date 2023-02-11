import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './authSlice';

export interface Comment {
  id: number;
  comment: string;
  rating: number;
  createdAt: Date;
  user: {
    name: string;
  };
}

export interface Tag {
  id: number;
  tag_name: string;
}

export interface Post {
  id: number;
  title: string;
  detail: string;
  address: string;
  area: number;
  district: string;
  image: string[];
  price: number;
  room_count: number;
  total_rating: number;
  university: string;
  creator: User;
  comment: Comment;
  created_at: Date;
  status: number;
  tags: Tag[];
}

export interface PostState {
  curPost?: Post;
  posts: Post[];
  tags: Tag[];
  loading: boolean;
}

const initialState: PostState = {
  posts: [],
  tags: [],
  loading: true,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    endLoading(state) {
      state.loading = false;
    },
    getAll: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    getAllTag: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    getOne: (state, action: PayloadAction<Post>) => {
      state.curPost = action.payload;
    },
  },
});

export const selectCurPost = (state: { post: PostState }) => state.post.curPost;
export const selectPostList = (state: { post: PostState }) => state.post.posts;
export const selectPostLoading = (state: { post: PostState }) =>
  state.post.loading;
export const selectTags = (state: { post: PostState }) => state.post.tags;

export const { startLoading, endLoading, getAll, getAllTag, getOne } =
  postSlice.actions;

export default postSlice.reducer;
