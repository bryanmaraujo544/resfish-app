import axios from 'axios';

const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : process.env.API_URL;

export const serverApi = axios.create({
  baseURL: apiUrl,
});
