import { axiosInstance } from './axios';

export const getAllReport = () => {
  return axiosInstance.get('report');
};

export const getReportDetail = (reportId: string) => {
  return axiosInstance.get(`report/${reportId}`);
};

export const reportCommentAPI = (commentId: number) => {
  return axiosInstance.post(`report`, { commentId });
};
