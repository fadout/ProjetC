import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Modifier si backend déployé

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

// Ajouter le token JWT à chaque requête si l'utilisateur est authentifié
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export default api;