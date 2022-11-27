import apiClient from "./client";

export const signUpAPI = (data: any) => {
  return apiClient.post("auth/register", data)
}

export const logInAPI = (email: string, password: string) => {
  return apiClient.post("auth/login", {
    email: email,
    password: password
  })
}
