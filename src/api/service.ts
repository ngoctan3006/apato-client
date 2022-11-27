import apiClient from "./client";

export const signUpAPI = (data: any) => {
  return apiClient.post("auth/register", {data})
}
