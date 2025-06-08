import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/begastos",
  headers: {
    "X-API-KEY": "e4a1f9f3-5b8e-4c4d-9a7b-7d8f94c2b1e6", // Reemplaza con tu clave real
    "Content-Type": "application/json",
  },
});

export default API;
