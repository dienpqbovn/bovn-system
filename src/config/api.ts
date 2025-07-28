import axios from 'axios';

import { ENVIRONMENTS } from './enviroments';

const api = axios.create({
  baseURL: ENVIRONMENTS.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
