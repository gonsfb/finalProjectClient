import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://finalprojectbackend-9n0r.onrender.com/api', // Make sure this is your backend API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
