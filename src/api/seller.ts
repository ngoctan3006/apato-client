import { axiosInstance } from './axios';

export const loadAllPostByUser = (data: any, status: number) => {
  return axiosInstance.post<any[]>(`posts/get-my-posts/${status}`, data);
};

export const deletePostAPI = (postId: string) => {
  return axiosInstance.delete(`posts/${postId}`);
};
