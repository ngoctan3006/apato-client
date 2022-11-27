import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://apato-server.vercel.app/",
  responseType: "json",
  withCredentials: true,
  timeout: 20000,
})

export default apiClient
