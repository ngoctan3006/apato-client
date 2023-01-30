import { axiosInstance } from './axios';

export const getAllUsersAPI = (data: any) => {
  return axiosInstance.post('admin/all-user', data);
};
