import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://10.50.89.136:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true; //재시도 플래그 설정

//             const accessToken = useAuthStore((state) => state.accessToken);
//             const refreshToken = useAuthStore((state) => state.refreshToken);
//             return getTokenRefresh(accessToken!, refreshToken!).then(() => {
//                 return axiosInstance(originalRequest);
//             });
//         }
//         return Promise.reject(error);
//     }
// );
