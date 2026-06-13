import axios from "axios";

const api = axios.create({
  baseURL: "https://artisan-backend-1-bx6w.onrender.com/api",
});
api.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("token");

  console.log(
    "Frontend Token:",
    token
  );

  if (token) {

    config.headers.Authorization =
      `Bearer ${token}`;

  }

  return config;

});

export default api;