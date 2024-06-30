import axios from 'axios';
import { API_HOST } from '@constants/api-paths';

const api = axios.create({
  baseURL: API_HOST,
});

export default api;
