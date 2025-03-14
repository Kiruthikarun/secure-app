import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/auth",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const register = async (username, email, password) => {
  return API.post("/register/", { username, email, password });
};

export const login = async (identifier, password) => {
  return API.post("/login/", { identifier, password });
};