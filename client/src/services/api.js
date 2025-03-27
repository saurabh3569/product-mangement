import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* -------------------------    Auth  ------------------------------- */

export const login = (data) => {
  return api.post("/auth/login", data);
};

export const signup = (data) => api.post("/auth/register", data);

/* -------------------------    Product  ------------------------------- */

export const createProduct = (data) => api.post("/products", data);

export const updateProduct = (id, data) => api.put(`/products/${id}`, data);

export const listProduct = (data) => api.get("/products", data);

export const getProduct = (id) => api.get(`/products/${id}`);

export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;
