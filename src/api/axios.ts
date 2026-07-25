import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://inventorymanagement-api-abbey-cgfzgggcbbhedra7.centralus-01.azurewebsites.net/api"
    : "http://localhost:5098/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;