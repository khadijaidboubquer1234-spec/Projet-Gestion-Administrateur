import axios from "axios";

export const API_USERS = "https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire";

export const api = axios.create({
  timeout: 15000,
});