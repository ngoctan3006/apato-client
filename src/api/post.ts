import { Post, Tag } from './../redux/slices/postSlice';
import { axiosInstance } from './axios';

export const createPost = (data: any) => axiosInstance.post('/posts', data);

export const loadAllPost = (data: any) =>
  axiosInstance.post<{ data: Post[]; totalPages: number }>('posts/all', data);

export const getAllTags = () => axiosInstance.get<Tag[]>('tags');

export const getApartDetail = (apatoId: number) =>
  axiosInstance.get<Post>(`posts/${apatoId}`);

export const commentPostAPI = async (postId: number | undefined, data: any) =>
  axiosInstance.post(`posts/comment/${postId}`, data);
