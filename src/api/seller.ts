import { axiosInstance } from './axios';

export const loadAllPostByUser = (data: any, status: number) => {
  return axiosInstance.post<any[]>(`posts/get-my-posts/${status}`, data);
};

export const deletePostAPI = (postId: number | null) => {
  return axiosInstance.delete(`posts/${postId}`);
};
