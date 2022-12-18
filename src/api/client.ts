import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://apato-server.herokuapp.com/",
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  // withCredentials: true,
  responseType: "json",
  timeout: 20000,
})

export default apiClient
