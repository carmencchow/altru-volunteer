// Exclude token as it will be dynamic and change over time
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
