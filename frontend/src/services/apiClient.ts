import axios from 'axios';

const resolveBaseUrl = () => {
    const env = import.meta.env.VITE_API_URL as string | undefined;
    const defaultBase = 'http://localhost:3000';
    const raw = env && env.length ? env : defaultBase;
    const normalized = raw.replace(/\/+$/, '');
    if (normalized.endsWith('/api')) return normalized;
    return `${normalized}/api`;
};

const apiClient = axios.create({
    baseURL: resolveBaseUrl(),
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');


            if (window.location.pathname !== '/iniciar-sesion') {
                window.location.href = '/iniciar-sesion';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;