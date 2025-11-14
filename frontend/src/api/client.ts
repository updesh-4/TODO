import axios from 'axios';
import { getToken } from '../stores/authStore';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api' });

API.interceptors.request.use((cfg:any)=>{
  const token = getToken();
  if(token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default API;
