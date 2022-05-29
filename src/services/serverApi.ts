import axios from 'axios';

const devEnv = 'http://localhost:8080';
// const prodEnf = '';

export const serverApi = axios.create({
  baseURL: devEnv,
});
