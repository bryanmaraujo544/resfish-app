import axios from 'axios';

// const devUrl = 'http://localhost:8080';
const prodUrl = 'https://pesqueiro-arrudas.herokuapp.com';

export const serverApi = axios.create({
  baseURL: prodUrl,
});
