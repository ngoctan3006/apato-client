import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './authSlice';

export interface Comment {
  id: number;
  comment: string;
  rating: number;
  created_at: Date;
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
  comments: Comment[];
  created_at: Date;
  status: number;
  tags: Tag[];
}

export interface PostState {
  curPost?: Post;
  posts: Post[];
  tags: Tag[];
  loading: boolean;
  totalPage: number;
}

const initialState: PostState = {
  posts: [],
  tags: [],
  loading: true,
  totalPage: 0,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    startLoading(state: PostState) {
      state.loading = true;
    },
    endLoading(state: PostState) {
      state.loading = false;
    },
    getAll: (state: PostState, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    getAllTag: (state: PostState, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    getOne: (state: PostState, action: PayloadAction<Post>) => {
      state.curPost = action.payload;
    },
    setTotalPage: (state: PostState, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
    commentPost: (state: PostState, action) => {
      state.curPost = action.payload;
    },
    addTag: (state: PostState, action: PayloadAction<Tag>) => {
      state.tags.push(action.payload);
    },
  },
});

export const selectCurPost = (state: { post: PostState }) => state.post.curPost;
export const selectPostList = (state: { post: PostState }) => state.post.posts;
export const selectPostLoading = (state: { post: PostState }) =>
  state.post.loading;
export const selectTags = (state: { post: PostState }) => state.post.tags;
export const selectTotalPage = (state: { post: PostState }) =>
  state.post.totalPage;

export const {
  startLoading,
  endLoading,
  getAll,
  getAllTag,
  getOne,
  setTotalPage,
  commentPost,
  addTag,
} = postSlice.actions;

export default postSlice.reducer;
