import axios, {type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig} from 'axios';
import {handleApiError} from "@/services/utils/errorHandler";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = localStorage.getItem('token');

        if (!config.headers) {
            config.headers = {};
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config as InternalAxiosRequestConfig;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error) => {
        const apiError = handleApiError(error);
        return Promise.reject(apiError);
    }
)

export default axiosInstance;
