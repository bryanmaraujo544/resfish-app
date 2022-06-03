import axios from 'axios';

const prodEnv = 'https://pesqueiro-arrudas.herokuapp.com';

export const serverApi = axios.create({
  baseURL: prodEnv,
});
