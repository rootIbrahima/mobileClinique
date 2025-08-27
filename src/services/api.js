// src/services/api.js
import axios from 'axios';
import { auth } from '../firebase';

// Tu es sur téléphone réel → utilise l'IP locale de ton PC
export const api = axios.create({ baseURL: 'http://192.168.1.25:4000' });

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
