import axios from "axios";

const apiClient = axios.create({
  // baseURL: "https://superhero-database-rqr7.onrender.com", // your backend URL
  baseURL: "http://127.0.0.1:4000",
});

export default apiClient;
