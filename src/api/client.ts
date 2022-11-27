import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:4000/",
  responseType: "json",
  timeout: 20000,
})

export default apiClient
