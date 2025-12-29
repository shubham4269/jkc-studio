import axios from "axios";

const defaultBase = "http://localhost:5000";
const baseURL = (process.env.REACT_APP_API_URL || defaultBase) + "/api";

const API = axios.create({
  baseURL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
