// Exclude token as it will be dynamic and change over time
import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://altru-volunteer-be.onrender.com/api/"
      : "http://localhost:5000/api/",

  headers: {
    "Content-Type": "application/json",
  },
});
