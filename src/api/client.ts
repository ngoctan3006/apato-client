import axios from 'axios';
import {AppConfig} from "./AppConfig";

const apiClient = axios.create({
  baseURL: AppConfig.baseURL,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  // withCredentials: true,
  responseType: "json",
  timeout: 20000,
})

export default apiClient
