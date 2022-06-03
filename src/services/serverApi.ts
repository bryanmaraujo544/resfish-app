import axios from 'axios';

const url = 'https://pesqueiro-arrudas.herokuapp.com';

export const serverApi = axios.create({
  baseURL: url,
});
