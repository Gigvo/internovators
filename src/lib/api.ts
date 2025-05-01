import axios from "axios";

export const api = axios.create({
  baseURL: "https://oticonnect.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
