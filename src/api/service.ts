import apiClient from "./client";

export const signUpAPI = (data: any) => {
  return apiClient.post("auth/register", {data})
}

export const logInAPI = (data: any) => {
  return apiClient.post("auth/login", {data})
}
