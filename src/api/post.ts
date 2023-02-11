import { Post, Tag } from './../redux/slices/postSlice';
import { axiosInstance } from './axios';

export const createPost = (data: any) => axiosInstance.post('/posts', data);

export const loadAllPost = (data: any) =>
  axiosInstance.post<Post[]>('posts/all', data);

export const getAllTags = () => axiosInstance.get<Tag[]>('tags');

export const getApartDetail = (apatoId: number) =>
  axiosInstance.get<Post>(`posts/${apatoId}`);

export const commentPostAPI = async (postId: number, data: any) =>
  axiosInstance.post(`posts/comment/${postId}`, data);