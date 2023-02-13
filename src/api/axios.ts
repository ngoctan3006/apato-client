import axios, { AxiosInstance } from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://apato-server.herokuapp.com/'
    : 'http://localhost:4000';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  responseType: 'json',
  timeout: 20000,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error.response);
    if (error.response.status == 401) {
      localStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  }
);
