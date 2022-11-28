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

export const uploadImage = (image: any, token: string) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}` );
  let formData = new FormData()
  formData.append("file", image[0], image[0].name)
  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow'
  }
  return fetch("http://localhost:4000/upload", requestOptions)
    .then(response => response.text())
    .catch(error => console.log('error', error));
}

export const createPost = (data: any, token: string) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}` );
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('Access-Control-Allow-Origin' , '*');
  myHeaders.append('Origin','http://localhost:4000');
  // let formData = new FormData()
  let raw = JSON.stringify({
    "title": data.name,
    "address": data.address,
    "image": data.image,
    "price": data.price,
    "detail": data.description
  });
  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("http://localhost:4000/posts/", requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}
