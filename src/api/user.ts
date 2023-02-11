import { axiosInstance } from './axios';

export const updateProfile = (data: any) => {
  return axiosInstance.post('user/update', data);
};
