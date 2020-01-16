import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:19002',
});

export default api;