import { axiosInstance } from './axios';

export const getAllUsersAPI = (data: any) => {
  return axiosInstance.post('admin/all-user', data);
};

export const getAllReport = () => {
  return axiosInstance.get('report');
};

export const getReportDetail = (reportId: string) => {
  return axiosInstance.get(`report/${reportId}`);
};

export const blockUserHandlerAPI = (userId: string, token?: string) => {
  return axiosInstance.put(`admin/block/${userId}`, {});
};

export const deleteCommentAPI = (commentId: string) => {
  return axiosInstance.put(`admin/delete-comment/${commentId}`, {});
};

export const getAllPendingPostAPI = (data: any) => {
  return axiosInstance.post('posts/pending', data);
};

export const approvePostAPI = (postId: number | undefined) => {
  return axiosInstance.put(`admin/approve/${postId}`);
};

export const rejectPostAPI = (postId: number | undefined) => {
  return axiosInstance.put(`admin/reject/${postId}`);
};
